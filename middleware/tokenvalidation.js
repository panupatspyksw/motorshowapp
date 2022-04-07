const constants = require('../constants/index')
var jwt = require('jsonwebtoken');
const alert = require('alert');
const connection = require('../database/connection');
const connection2 = require('../database/connection2');
const promisePool2 = connection2.promise();

const promisePool = connection.promise();


module.exports.validatetokencandidateuserrestapi = async (req, res, next) => {
    let response = {...constants.defaultserverresponse}
    try {
        
        // res.setHeader("authorization", "Bearer "+req.cookies.jwt.token);
        if(req.cookies.jwt){
            const t = req.cookies.jwt
            // console.log(t)
            var [confirmtoken] = await promisePool.query(` 
            SELECT 
            CONVERT(id,char) as id
            FROM candidates
            WHERE
            id = ?
            AND usertype = ?
            AND username = ? 
            AND password = ?
            AND token = ?
            AND status = 1 ;
            `, [t.id,t.usertype,t.username,t.password,t.token]);
            if(!confirmtoken.length){
                // res.cookie('jwt', '', { maxAge: 0 });
                throw "สำหรับผู้สมัครงานเท่านั้น"
            }
          

            // console.log(t)

            // console.log(confirmtoken)
 
            req.headers.authorization = await "Bearer "+req.cookies.jwt.token;
           
        }else{
                // res.cookie('jwt', '', { maxAge: 0 });
                throw "กรุณาทำการเข้าสู่ระบบ"
        }

        // console.log("from token validation", req.cookies.jwt.token || "notfound jwt token form validation")
        if(!req.headers.authorization){
            throw "กรุณาทำการเข้าสู่ระบบ"
            // throw new Error(constants.requestvalidationmessage.token_missing)
        }
        const token = req.headers.authorization.split('Bearer')[1].trim()
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "usersecretkey")
        return next();
    } catch (error) {
        
        console.log("Error : tokenvalidation : validatetoken", error)
        response.message = error;
        response.status = 401;
        // response.body = error

    }
    return res.status(response.status).send(response)
}
module.exports.validatetokenjmsuserrestapi = async (req, res, next) => {
    let response = {...constants.defaultserverresponse}
    try {
        
        // res.setHeader("authorization", "Bearer "+req.cookies.jwt.token);
        if(req.cookies.jwt){
            const t = req.cookies.jwt
            // console.log(t)
            var [confirmtoken] = await promisePool2.query(` 
            SELECT 
            CONVERT(id,char) as id
            FROM jmsusers
            WHERE
            id = ?
            AND usertype = ?
            AND username = ? 
            AND password = ?
            AND token = ?
            AND status = 1 ;
            `, [t.id,t.usertype,t.username,t.password,t.token]);
            if(!confirmtoken.length){
                // res.cookie('jwt', '', { maxAge: 0 });
                throw "ท่านไม่มีสิทธิการใช้งานในส่วนนี้"
            }
          

            // console.log(t)

            // console.log(confirmtoken)
 
            req.headers.authorization = await "Bearer "+req.cookies.jwt.token;
           
        }else{
                // res.cookie('jwt', '', { maxAge: 0 });
                throw "กรุณาทำการเข้าสู่ระบบ"
        }

        // console.log("from token validation", req.cookies.jwt.token || "notfound jwt token form validation")
        if(!req.headers.authorization){
            throw "กรุณาทำการเข้าสู่ระบบ"
            // throw new Error(constants.requestvalidationmessage.token_missing)
        }
        const token = req.headers.authorization.split('Bearer')[1].trim()
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "usersecretkey")
        return next();
    } catch (error) {
        
        console.log("Error : tokenvalidation : validatetoken", error)
        response.message = error;
        response.status = 401;
        // response.body = error

    }
    return res.status(response.status).send(response)
}

module.exports.validatetokencandidateuser = async (req, res, next) => {
    let response = {...constants.defaultserverresponse}
    try {
        
        // res.setHeader("authorization", "Bearer "+req.cookies.jwt.token);
        if(req.cookies.jwt){
            const t = req.cookies.jwt
            // console.log(t)
            var [confirmtoken] = await promisePool.query(` 
            SELECT 
            CONVERT(id,char) as id
            FROM candidates
            WHERE
            id = ?
            AND usertype = ?
            AND username = ? 
            AND password = ?
            AND token = ?
            AND status = 1 ;
            `, [t.id,t.usertype,t.username,t.password,t.token]);

            if(!confirmtoken.length){
                // res.cookie('jwt', '', { maxAge: 0 });
                return res.redirect("/home")
            }

            // console.log(t)

            // console.log(confirmtoken)
 
            req.headers.authorization = await "Bearer "+req.cookies.jwt.token;
           
        }

        // console.log("from token validation", req.cookies.jwt.token || "notfound jwt token form validation")
        if(!req.headers.authorization){
            return res.redirect("/home")
            // throw new Error(constants.requestvalidationmessage.token_missing)
        }
        const token = req.headers.authorization.split('Bearer')[1].trim()
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "usersecretkey")
        return next();
    } catch (error) {
        
        console.log("Error : tokenvalidation : validatetoken", error)
        response.message = error.message;
        response.status = 401;
    }
    return res.status(response.status).redirect("/home")
}


module.exports.validatetokencompanyuser = async (req, res, next) => {
    let response = {...constants.defaultserverresponse}
    try {
        
        // res.setHeader("authorization", "Bearer "+req.cookies.jwt.token);
        if(req.cookies.jwt){
            const t = req.cookies.jwt
            // console.log(t)
            var [confirmtoken] = await promisePool.query(` 
            SELECT 
            CONVERT(id,char) as id
            FROM companys
            WHERE
            id = ?
            AND usertype = ?
            AND username = ? 
            AND password = ?
            AND token = ?
            AND status = 1 ;
            `, [t.id,t.usertype,t.username,t.password,t.token]);

            if(!confirmtoken.length){
                // res.cookie('jwt', '', { maxAge: 0 });
                return res.redirect("/home")
            }

            // console.log(t)

            // console.log(confirmtoken)
 
            req.headers.authorization = await "Bearer "+req.cookies.jwt.token;
           
        }

        // console.log("from token validation", req.cookies.jwt.token || "notfound jwt token form validation")
        if(!req.headers.authorization){
            return res.redirect("/home")
            // throw new Error(constants.requestvalidationmessage.token_missing)
        }
        const token = req.headers.authorization.split('Bearer')[1].trim()
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "usersecretkey")
        return next();
    } catch (error) {
        
        console.log("Error : tokenvalidation : validatetoken", error)
        response.message = error.message;
        response.status = 401;
    }
    return res.redirect("/home")
}


module.exports.validatetokencompanyuserfrompath = async (req, res, next) => {
    let response = {...constants.defaultserverresponse}
    try {
        
        // res.setHeader("authorization", "Bearer "+req.cookies.jwt.token);
        if(req.cookies.jwt){
            const t = req.cookies.jwt
            // console.log(t)
            var [confirmtoken] = await promisePool.query(` 
            SELECT username 
            FROM user
            WHERE
            id = ?
            AND usertype = 'company'
            AND username = ? 
            AND password = ?
            AND token = ?
            AND status = 'on' ;
            `, [t.id,t.username,t.pw,t.token]);

            console.log(confirmtoken)
            if(confirmtoken.length < 1){
                return res.redirect("/home")
            }

            req.headers.authorization = await "Bearer "+req.cookies.jwt.token;
           
        }

        // console.log("from token validation", req.cookies.jwt.token || "notfound jwt token form validation")
        if(!req.headers.authorization){
            return res.redirect("/company/login")
            // throw new Error(constants.requestvalidationmessage.token_missing)
        }
        const token = req.headers.authorization.split('Bearer')[1].trim()
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "usersecretkey")
        return next();
    } catch (error) {
        console.log("Error : tokenvalidation : validatetoken", error)
        response.message = error.message;
        response.status = 401;
    }
    return res.status(response.status).send(response)
}



module.exports.validatetokenjmsuser = async (req, res, next) => {
    let response = {...constants.defaultserverresponse}
    try {
        
        // res.setHeader("authorization", "Bearer "+req.cookies.jwt.token);
        if(req.cookies.jwt){
            const t = req.cookies.jwt
            // console.log(t)
            var [confirmtoken] = await promisePool2.query(` 
            SELECT 
            CONVERT(id,char) as id
            FROM jmsusers
            WHERE
            id = ?
            AND usertype = ?
            AND username = ? 
            AND password = ?
            AND token = ?
            AND status = 1 ;
            `, [t.id,t.usertype,t.username,t.password,t.token]);

            if(!confirmtoken.length){
                // res.cookie('jwt', '', { maxAge: 0 });
                return res.redirect("/home")
            }

            // console.log(t)

            // console.log(confirmtoken)
 
            req.headers.authorization = await "Bearer "+req.cookies.jwt.token;
           
        }

        // console.log("from token validation", req.cookies.jwt.token || "notfound jwt token form validation")
        if(!req.headers.authorization){
            return res.redirect("/home")
            // throw new Error(constants.requestvalidationmessage.token_missing)
        }
        const token = req.headers.authorization.split('Bearer')[1].trim()
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "usersecretkey")
        return next();
    } catch (error) {
        
        console.log("Error : tokenvalidation : validatetoken", error)
        response.message = error.message;
        response.status = 401;
    }
    return res.status(response.status).redirect("/home")
}
