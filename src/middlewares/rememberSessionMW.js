const userTracker = require("../database/models/userTracker.js")

const rememberSessionMW = (req, res, next) => {
        if (req.cookies.UserEmail != undefined && req.session.userLogged == undefined) {
        let UserToLog = userTracker.findOneByField("email", req.cookies.UserEmail);
        req.session.userLogged = UserToLog;
    }
    next();
}

module.exports = rememberSessionMW