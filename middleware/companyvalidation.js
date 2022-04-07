
module.exports.checkpackage = async (req,res) => {

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
