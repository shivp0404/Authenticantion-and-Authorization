const UserRepositories = require("./user.repositories");
const {
  hashPassword,
  hashRefreshToken,
  comparePassword,
  compareRefreshToken,
} = require("../../utils/bcrypt");
const {
  GenerateAccessToken,
  GenerateRefreshToken,
  decodeRefreshToken,
  GenerateResetPasswordToken,
  decodeResetPasswordToken,
} = require("../../utils/jwt");
const SessionRepositories = require("./session.repositories");

const AuthServices = {
  registration: async (payload) => {
    if (!payload.name) {
      throw new Error("Name is not defined");
    } else if (!payload.email) {
      throw new Error("Email is not defined");
    } else if (!payload.password) {
      throw new Error("Password is not defined");
    }
    const exist = await UserRepositories.findbyEmail(payload.email);
    if (exist) {
      throw new Error("Email is already existed");
    }

    const password = await hashPassword(payload.password);
    payload.password = password;
    const user = await UserRepositories.createUser(payload);
    return user;
  },

  login: async (payload, sessionip, userdevice) => {
    if (!payload.email) {
      throw new Error("Email is required");
    }
    if (!payload.password) {
      throw new Error("Password is required");
    }
    const user = await UserRepositories.findbyEmail(payload.email);

    if (!user) {
      throw new Error("Email is wrong");
    }

    const isMatched = await comparePassword(payload.password, user.password);

    if (!isMatched) {
      throw new Error("Password is wrong");
    }

    const SessionData = {
      user_id: user._id,
      expiry_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      device: userdevice,
      ip: sessionip,
    };

    const session = await SessionRepositories.SessionCreate(SessionData);

    const accessToken = GenerateAccessToken({
      id: user._id,
      session_id: session._id,
      role: user.role,
    });

    if (!accessToken) throw new Error("Access token is not generated");

    const refreshToken = GenerateRefreshToken({
      id: user._id,
      session_id: session._id,
      role: user.role,
    });

    if (!refreshToken) throw new Error("Refresh token is not generated");

    const hashedRefreshToken = await hashRefreshToken(refreshToken);

    const sessiondata = await SessionRepositories.UpdateTokenSession(
      session._id,
      hashedRefreshToken,
    );

    return {
      data: {
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  },

  logout: async (refreshToken) => {
    if (!refreshToken) throw new Error("RefreshToken not found");
    const decoded = decodeRefreshToken(refreshToken);

    const dbtoken = await SessionRepositories.getSession(decoded.session_id);
    if (!dbtoken) throw new Error("dbtoken not found");

    const isValid = await compareRefreshToken(
      refreshToken,
      dbtoken.refresh_token,
    );
    if (!isValid) throw new Error("invalid Refresh Token");

    await SessionRepositories.revokeSession(decoded.session_id);

    return {
      message: "logout",
    };
  },
  refresh: async (refreshToken) => {
    if (!refreshToken) throw new Error("RefreshToken didn't receive");

    const decode = await decodeRefreshToken(refreshToken);
    if (!decode) throw new Error("Token didn't decode");

    const session = await SessionRepositories.getSession(decode.session_id);
    if (!session) throw new Error("Session not found");

    if (session.is_revoked) throw new Error("Session revoked");

    if (session.expiry_at.getTime() < Date.now()) {
      throw new Error("Session expired");
    }

    const isValid = await compareRefreshToken(
      refreshToken,
      session.refresh_token,
    );
   if (!isValid) {
  await SessionRepositories.revokeSession(session._id);
  throw new Error("Possible token reuse detected");
} 

    const NewAccessToken = await GenerateAccessToken({
      id: decode.id,
      session_id: decode.session_id,
      role: decode.role,
    });

    if (!NewAccessToken) throw new Error("New Access Token is not generated");

    const NewRefreshToken = await GenerateRefreshToken({
      id: decode.id,
      session_id: decode.session_id,
      role: decode.role,
    });

    if (!NewRefreshToken) throw new Error("New Refresh Token is not generated");

    const hashNewRefreshToken = await hashRefreshToken(NewRefreshToken);
    if (!hashNewRefreshToken)
      throw new Error("New Refresh Token is not hashed");

    await SessionRepositories.UpdateTokenSession(decode.session_id, hashNewRefreshToken);

    return {
      AccessToken: NewAccessToken,
      RefreshToken: NewRefreshToken,
    };
  },

  forgotPassword: async (email) => {
    if (!email) throw new Error("Email didn't receive");

    const user = await UserRepositories.findbyEmail(email);
    if (!user) throw new Error("User not found");

    const resetToken = await GenerateResetPasswordToken({
      id: user._id,
    });

    if (!resetToken) throw new Error("Reset token not generated");

    const hashedResetToken = await hashRefreshToken(resetToken);

    if (!hashedResetToken) throw new Error("Reset password token not hashed");

    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await UserRepositories.saveResetPasswordToken(user, {
      resetPasswordToken: hashedResetToken,
      resetPasswordExpiresAt: expires,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-Password/${resetToken}`;

    return {
      resetToken,
      resetLink,
    };
  },

  resetPassword: async ({ token, newPassword }) => {
    if (!token) throw new Error("Reset token missing");
    if (!newPassword) throw new Error("New password missing");

    const decode = await decodeResetPasswordToken(token);
    if (!decode) throw new Error("Invalid reset token");

    const user = await UserRepositories.findbyid(decode.id);
    if (!user) throw new Error("User not found");

    if (user.resetPasswordExpiresAt < new Date())
      throw new Error("Reset token expired");

    const isValid = await compareRefreshToken(token, user.resetPasswordToken);

    if (!isValid) throw new Error("Reset token not valid");

    const hashedNewPassword = await hashPassword(newPassword);
    if (!hashedNewPassword) throw new Error("New Password didn't hashed");

    await UserRepositories.updatePassword(user, hashedNewPassword);

    const result =  await UserRepositories.clearResetPasswordToken(user);
  

    return {
      message: "Password reset successfully",
    };
  },
};

module.exports = AuthServices;
