const candidateservice = require("../service/candidateservice");
const mainservice = require("../service/mainservice");
const constants = require("../constants");
const alert = require('alert');
const url = require('url');
var table = "candidates"



module.exports.userlogin = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
 
        const responsefromservice = await mainservice.userlogin({
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


module.exports.usersignup = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await candidateservice.usersignup(req.body)

        response.status = 200
        response.message = "ลงทะเบียนสำเร็จ"
        response.body = responsefromservice

    }
    catch (error) {
        console.log(`Something went wrong with : candidatecontroller : usersignup ` ,error);
        response.message = error.message  
        response.body = error
        // throw new Error(error)
    }
    return res.status(response.status).send(response)
}


module.exports.userconfirmsignup = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
 
        const responsefromservice = await mainservice.userconfirmsignup({
            username : req.params.username,
            token : req.params.token,
            table
        })

        response.status = 200
        response.message = "ลงทะเบียนสำเร็จ"
        response.body = responsefromservice
        return res.render("main/message",{message: "การยืนยันอีเมลสำเร็จ", status: "success"})

    }
    catch (error) {
        console.log(`Something went wrong with : candidatecontroller : userconfirmsignup ` ,error);
        response.message = error.message.split('Error:')[1]
        response.body = error
        return res.render("main/message",{message: response.message  , status: "error"})
        // throw new Error(error)
    }
    return res.status(response.status).send(response)
}

module.exports.userforgotpasswordrequest = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
 
        const responsefromservice = await mainservice.userforgotpasswordrequest({
           email: req.body.email,
           table
        })

        response.status = 200
        response.message = "ส่งคำขอเปลี่ยนรหัสผ่านสำเร็จ"
        response.body = responsefromservice

    }
    catch (error) {
        console.log(`Something went wrong with : candidatecontroller : userforgotpasswordrequest ` ,error);
        response.message = error.message  
        response.body = error

        // throw new Error(error)
    }
    return res.status(response.status).send(response)
}



module.exports.usergetresetpasswordpage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mainservice.usergetresetpasswordpage({
            username : req.params.username,
            token : req.params.token,
            table
        })

        response.status = 200
        response.message = "ยืนยันขอเปลี่ยนรหัสสำเร็จ"
        response.body = responsefromservice
        return res.render("main/resetpassword")

    }
    catch (error) {
        console.log(`Something went wrong with : candidatecontroller : usergetresetpasswordpage ` ,error);
        response.message = error.message.split('Error:')[1]
        response.body = error
        return res.redirect("/home")
        // throw new Error(error)
    }
    return res.status(response.status).send(response)
}



module.exports.userconfirmchangepassword = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await mainservice.userconfirmchangepassword({
            username : req.params.username,
            token : req.params.token,
            password : req.body.password,
            table
        })
        response.status = 200
        response.message = "เปลี่ยนรหัสผ่านสำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
    console.log(`Something went wrong with : candidatecontroller : userconfirmchangepassword ` ,error);
    response.message = error.message  
    response.body = error
    
    // throw new Error(error)
    }
    return res.status(response.status).send(response)
}





module.exports.savejobpost = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await candidateservice.savejobpost({
            postid : req.body.postid, 
            userid : req.cookies.jwt.uid,
            usertype : req.cookies.jwt.t
        })
        response.status = 200
        response.message = "บันทึกโพสต์สำเร็จ"
        response.body = responsefromservice
    }
    catch(error){
        console.log(`Something went wrong with : clientcontroller : savejobpost ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)
}

module.exports.findjob = async (req,res) => {
    var io = req.app.get('socketio');

 
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await candidateservice.findjob({
            page: req.params.page,
            limit: req.query.limit,
            offset: req.query.offset,
            role: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            jobtype: req.query.jobtype, 
            role: req.query.role, 
            occupation: req.query.occupation, 
            province: req.query.province, 
            minsalary: req.query.minsalary, 
            maxsalary: req.query.maxsalary, 
            mrt: req.query.mrt, 
            bts: req.query.bts, 
            bus: req.query.bus,
            edu: req.query.edu,
            exp: req.query.exp,
            allquery: url.parse(req.url,true).search
        })
        response.status = 200
        response.message = "ค้นหางานสำเร็จ"
        response.body = responsefromservice
        // res.send(responsefromservice)
        return res.render("client/jobs", {data: responsefromservice})
    }
    catch (error) {
        console.log(`Something went wrong with : clientcontroller : findjob ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }
}



    module.exports.getmyprofilepage = async (req,res) => {

        let response = {...constants.defaultserverresponse};
        try{
            
            const responsefromservice = await candidateservice.getmyprofilepage({
                id : req.cookies.jwt.id
            })
            response.status = 200
            response.message = "โหลดข้อมูลโปรไฟล์สำเร็จ"
            response.body = responsefromservice
    
            return res.render("candidate/profile", {data: responsefromservice})
        }
        catch (error) {
            console.log(`Something went wrong with : candidatecontroller : getmyprofilepage ` ,error);
            response.message = error.message  
            response.body = error
            return res.redirect("/home")
        // throw new Error(error)
        }
        return res.status(response.status).send(response)
    }


    
module.exports.updatemyprofileimage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await candidateservice.updatemyprofileimage({
            id : req.cookies.jwt.id,
            req: req
        })
        response.status = 200
        response.message = "update profile image success"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : candidatecontroller : updatemyprofileimage ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)
}

module.exports.deletemyprofileimage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await candidateservice.deletemyprofileimage({
            id : req.cookies.jwt.id,
        })
        response.status = 200
        response.message = "delete profile image success"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : candidatecontroller : deletemyprofileimage ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)
}