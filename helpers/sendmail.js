const nodemailer = require("nodemailer");
const crypto = require('crypto')
const dotEnv = require('dotenv');
dotEnv.config();

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendmailforgotpassword = async (toemail, newpassword) => {

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "pnpspyksw.dev@gmail.com",
      pass: "Oneofakind123!",
    },
  });

  var html = ``
  let info = await transporter.sendMail({
    from: 'JMS Job Marketing for Society  <pnpspyksw.dev@gmail.com>', // sender address
    to: toemail, // list of receivers
    subject: "ยืนยันการเปลี่ยนรหัสผ่านของคุณ",
    html: `
    รหัสผ่านใหม่ของคุณ : ${newpassword}
    <div style=" background: lightgray;  padding: 3em; overflow: hidden; text-align: center;">
        <div style="margin: 0 auto 0 auto; padding: 20px 7%; display: block; text-align: center;  max-width: 500px; background: white; border: solid 1px lightgray; ">
                <img src="https://lh3.googleusercontent.com/proxy/FZSM0kQBcqrGlHGTr76OYfJ9AxxalCMqXb-AVp29UmHbRnF21DZbSFJoEgRyQ9W4avpC4C2X77OTQd1jYAWae0IFihgAj5U4fL5_uiIO5dPNkWAuOvJrSx0NujvtnJTrGxk6OkvWjAhlTy-e-H9Hdg" width="100px" height="100px" alt="" style="margin: 0 auto 0 auto;">
                <h3 style="margin: 0 auto 0 auto; color: black;">ศูนย์บริการวิชาการ มหาวิทยาลัยศรีนครินทรวิโรฒ</h3>
                <span style="color: black;">ระบบติดตามผลการดำเนินการโครงการ</span>
                <h4 style="color: black;">รหัสผ่านใหม่ของคุณ</h4> 
                <h1 style="color: black;">${newpassword}</h1>
                <div style="color: black;">กรุณาเก็บรหัสนี้เป็นความลับ</div> 
                <hr style="margin: 2em 0; color: black;">
                <div style="padding-bottom: 2em; color: black;">ติดต่อสอบถามเพิ่มเติม : (+66)64-698-6888</div>
        </div>
    </div>
            `, // html body
  }).then((error, result) => {
    if (error){
      console.log(error)
      return error;
    } 
    console.log(result)
    return result;
  });
  console.log(info)
  return info
}


// async..await is not allowed in global scope, must use a wrapper
module.exports.sendmail_confirm_signup = async (toemail, username, token, type) => {

    let testAccount = await nodemailer.createTestAccount();
  
    let transporter = nodemailer.createTransport({
      pool: true,
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use TLS
      auth: {
        user: "pnpspyksw.dev@gmail.com",
        pass: "Oneofakind123!",
      },
    });
  
    var html = ``
    let info = await transporter.sendMail({
      from: 'JMS Job Marketing for Society  <pnpspyksw.dev@gmail.com>', // sender address
      to: toemail, // list of receivers
      subject: "ยืนยันการสมัครสมาชิก เว็บไซต์ JMS",
      html: `
      ชื่อบัญชีเข้าสู่ระบบ : ${username}<br>
      ลิงค์ยืนยัน : ${process.env.HOSTURL}/${type}/confirmsignup/${username}/${token}<br>
      <link href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500&display=swap" rel="stylesheet">
      <div style=" background: lightgray;  padding: 3em; overflow: hidden; text-align: center;">
          <div style="margin: 0 auto 0 auto; padding: 20px 7%; display: block; text-align: center;  max-width: 500px; background: white; border: solid 1px lightgray; ">
                  <img src="https://storage.googleapis.com/jmspublicmedia/jmslogo.png" width="100px" height="100px" alt="" style="margin: 0 auto 0 auto;">
                  <h3 style="margin: 0 auto 0 auto; color: black;">JMS Job Marketing for Society</h3>
                  <h4 style="color: black;">กรุณาคลิกปุ่มเพื่อยืนยันการลงทะเบียน</h4>
                  <a href="${process.env.HOSTURL}/${type}/confirmsignup/${username}/${token}">
                  <button style="
                  font-family: 'Prompt', sans-serif; font-weight: bold;
                  padding: 3% 6%; background: rgb(5, 186, 116); font-size: 25px; margin-bottom: 20px; text-align: center;border-radius:50px; color:white; border:0px;">ยืนยันการลงทะเบียน</button>
                  </a>
                  <div style="color: black;">กรุณาทำการยืนยันหลังจากที่ได้รับแจ้งเตือนนี้ภายใน 15 นาที</div>
                  <h4 style="color: black;">ชื่อบัญชีเข้าสู่ระบบ</h4>
                  <div style="color: black;">${username}</div>
                  <hr style="margin: 2em 0; color: black;">
                  <div style="padding-bottom: 2em; color: black;">ติดต่อสอบถามเพิ่มเติม : (+66)64-698-6888</div>
          </div>
      </div>
              `, // html body
    }).then((error, result) => {
      if (error){
        console.log(error)
        return error;
      } 
      return result;
    });
    return info
  }


  module.exports.sendmail_confirm_changepassword = async (toemail, username, token, type) => {

    let testAccount = await nodemailer.createTestAccount();
  
    let transporter = nodemailer.createTransport({
      pool: true,
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use TLS
      auth: {
        user: "pnpspyksw.dev@gmail.com",
        pass: "Oneofakind123!",
      },
    });
  
    var html = ``
    let info = await transporter.sendMail({
      from: 'JMS Job Marketing for Society  <pnpspyksw.dev@gmail.com>', // sender address
      to: toemail, // list of receivers
      subject: "ยืนยันการเปลี่ยนรหัสผ่าน เว็บไซต์ JMS",
      html: `
      ชื่อบัญชีเข้าสู่ระบบ : ${username}<br>
      ลิงค์ยืนยัน : ${process.env.HOSTURL}/${type}/confirmchangepassword/${username}/${token}<br>
      <link href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500&display=swap" rel="stylesheet">
      <div style=" background: lightgray;  padding: 3em; overflow: hidden; text-align: center;">
          <div style="margin: 0 auto 0 auto; padding: 20px 7%; display: block; text-align: center;  max-width: 500px; background: white; border: solid 1px lightgray; ">
                  <img src="https://storage.googleapis.com/jmspublicmedia/jmslogo.png" width="100px" height="100px" alt="" style="margin: 0 auto 0 auto;">
                  <h3 style="margin: 0 auto 0 auto; color: black;">JMS Job Marketing for Society</h3>
                  <h4 style="color: black;">กรุณาคลิกปุ่มเพื่อเปลี่ยนรหัสด้วยตนเอง</h4>
                  <a href="${process.env.HOSTURL}/${type}/confirmchangepassword/${username}/${token}">
                  <button style="
                  font-family: 'Prompt', sans-serif; font-weight: bold;
                  padding: 3% 6%; background: rgb(5, 186, 116); font-size: 25px; margin-bottom: 20px; text-align: center;border-radius:50px; color:white; border:0px;">ยืนยันการเปลี่ยนรหัสผ่าน</button>
                  </a>
                  <div style="color: black;">กรุณาทำการยืนยันหลังจากที่ได้รับแจ้งเตือนนี้ภายใน 15 นาที</div>
                  <h4 style="color: black;">ชื่อบัญชีเข้าสู่ระบบ</h4>
                  <div style="color: black;">${username}</div>
                  <hr style="margin: 2em 0; color: black;">
                  <div style="padding-bottom: 2em; color: black;">ติดต่อสอบถามเพิ่มเติม : (+66)64-698-6888</div>
          </div>
      </div>
              `, // html body
    }).then((error, result) => {
      if (error){
        console.log(error)
        return error;
      } 
      return result;
    });
    return info
  }


const allowed = {
  uppers: "QWERTYUIOPASDFGHJKLZXCVBNM",
  lowers: "qwertyuiopasdfghjklzxcvbnm",
  numbers: "1234567890",
  symbols: "!@#$%^&*"
}

const getRandomCharFromString = (str) => str.charAt(Math.floor(Math.random() * str.length))

module.exports.generatePassword = async (length = 8) => { // password will be @Param-length, default to 8, and have at least one upper, one lower, one number and one symbol
  let pwd = "";
  pwd += getRandomCharFromString(allowed.uppers); //pwd will have at least one upper
  pwd += getRandomCharFromString(allowed.lowers); //pwd will have at least one lower
  pwd += getRandomCharFromString(allowed.numbers); //pwd will have at least one number
  pwd += getRandomCharFromString(allowed.symbols);//pwd will have at least one symbolo
  for (let i = pwd.length; i < length; i++)
      pwd += getRandomCharFromString(Object.values(allowed).join('')); //fill the rest of the pwd with random characters
  return pwd
}


