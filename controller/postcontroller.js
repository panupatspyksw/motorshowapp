const postservice = require("../service/postservice");
const constants = require("../constants");
const alert = require('alert');

module.exports.getaddnewpage = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await postservice.dataforselectpost(req)
        response.status = 200
        response.message = constants.post.postaddnew
        response.body = responsefromservice
        return res.render("jms/newpost", {data: responsefromservice})
    }
    catch (error) {
        console.log(`Something went wrong with : postcontroller : newpost ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }
}




module.exports.privateviewpost = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await postservice.privateviewpost({
            id: req.params.id
        })
        response.status = 200
        response.message = constants.post.postupdate
        response.body = responsefromservice
        res.render("jms/viewpost", {data : responsefromservice})
    }
    catch (error) {
        console.log(`Something went wrong with : postcontroller : privateviewpost ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }
}



module.exports.editpostdata = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await postservice.editpostdata(req)
        response.status = 200
        response.message = constants.post.postupdate
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : postcontroller : editpostdata ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }
    return res.status(response.status).send(response)
}

module.exports.newpost = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await postservice.newpost(req)
        response.status = 200
        response.message = constants.post.postaddnew
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : postcontroller : newpost ` ,error);
        response.message = error.message
        // throw new Error(error)
    }
    return res.status(response.status).send(response)
}

module.exports.allpostdata = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await postservice.getallpost({
            limit: req.query.limit,
            offset: req.query.offset,
            search: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            page: req.query.page
        })
        response.status = 200
        response.message = constants.post.postgetall
        response.body = responsefromservice
        return res.status(response.status).send(response)

    }
    catch (error) {
        console.log(`Something went wrong with : postcontroller : allpostdata ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }
}



module.exports.deletepost = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await postservice.deletepost(req.body)
        response.status = 200
        response.message = constants.post.postdelete
        response.body = responsefromservice
        return res.status(response.status).send(response)

    }
    catch (error) {
        console.log(`Something went wrong with : postcontroller : allpostpage ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
    }
}


module.exports.allpostpage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = ''
        response.status = 200
        response.message = constants.post.postgetall
        response.body = responsefromservice
        return res.render("jms/allpost")
    }
    catch (error) {
        console.log(`Something went wrong with : postcontroller : allpostpage ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
    }
}


module.exports.editpostpage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await postservice.editpostpage({
            id: req.params.id
        })
        response.status = 200
        response.message = constants.post.postupdate
        response.body = responsefromservice
        return res.render("jms/editpost",{data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : postcontroller : editpostpage ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }
}

module.exports.viewbyid = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await postservice.viewbyid({
            postid : req.params.id     
        })
        response.status = 200
        response.message = "เรียกข้อมูลโพสต์สำเร็จ"
        response.body = responsefromservice
        return res.status(response.status).render("main/postblog",{data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : postcontroller : viewbyid ` ,error);
        response.message = error.message  
        response.body = error
        return res.status(response.status).redirect("/pagenotfound")

    }

}






module.exports.viewpublicposts = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await postservice.viewpublicposts({
            page: req.params.page
        })
        response.status = 200
        response.message = "get viewpublicposts"
        response.body = responsefromservice
        
        return res.render("main/blog", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : postcontroller : viewpublicposts ` ,error);
        response.message = error.message
        return res.redirect('/home')

    }

}

