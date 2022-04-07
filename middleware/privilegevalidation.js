const constants = require('../constants');

module.exports.validateprivilege = (pv) => {
    return (req, res, next) => {    
        const t = req.cookies.jwt
        let response = {...constants.defaultserverresponse}
        if(pv == "ADMIN"){
            if(t.pv != pv){
                response.message = "คุณไม่ได้รับสิทธิเข้าถึงข้อมูลนี้"
                return res.render("noprivilege")
                // return res.status(response.status).send(response)
            }
            return next()
        }
        else if(pv == "MANAGER"){
            if(t.pv != pv){
                response.message = constants.requestvalidationmessage.bad_request
                // return res.status(response.status).send(response)
                return res.render("noprivilege")

            }
            return next()
        }
        else if(pv == "USER"){
            if(t.pv != pv){
                response.message = constants.requestvalidationmessage.bad_request
                return res.render("noprivilege")
                // return res.status(response.status).send(response)
            }
            return next()
        }
        else if(pv == "USERANDMANAGER"){
            if(t.pv == "ADMIN"){
                response.message = constants.requestvalidationmessage.bad_request
                return res.render("noprivilege")
                // return res.status(response.status).send(response)
            }
            return next()
        }
        else if(pv == "ADMINANDMANAGER"){
            if(t.pv == "USER"){
                response.message = constants.requestvalidationmessage.bad_request
                return res.render("noprivilege")
                // return res.status(response.status).send(response)
            }
            return next()
        }
        else if(pv == "ALL"){
            return next()        
        }
        else{
            response.message = constants.requestvalidationmessage.bad_request
            return res.render("noprivilege")
            // return res.status(response.status).send(response)
        }
    }
} 