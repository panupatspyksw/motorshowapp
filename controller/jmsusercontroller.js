const candidateservice = require("../service/candidateservice");
const jmsuserservice = require("../service/jmsuserservice");
const constants = require("../constants");
const alert = require('alert');
const url = require('url');
var table = "jmsusers"



module.exports.userlogin = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
 
        const responsefromservice = await jmsuserservice.userlogin({
            username: req.body.username,
            password: req.body.password,
            table
        })
        const savecookie = await res.cookie('jwt', responsefromservice, { httpOnly: true, domain : '' , maxAge: process.env.COOKIES_SINGIN_EXPIRE})

        response.status = 200
        response.message = "เข้าสู่ระบบสำเร็จ"
        response.body = responsefromservice

    }
    catch (error) {
        console.log(`Something went wrong with : candidatecontroller : userlogin ` ,error);
        response.message = error.message 
        response.body = error

        // throw new Error(error)
    }
    return res.status(response.status).send(response)
}