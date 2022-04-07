const mainservice = require("../service/mainservice");
const constants = require("../constants");
const alert = require('alert');


// controller call data for form

module.exports.getallcompanytypes = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mainservice.getallcompanytypes()
        response.status = 200
        response.message = "get all companytypes success"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : maincontroller : getallcompanytypes ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)

}


module.exports.getallprovinces = async (req,res) => {
        let response = {...constants.defaultserverresponse};
        try{
            const responsefromservice = await mainservice.getallprovinces()
            response.status = 200
            response.message = "get all provinces success"
            response.body = responsefromservice
        }
        catch (error) {
            console.log(`Something went wrong with : maincontroller : getallprovinces ` ,error);
            response.message = error.message
        }
        return res.status(response.status).send(response)
    
}
    

module.exports.get_all_amphoes_by_province = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mainservice.get_all_amphoes_by_province({
            id: req.body.id
        })
        response.status = 200
        response.message = "get all amphoes by province success"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : maincontroller : get_all_amphoes_by_province ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)

}

module.exports.get_all_tambons_by_amphoe = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mainservice.get_all_tambons_by_amphoe({
            id: req.body.id
        })
        response.status = 200
        response.message = "get all tambons by amphoe success"
        response.body = responsefromservice
    }
    catch (error) {
        console.log(`Something went wrong with : maincontroller : get_all_tambons_by_amphoe ` ,error);
        response.message = error.message
    }
    return res.status(response.status).send(response)

}


// get data list all for form
module.exports.get_data_lists = (tablename) => {
    return async (req, res, next) => {    
        let response = {...constants.defaultserverresponse};
        try{
            const responsefromservice = await mainservice.get_data_lists({table: tablename})
            response.status = 200
            response.message = "get all lists"
            response.body = responsefromservice
        }
        catch (error) {
            console.log(`Something went wrong with : maincontroller : get_data_lists ` ,error);
            response.message = error.message
        }
        res.status(response.status).send(response)
    }
}

module.exports.get_data_lists_with_less_than_id = (tablename) => {
    return async (req, res, next) => {    
        let response = {...constants.defaultserverresponse};
        try{

            const responsefromservice = await mainservice.get_data_lists_with_less_than_id({
                id: req.body.id,
                table: tablename
            })
            response.status = 200
            response.message = "get all lists by less than id"
            response.body = responsefromservice
        }
        catch (error) {
            console.log(`Something went wrong with : maincontroller : get_data_lists_with_less_than_id ` ,error);
            response.message = error.message
        }
        return res.status(response.status).send(response)

    }
}



// user main controller
module.exports.usersignout = (req, res) => {
    let response = {...constants.defaultserverresponse};
    response.status = 200
    response.message = "ทำการออกจากระบบ"
    res.cookie('jwt', '', { maxAge: 1 });
    // res.redirect('/');
    return res.redirect('/home')
}

//call data for page
module.exports.getcompanyprofile = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mainservice.getcompanyprofile({
            id: req.params.company_id
        })
        response.status = 200
        response.message = "get company profile success"
        response.body = responsefromservice
        
        return res.render("candidate/profilecompany", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : maincontroller : getcompanyprofile ` ,error);
        response.message = error.message
        return res.redirect('/home')

    }
    return res.status(response.status).send(response)

}

//call data for page
module.exports.price = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mainservice.package()
        response.status = 200
        response.message = "get package"
        response.body = responsefromservice
        
        return res.render("main/price", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : maincontroller : package ` ,error);
        response.message = error.message
        return res.redirect('/home')

    }
    return res.status(response.status).send(response)

}

module.exports.banner = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mainservice.banner()
        response.status = 200
        response.message = "get banner"
        response.body = responsefromservice
        
        return res.render("main/banner", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : maincontroller : banner ` ,error);
        response.message = error.message
        return res.redirect('/home')

    }
    return res.status(response.status).send(response)

}

module.exports.pricecalculator = async (req,res) => {
    let response = {...constants.defaultserverresponse};
    try{
        const responsefromservice = await mainservice.pricecalculator()
        response.status = 200
        response.message = "get pricecalculator"
        response.body = responsefromservice
        
        return res.render("main/pricecalculator", {data: responsefromservice})

    }
    catch (error) {
        console.log(`Something went wrong with : maincontroller : pricecalculator ` ,error);
        response.message = error.message
        return res.redirect('/home')

    }
    return res.status(response.status).send(response)

}

