const jobapplyservice = require("../service/jobapplyservice");
const constants = require("../constants");
const alert = require('alert');
const table = 'resumes'
const GCSP = require('../cloudstorage/privateserve')

module.exports.candidatejobapply = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await jobapplyservice.candidatejobapply({
            candidate : req.cookies.jwt.id,
            jobid: req.params.jobid
        })
        response.status = 200
        response.message = constants.post.postaddnew
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : jobapplycontroller : newpost ` ,error);
        response.message = error.message

        // throw new Error(error)
    }
    return res.status(response.status).send(response)

}

module.exports.getmycandidates = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        req.query = Object.entries(req.query).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})

        const responsefromservice = await jobapplyservice.getmycandidates({
            id : req.cookies.jwt.id,
            limit: req.query.limit,
            offset: req.query.offset,
            search: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            page: req.query.page,
            applystatus : req.query.applystatus
        })
        response.status = 200
        response.message = "เรียกข้อมูลสำเร็จ"
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : jobapplycontroller : getmyadvertiseposts ` ,error);
        response.message = error.message  
        response.body = error
        res.redirect("/pagenotfound")
    }
}


module.exports.updateapplystatusmycandidates = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        req.body.resumechecks = Array.isArray(req.body.resumechecks) ? req.body.resumechecks : [req.body.resumechecks];
        const responsefromservice =  await jobapplyservice.updateapplystatusmycandidates({
            id : req.cookies.jwt.id,
            resumechecks : req.body.resumechecks,
            applystatus: req.params.applystatus            
        })
       
        response.status = 200
        response.message = "ลบโพสต์สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : jobapplycontroller : deletemyadvertiseposts ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)

}


