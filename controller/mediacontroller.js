const mediaservice = require("../service/mediaservice");
const constants = require("../constants");
const alert = require('alert');




module.exports.uploadfile = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mediaservice.uploadfile(req)
        response.status = 200
        response.message = constants.media.mediaupload
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : mediacontroller : uploadfile ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }
    // return res.render("projectnew",{data:response.body})
}

module.exports.deletefile = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mediaservice.deletefile(req.body)
        response.status = 200
        response.message = constants.media.mediadelete
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : mediacontroller : uploadfile ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }

}


module.exports.getallmediapage = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = ''
        response.status = 200
        response.message = constants.media.mediagetall
        response.body = responsefromservice
        return res.render("jms/medialibrary")

    }
    catch (error) {
        console.log(`Something went wrong with : mediacontroller : getallmediapage ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }
    // return res.render("projectnew",{data:response.body})
}

module.exports.opengridmediapage = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = ''
        response.status = 200
        response.message = constants.media.mediagetall
        response.body = responsefromservice
        return res.render("jms/mediagrid")

    }
    catch (error) {
        console.log(`Something went wrong with : mediacontroller : getallmediapage ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }
    // return res.render("projectnew",{data:response.body})
}

module.exports.getallmediagrid = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mediaservice.getallmediagrid({
            search: req.query.search
        })
        response.status = 200
        response.message = constants.media.mediagetall
        response.body = responsefromservice
        return res.status(response.status).send(response)

    }
    catch (error) {
        console.log(`Something went wrong with : mediacontroller : getallmediapage ` ,error);
        response.message = error.message
        return res.status(response.status).send(response)
        // throw new Error(error)
    }
    // return res.render("projectnew",{data:response.body})
}



module.exports.getallmedia = async (req,res) => {

    let response = {...constants.defaultserverresponse};
    try{

        const responsefromservice = await mediaservice.getallmedia({
            limit: req.query.limit,
            offset: req.query.offset,
            search: req.query.search,
            dir: req.query.dir,
            order: req.query.order,
            page: req.query.page

        })
        response.status = 200
        response.message = constants.media.mediagetall
        response.body = responsefromservice
        return res.status(response.status).send(response)
    }
    catch (error) {
        console.log(`Something went wrong with : controller : getallmedia ` ,error);
        response.message = error.message  
        // throw new Error(error)
    }
    return res.status(response.status).send(response)
}


