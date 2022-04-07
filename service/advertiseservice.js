const constants = require("../constants")
const mysql = require('mysql2/promise');
const connection = require('../database/connection');
const promisePool = connection.promise();
const sendmail = require('../helpers/sendmail')
const GCS = require('../cloudstorage/serve')
const paginationhelper = require('../helpers/pagination')


module.exports.create = async ({company,bodyservice,file}) => {
    try {
        var {title,body,cover} = bodyservice

        if(!file){
          throw "กรุณาตั้งรูปปกของโพสต์"
        }

        var {orj, filename, publicUrl} = await GCS.uploadfile(file)

        var [create] = await promisePool.query(`
            INSERT INTO advertises
            SET 
            company = ?,
            title = ?,
            body = ?,
            cover = ?,
            status = 0
        `, [company,title,body,publicUrl]);
          
          return create
    }
    catch(error){
      console.log(`Something went wrong  = advertiseservice  = create` ,error);
      throw new Error(error)
     }
  }


  module.exports.edit =async ({id,postid}) => {
    try {
      

        var [data] = await promisePool.query(`
        SELECT 
        *
        FROM advertises WHERE company = ? AND id = ? LIMIT 1;
        `, [id,postid]);

        if(data.length == 0){
          throw "notfound"
        }
          
          return data[0]
    }
    catch(error){
      console.log(`Something went wrong  = advertiseservice  = edit` ,error);
      throw error
     }
  }

  module.exports.save =async ({company,bodyservice,file,id}) => {
    try {
      
        var {title,body,cover} = bodyservice

        if(file){

        var {orj, filename, publicUrl} = await GCS.uploadfile(file)

        var [getoldcoverfile] = await promisePool.query(`
            SELECT cover from advertises
            WHERE company = ? and id = ?
        `, [company,id]);

        if(getoldcoverfile[0]?.cover){
          var file = getoldcoverfile[0].cover.split("/")
          file = file[file.length - 1]
          await GCS.deletefile(file)
        }

        var [update] = await promisePool.query(`
            UPDATE advertises
            SET 
            title = ?,
            body = ?,
            cover = ?,
            status = 0
            WHERE company = ? and id = ?
        `, [title,body,publicUrl,company,id]);

          return update

        }
        else{
  
          var [update] = await promisePool.query(`
              UPDATE advertises
              SET 
              title = ?,
              body = ?,
              status = 0
              WHERE company = ? and id = ?
          `, [title,body,company,id]);
  
          return update

          }
          
    }
    catch(error){
      console.log(`Something went wrong  = advertiseservice  = update` ,error);
      throw error
     }
  }

  module.exports.delete = async ({company,id}) => {
    try {

        var [deletee] = await promisePool.query(`
            DELETE advertises
            WHERE company = ?, id = ?
        `, [title,body,cover,company,id]);
          
          return deletee
    }
    catch(error){
      console.log(`Something went wrong  = advertiseservice  = delete` ,error);
      throw error
     }
  }


  module.exports.getmyadvertiseposts = async ({id, page = 1, limit = 10, offset = 0, search = '', dir = 'desc', order = 1}) => {
    try {
      limit = parseInt(limit);
      offset = parseInt(offset)
      order = parseInt(order)
      if((order*0)!= 0){
          order=1
      }
      if(page < 1){
          page = 1
      }
      search = `%${search}%`

      // offset = calSkip(page,limit)
      if(offset < 0 ){
        offset = 1
      }
      if(dir != 'desc'){
          dir = 'asc'
      }
      else{
          dir = 'desc'
      }   


        var [data] = await promisePool.query(`
            SELECT 
            CONVERT(id,char) as id,
            title,status,createat,expireat,
            DATE_FORMAT(createat, '%d-%m-%Y %H:%i:%s') AS created,
            IFNULL(DATE_FORMAT(expireat, '%d-%m-%Y %H:%i:%s'),'ยังไม่ได้กำหนด') AS expired
            FROM advertises
            WHERE company = ? AND title LIKE ? 
            ORDER BY ? ${dir}
            LIMIT ? OFFSET ?;
        `, [id,search,order,limit,offset]);
          
          var [total] = await promisePool.query(`
          SELECT COUNT(*) FROM advertises
          WHERE company = ? AND title LIKE ? 
          `,[id,search]);



          total = total[0].total ?? 0
          var size = limit;
          var pages = calPage(total, size)
  

          return { total, size, pages, order, dir ,page, data}
    }
    catch(error){
      console.log(`Something went wrong  = advertiseservice  = views` ,error);
      throw error
     }
  }



  module.exports.deletemyadvertiseposts = async ({id, deletechecks}) => {
    try {

      
        var [data] = await promisePool.query(`
        DELETE FROM advertises WHERE id in (?) AND company = ? ;
        `, [deletechecks,id]);

        return "success"
    }
    catch(error){
      console.log(`Something went wrong  = advertiseservice  = deletemyadvertiseposts` ,error);
        var sqlMessage = error.sqlMessage
        if(sqlMessage){
        var errorpath = sqlMessage.split(`'`)[3].split(`_`)[0]
        throw [ { errorpath: [ errorpath ], errormsg: 'ไม่สามารถใช้ข้อมูลซ้ำได้' } ]
        }
        else{
          throw new Error(error)
        }
     }
  }

  module.exports.viewmyadvertisepost = async ({id,postid}) => {
    try {

        var [data] = await promisePool.query(`
            SELECT * FROM advertises
            WHERE company = ? and id = ? LIMIT 1;
        `, [id,postid]);
          
          if(data.length == 0){
            throw "notfound"
          }

          return data[0]
    }
    catch(error){
      console.log(`Something went wrong  = advertiseservice  = viewmyadvertisepost` ,error);
      throw error
     }
  }


  module.exports.viewbyid = async ({postid}) => {
    try {

        var [data] = await promisePool.query(`
            SELECT * FROM advertises
            WHERE id = ? LIMIT 1;
        `, [postid]);
          
        if(!data.length){
          throw "notfound"
        }

          return data[0]
    }
    catch(error){
      console.log(`Something went wrong  = advertiseservice  = viewbyid` ,error);
      throw error
     }
  }



  
  module.exports.viewpublicadvertises = async ({page = 1, limit = 9, offset = 0, dir = 'desc'}) => {
    try {

        
      limit = parseInt(limit);
      offset = parseInt(offset)

      if(page < 1){
          page = 1
      }

      offset = calSkip(page,limit)

      if(dir != 'desc'){
          dir = 'asc'
      }
      else{
          dir = 'desc'
      }   

        var [data] = await promisePool.query(`
            SELECT * FROM advertises
            WHERE status = 1 
            ORDER BY updateat ${dir}
          LIMIT ? OFFSET ?;
          `,[limit,offset]);
          
        var [total] = await promisePool.query(`
        SELECT COUNT(*) as total FROM advertises
        WHERE status = 1;
        `);
        total = total[0].total ?? 0
        var size = limit;
        var pages = calPage(total, size)
        var pagination = ''
        if(data.length){
          pagination = await paginationhelper.pagination(page,pages,'/advertises/')
        }
        

        return { total, size, pages,dir ,page, data, pagination}
    }
    catch(error){
      console.log(`Something went wrong  = advertiseservice  = viewpublicadvertises` ,error);
      throw error
     }
  }
  

  const calSkip = (page, size) => {
    return (page - 1) * size;
  };
  
  const calPage = (count, size) => {
    return Math.ceil(count / size);
  };

