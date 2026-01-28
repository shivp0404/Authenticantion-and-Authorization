const authorization = (roles = []) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized: No user data found",
        });
      }


      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: "Forbidden: You don't have permission",
        });
      }


      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = authorization;
