const jobservice = require("../service/jobservice");
const mainservice = require("../service/mainservice");
const constants = require("../constants");
const alert = require('alert');
const url = require('url');
var table = "candidates"



module.exports.viewpublicjobs = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        req.query = Object.entries(req.query).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
        const responsefromservice = await jobservice.viewpublicjobs({
            offset: req.query.offset,
            search: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            page: req.query.page,
            type: req.query.type,
            bts: req.query.bts,
            mrt: req.query.mrt,
            bus: req.query.bus,
            edu_start: req.query.edu_start,
            edu_end: req.query.edu_start,
            expyear_start: req.query.expyear_start,
            expyear_end: req.query.expyear_start,
            salary_start: req.query.salary_start,
            salary_end: req.query.salary_end,
            province: req.query.province,
            path: req.query.path,
        })
        response.status = 200
        response.message = "ดูโพสต์ประกาศงานทั้งหด"
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : viewjobs ` ,error);
        response.message = error.message  
        response.body = error
        res.redirect("/pagenotfound")
    }
}


module.exports.viewpublicjobbyid = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await jobservice.viewpublicjobbyid({
            postjobid : req.params.id     
        })
        response.status = 200
        response.message = "เรียกข้อมูลโพสต์สำเร็จ"
        response.body = responsefromservice
        return res.status(response.status).render("main/postjob",{data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : viewpublicjobbyid ` ,error);
        response.message = error.message  
        response.body = error
        return res.status(response.status).redirect("/pagenotfound")

    }

}


module.exports.jobsearch = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await jobservice.jobsearch({
            path: req.query.path,
            province: req.query.province
        })
        response.status = 200
        response.message = "get jobsearch"
        response.body = responsefromservice
        
        return res.render("candidate/jobs", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : maincontroller : jobsearch ` ,error);
        response.message = error.message
        return res.redirect('/home')

    }

}
module.exports.jobcategory = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await jobservice.jobcategory({
            categoryid: req.params.category,
        })
        response.status = 200
        response.message = "get jobcategory"
        response.body = responsefromservice
        
        return res.render("candidate/jobcategorys", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : jobcategory ` ,error);
        response.message = error.message
        return res.redirect('/home')

    }

}

module.exports.companycategory = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await jobservice.companycategory({
            categoryid: req.params.category,
        })
        response.status = 200
        response.message = "get companycategory"
        response.body = responsefromservice
        
        return res.render("candidate/companycategorys", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : companycategory ` ,error);
        response.message = error.message
        return res.redirect('/home')

    }

}

module.exports.allcompanybycategory = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await jobservice.allcompanybycategory({
            categoryid: req.params.category,
        })
        response.status = 200
        response.message = "get allcompanybycategory"
        response.body = responsefromservice
        
        return res.render("candidate/allcompanybycategory", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : allcompanybycategory ` ,error);
        response.message = error.message
        return res.redirect('/home')

    }

}
exports.viewpublicjobsbyjobcategory = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        req.query = Object.entries(req.query).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
        const responsefromservice = await jobservice.viewpublicjobsbyjobcategory({
            offset: req.query.offset,
            search: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            page: req.query.page,
            categoryid: req.query.categoryid
        })
        response.status = 200
        response.message = "ดูโพสต์ประกาศงานทั้งหด"
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : viewpublicjobsbyjobcategory ` ,error);
        response.message = error.message  
        response.body = error
        res.redirect("/pagenotfound")
    }
}
exports.viewpublicjobsbycompanycategory = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        req.query = Object.entries(req.query).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
        const responsefromservice = await jobservice.viewpublicjobsbycompanycategory({
            offset: req.query.offset,
            search: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            page: req.query.page,
            categoryid: req.query.categoryid
        })
        response.status = 200
        response.message = "ดูโพสต์ประกาศงานทั้งหด"
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : viewpublicjobsbycompanycategory ` ,error);
        response.message = error.message  
        response.body = error
        res.redirect("/pagenotfound")
    }
}

exports.viewpublicjobsbycompany = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        req.query = Object.entries(req.query).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
        const responsefromservice = await jobservice.viewpublicjobsbycompany({
            offset: req.query.offset,
            search: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            page: req.query.page,
            companyid: req.query.companyid
        })
        response.status = 200
        response.message = "ดูโพสต์ประกาศงานทั้งหด"
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : viewpublicjobsbycompany ` ,error);
        response.message = error.message  
        response.body = error
        res.redirect("/pagenotfound")
    }
}

exports.savejobpostbycandidate = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await jobservice.savejobpostbycandidate({
            job: req.params.jobid,
            candidate : req.cookies.jwt.id,
        })
        response.status = 200
        response.message = "ดูโพสต์ประกาศงานทั้งหด"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : savejobpostbycandidate ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)

}

exports.deletejobpostbycandidate = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await jobservice.deletejobpostbycandidate({
            job: req.params.jobid,
            candidate : req.cookies.jwt.id,
        })
        response.status = 200
        response.message = "ดูโพสต์ประกาศงานทั้งหด"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : savejobpostbycandidate ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)

}
exports.viewpublicjobsbycandidatesavepost = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        req.query = Object.entries(req.query).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
        const responsefromservice = await jobservice.viewpublicjobsbycompany({
            offset: req.query.offset,
            search: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            page: req.query.page,
            companyid: req.query.companyid
        })
        response.status = 200
        response.message = "ดูโพสต์ประกาศงานทั้งหด"
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : viewpublicjobsbycompany ` ,error);
        response.message = error.message  
        response.body = error
        res.redirect("/pagenotfound")
    }
}

exports.viewmysaveposts = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        req.query = Object.entries(req.query).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
        const responsefromservice = await jobservice.viewmysaveposts({
            offset: req.query.offset,
            search: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            page: req.query.page,
            candidate : req.cookies.jwt.id,
        })
        response.status = 200
        response.message = "ดูโพสต์ประกาศงานทั้งหด"
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : jobcontroller : viewpublicjobsbycompany ` ,error);
        response.message = error.message  
        response.body = error
        res.redirect("/pagenotfound")
    }
}

