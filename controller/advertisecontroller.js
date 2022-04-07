const advertiseservice = require("../service/advertiseservice");
const constants = require("../constants");
const alert = require('alert');



module.exports.create = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{


        const responsefromservice = await advertiseservice.create({
            company : req.cookies.jwt.id,
            bodyservice : req.body,
            file: req.files[0]
        })

        response.status = 200
        response.message = "สร้างสำเร็จ"
        response.body = responsefromservice

    }
    catch (error) {
        console.log(`Something went wrong with : advertisecontroller : create ` ,error);
        response.message = error.message 
        response.body = error

        // throw new Error(error)
    }
    return res.status(response.status).send(response)
}

module.exports.edit = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{

        const responsefromservice = await advertiseservice.edit({
            id : req.cookies.jwt.id,
            postid : req.params.id,
        })
        response.status = 200
        response.message = "เรียกดูข้อมูลสำเร็จ"
        response.body = responsefromservice
        return res.status(response.status).render("company/createandeditadvertise",{data: responsefromservice, title: "แก้ไขโพสต์ประชาสัมพันธ์"})

    }
    catch (error) {
        console.log(`Something went wrong with : advertisecontroller : edit ` ,error);
        response.message = error.message 
        response.body = error
        return res.status(response.status).redirect("/pagenotfound")

        // throw new Error(error)
    }
}

module.exports.save = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await advertiseservice.save({
            company : req.cookies.jwt.id,
            bodyservice : req.body,
            file: req.files[0],
            id: req.params.id
        })
        response.status = 200
        response.message = "แก้ไขโพสต์ประชาสัมพันธ์สำเร็จ"
        response.body = responsefromservice

    }
    catch (error) {
        console.log(`Something went wrong with : advertisecontroller : edit ` ,error);
        response.message = error.message 
        response.body = error

        // throw new Error(error)
    }
    return res.status(response.status).send(response)

}


module.exports.getmyadvertiseposts = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        
        const responsefromservice = await advertiseservice.getmyadvertiseposts({
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
        console.log(`Something went wrong with : advertisecontroller : getmyadvertiseposts ` ,error);
        response.message = error.message  
        response.body = error
        res.redirect("/pagenotfound")
    }
}


module.exports.deletemyadvertiseposts = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        req.body.deletecheck = Array.isArray(req.body.deletecheck) ? req.body.deletecheck : [req.body.deletecheck];

        const responsefromservice =  await advertiseservice.deletemyadvertiseposts({
            id : req.cookies.jwt.id,
            deletechecks : req.body.deletecheck,            
        })
       
        response.status = 200
        response.message = "ลบโพสต์สำเร็จ"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : advertisecontroller : deletemyadvertiseposts ` ,error);
        response.message = error.message  
        response.body = error
    }
    return res.status(response.status).send(response)

}

module.exports.viewmyadvertisepost = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await advertiseservice.viewmyadvertisepost({
            id : req.cookies.jwt.id,
            postid : req.params.id     
        })
        response.status = 200
        response.message = "เรียกข้อมูลโพสต์สำเร็จ"
        response.body = responsefromservice
        return res.status(response.status).render("main/postadvertise",{data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : advertisecontroller : viewmyadvertisepost ` ,error);
        response.message = error.message  
        response.body = error
        return res.status(response.status).redirect("/pagenotfound")

    }

}
module.exports.viewbyid = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await advertiseservice.viewbyid({
            postid : req.params.id     
        })
        response.status = 200
        response.message = "เรียกข้อมูลโพสต์สำเร็จ"
        response.body = responsefromservice
        return res.status(response.status).render("main/postadvertise",{data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : advertisecontroller : viewbyid ` ,error);
        response.message = error.message  
        response.body = error
        return res.status(response.status).redirect("/pagenotfound")

    }

}



module.exports.views = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{

        const responsefromservice = await advertiseservice.views({
            company : req.cookies.jwt.id,
            bodyservice : req.body,
            file: req.file
        })

        response.status = 200
        response.message = "เรักยข้อมูลสำเร็จ"
        response.body = responsefromservice
        res.render("company/myadvertises",{data:responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : advertisecontroller : edit ` ,error);
        response.message = error.message 
        response.body = error
        return res.redirect("/pagenotfound")

        // throw new Error(error)
    }
}



module.exports.viewpublicadvertises = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await advertiseservice.viewpublicadvertises({
            page: req.params.page
        })
        response.status = 200
        response.message = "get viewpublicadvertises"
        response.body = responsefromservice
        
        return res.render("main/advertises", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : advertisecontroller : viewpublicadvertises ` ,error);
        response.message = error.message
        return res.redirect('/home')

    }

}

