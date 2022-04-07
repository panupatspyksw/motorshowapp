const constants = require('../constants');
module.exports.imageonly = async (req,res,next) => {
    let response = {...constants.defaultserverresponse};
    try{
       if(req.file){
           await filefilterimage(req.file)
           await filefiltersize(req.file)
       }
       if(req.files){
            for(var i=0; i<req.files.length; i++){
                await filefilterimage(req.files[i])
                await filefiltersize(req.files[i])
            }
       }
       else{
           throw "กรุณาอัพโหลดไฟล์"
       }
       console.log("ประเภทและขนาดไฟล์ถูกต้อง")
    //    return res.status(response.status).send("WTFFFF")

       return next()
    }
    catch (error) {
        console.log(`Something went wrong with : middleware : imageonly ` ,error);
        response.message = error
        return res.status(response.status).send(response)

    }

}




module.exports.filefilterjpegjpgpdf = async (req,res,next) => {
    let response = {...constants.defaultserverresponse};
    try{
       if(req.file){
           await filefilterjpegjpgpdf(req.file)
           await filefiltersize(req.file)
       }
       if(req.files){
            for(var i=0; i<req.files.length; i++){
                await filefilterjpegjpgpdf(req.files[i])
                await filefiltersize(req.files[i])
            }
       }
       else{
           throw "กรุณาอัพโหลดไฟล์"
       }
       console.log("ประเภทและขนาดไฟล์ถูกต้อง")
    //    return res.status(response.status).send("WTFFFF")

       return next()
    }
    catch (error) {
        console.log(`Something went wrong with : middleware : imageonly ` ,error);
        response.message = error
        return res.status(response.status).send(response)

    }

}


function filefilterjpegjpgpdf(file) {
    return new Promise((resolve,reject)=>{
        if(file.mimetype == 'application/pdf' || file.mimetype == 'image/jpeg' ||  file.mimetype == 'image/jpg'){
            resolve(true)
        }
        else{
            reject("กรุณาอัพโหลดประเภทไฟล์ที่เป็น pdf jpg jpeg เท่านั้น")
        }
    })
   
}

function filefilterimage(file) {
    return new Promise((resolve,reject)=>{
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' ||  file.mimetype == 'image/jpg'){
            resolve(true)
        }
        else{
            reject("กรุณาอัพโหลดประเภทไฟล์ที่เป็น png jpg jpeg เท่านั้น")
        }
    })
   
}
function filefiltersize(file) {
    return new Promise((resolve,reject)=>{
        if(file.size < 5242880){
            resolve(true)
        }
        else{
            reject("กรุณาอัพโหลดไฟล์ขนาดไม่เกิน 5 MB")
        }
    })

}