const resumeservice = require("../service/resumeservice");
const constants = require("../constants");
const alert = require('alert');
const table = 'resumes'
const GCSP = require('../cloudstorage/privateserve')

module.exports.createpage = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.createpage({
            id : req.cookies.jwt.id
        })
        response.status = 200
        response.message = constants.post.postaddnew
        response.body = responsefromservice
        return res.render("candidate/createandeditresume", {data: responsefromservice})
    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : newpost ` ,error);
        response.message = error.message
        // return res.status(response.status).send(response)
        return res.redirect("/home")

        // throw new Error(error)
    }
}
module.exports.updatepage = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.updatepage({
            id : req.cookies.jwt.id
        })
        response.status = 200
        response.message = constants.post.postaddnew
        response.body = responsefromservice
        return res.render("candidate/createandeditresume", {data: responsefromservice})
    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : updatepage ` ,error);
        response.message = error.message
        // return res.status(response.status).send(response)
        return res.redirect("/candidate/profile")

        // throw new Error(error)
    }
}
module.exports.createresume = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.createresume({
            bodyservice: req.body,
            candidate : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : createresume ` ,error);
        response.message = error.message
        response.body = error

    }
    return res.status(response.status).send(response)

}

//edit resume post
module.exports.updateresumeprofileinfo = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.updateresumeprofileinfo({
            bodyservice: req.body,
            candidate : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : updateresumeprofileinfo ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)

}

module.exports.updateresumeworkhistorys = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.updateresumeworkhistorys({
            bodyservice: req.body,
            candidate : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : updateresumeworkhistorys ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)

}


module.exports.updateresumeeducations = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.updateresumeeducations({
            bodyservice: req.body,
            candidate : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : updateresumeeducations ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)

}

module.exports.updateresumejobneeds = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.updateresumejobneeds({
            bodyservice: req.body,
            candidate : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : updateresumejobneeds ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)

}


module.exports.updateresumeskills = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.updateresumeskills({
            bodyservice: req.body,
            candidate : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : updateresumeskills ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)

}


module.exports.updateresumecourses = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.updateresumecourses({
            req: req,
            candidate : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : updateresumecourses ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)

}


module.exports.updateresumefiles = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.updateresumefiles({
            req: req,
            candidate : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : updateresumefiles ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)

}

module.exports.viewmyresume = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.viewmyresume({
            candidate : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
        return res.render("candidate/viewresume", {data: responsefromservice,signurl:GCSP.generateV4ReadSignedUrl})

    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : viewmyresume ` ,error);
        response.message = error.message
        response.body = error
        return res.redirect("/home")

    }

}

module.exports.viewmyresumedashboard = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.viewmyresumedashboard({
            candidate : req.cookies.jwt.id
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
        return res.render("candidate/viewresumedashboard", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : viewmyresumedashboard ` ,error);
        response.message = error.message
        response.body = error
        return res.redirect("/profile")

    }

}

module.exports.viewmycandidateresume = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await resumeservice.viewmycandidateresume({
            company : req.cookies.jwt.id,
            resumeid: req.query.resumeid,
            jobid: req.query.jobid,
        })
        response.status = 200
        response.message = "สร้างเรซูเม่สำเร็จ"
        response.body = responsefromservice
        return res.render("candidate/viewresume", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : resumecontroller : viewmycandidateresume ` ,error);
        response.message = error.message
        response.body = error
        return res.redirect("/home")

    }

}