const SessionModel = require("./session.schema");

const SessionRepositories={
    SessionCreate: async(data)=>{
        return await SessionModel.create(data)
    },
    UpdateTokenSession:async(id,refresh_token)=>{
        const Session = await SessionModel.findById(id);
        Session.refresh_token = refresh_token
        return await Session.save();
    },
    revokeSession:async(id)=>{
        const Session  = await SessionModel.findById(id);
        Session.is_revoked = true;
        return await Session.save()

    },
    getSession:async(id)=>{
        return await SessionModel.findById(id)
    },
    findRefreshtoken:async(id)=>{
        const session = await SessionModel.findById(id).select('refresh_token')
        return session
    },

}

module.exports = SessionRepositories