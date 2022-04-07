const companyservice = require("../service/companyservice");
const mainservice = require("../service/mainservice");
const constants = require("../constants");
const alert = require('alert');
var table = "companys"


// user controller for client

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
        console.log(`Something went wrong with : companycontroller : userlogin ` ,error);
        response.message = error.message 
        response.body = error

        // throw new Error(error)
    }
    return res.status(response.status).send(response)
}


module.exports.usersignup = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await companyservice.usersignup(req.body)

        response.status = 200
        response.message = "ลงทะเบียนสำเร็จ"
        response.body = responsefromservice

    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : usersignup ` ,error);
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
        console.log(`Something went wrong with : companycontroller : userconfirmsignup ` ,error);
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
        console.log(`Something went wrong with : companycontroller : userforgotpasswordrequest ` ,error);
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
        console.log(`Something went wrong with : companycontroller : usergetresetpasswordpage ` ,error);
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
    console.log(`Something went wrong with : companycontroller : userconfirmchangepassword ` ,error);
    response.message = error.message  
    response.body = error
    
    // throw new Error(error)
    }
    return res.status(response.status).send(response)
}

// end user controller 



module.exports.getmyprofilepage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await companyservice.getmyprofilepage({
            id : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "โหลดข้อมูลโปรไฟล์สำเร็จ"
        response.body = responsefromservice

        return res.render("company/profile", {data: responsefromservice})
    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : getmyprofilepage ` ,error);
        response.message = error.message  
        response.body = error
        return res.redirect("/home")
    // throw new Error(error)
    }
    return res.status(response.status).send(response)
}




module.exports.geteditmyprofilepage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await companyservice.geteditmyprofilepage({
            id : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "โหลดข้อมูลโปรไฟล์สำเร็จ"
        response.body = responsefromservice

        return res.render("company/editprofile", {data: responsefromservice})
    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : getmyprofilepage ` ,error);
        response.message = error.message  
        response.body = error
        return res.redirect("/home")
    // throw new Error(error)
    }
    return res.status(response.status).send(response)
}


module.exports.updatemyprofile = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await companyservice.updatemyprofile({
            id : req.cookies.jwt.id,
            data : req.body
        })
        response.status = 200
        response.message = "อัพเดทโปรไฟล์สำเร็จ"
        response.body = responsefromservice

    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : updatemyprofile ` ,error);
        response.message = error.message  
        response.body = error
    
    }
    return res.status(response.status).send(response)
}

module.exports.updatemyprofileimage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await companyservice.updatemyprofileimage({
            id : req.cookies.jwt.id,
            req: req
        })
        response.status = 200
        response.message = "update profile image success"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : updatemyprofileimage ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)
}

module.exports.updatemycoverimage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await companyservice.updatemycoverimage({
            id : req.cookies.jwt.id,
            req: req
        })
        response.status = 200
        response.message = "update cover image success"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : updatemycoverimage ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)
}

module.exports.deletemyprofileimage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await companyservice.deletemyprofileimage({
            id : req.cookies.jwt.id,
        })
        response.status = 200
        response.message = "delete profile image success"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : deletemyprofileimage ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)
}

module.exports.deletemycoverimage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await companyservice.deletemycoverimage({
            id : req.cookies.jwt.id,
        })
        response.status = 200
        response.message = "delete cover image success"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : deletemycoverimage ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)
}



module.exports.createpost = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await companyservice.createpost({
            id : req.cookies.jwt.id,
            data : req.body
        })
        response.status = 200
        response.message = "ประกาศงานสำเร็จ"
        response.body = responsefromservice

    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : createpost ` ,error);
        response.message = error.message  
        response.body = error
    
    }
    return res.status(response.status).send(response)
}


module.exports.editmyjobpost = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await companyservice.editmyjobpost({
            id : req.cookies.jwt.id,
            postjobid : req.params.id
        })
        response.status = 200
        response.message = "เรียกดูข้อมูลสำเร็จ"
        response.body = responsefromservice
        return res.status(response.status).render("company/createpost",{data: responsefromservice, title: "แก้ไขประกาศงาน"})

    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : editmyjobpost ` ,error);
        response.message = error.message  
        response.body = error
        return res.redirect("/pagenotfound")

    }
}

module.exports.savemyjobpost = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{

        const responsefromservice = await companyservice.savemyjobpost({
            companyid : req.cookies.jwt.id,
            postjobid : req.params.id,
            data : req.body
        })
        response.status = 200
        response.message = "แก้ไขประกาศงานสำเร็จ"
        response.body = responsefromservice

    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : editmyjobpost ` ,error);
        response.message = error.message  
        response.body = error

    }
    return res.status(response.status).send(response)

}


module.exports.getmyjobposts = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await companyservice.getmyjobposts({
            id : req.cookies.jwt.id,
            limit: req.query.limit,
            offset: req.query.offset,
            search: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            page: req.query.page

        })
        response.status = 200
        response.message = "เรียกข้อมูลสำเร็จ"
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : getmyjobpost ` ,error);
        response.message = error.message  
        response.body = error
        res.redirect("/pagenotfound")
    }
}


module.exports.deletemyjobposts = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        req.body.deletecheck = Array.isArray(req.body.deletecheck) ? req.body.deletecheck : [req.body.deletecheck];

        const responsefromservice =  await companyservice.deletemyjobposts({
            id : req.cookies.jwt.id,
            deletechecks : req.body.deletecheck,            
        })
       
        response.status = 200
        response.message = "ลบโพสต์สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : deletemyjobposts ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)

}

module.exports.viewmyjobpost = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await companyservice.viewmyjobpost({
            id : req.cookies.jwt.id,
            postjobid : req.params.id     
        })
        response.status = 200
        response.message = "เรียกข้อมูลโพสต์สำเร็จ"
        response.body = responsefromservice
        return res.status(response.status).render("main/postjob",{data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : companycontroller : viewmyjobpost ` ,error);
        response.message = error.message  
        response.body = error
        return res.status(response.status).redirect("/pagenotfound")

    }

}


