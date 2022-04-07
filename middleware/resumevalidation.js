
const constants = require('../constants');
const connection = require('../database/connection');
const promisePool = connection.promise();

module.exports.resumecheckexist = async (req, res, next) => {
    let response = {...constants.defaultserverresponse};
    try{
        var [isexist] = await promisePool.query(`
        SELECT id FROM resumes 
        WHERE candidate = ?
        `, [req.cookies.jwt.id]);

        if(!isexist.length){
            throw "คุณยังไม่ได้สร้างเรซูเม่"
        }
        else{
            return next()
        }

    }
    catch (error) {

        console.log(`Something went wrong with : resumevalidation : resumecheckexist ` ,error);
        response.message = error
        return res.status(response.status).send(response)
    }

}