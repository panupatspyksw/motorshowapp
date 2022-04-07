const Joi = require('joi')
const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

var nowhitespacexallowallcharacterandnumber = "^[\u0E00-\u0E7Fa-zA-Z0-9./]+[\u0E00-\u0E7Fa-zA-Z0-9. ]+[\u0E00-\u0E7Fa-zA-Z0-9.]{1,2000}$"

var username =  Joi.string().min(8)
            .max(14)
            .pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9]{1,30}$'))
            .required()
            .messages({ 
                        'string.empty':'กรุณากรอกชื่อผู้ใช้งาน',
                        'any.required': `กรุณากรอกชื่อผู้ใช้งาน`,
                        'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 8 ตัว`,
                        'string.max': `ต้องมีตัวอักษรไม่เกิน 14 ตัว`,
                        'string.pattern.base': 'กรอกเป็นภาษาอังกฤษนำหน้าและตัวเลขได้เท่านั้น'
            })

var email = Joi.string().required().email()
    .messages({
        'string.empty':'กรุณากรอกอีเมล',
        'any.required':'กรุณากรอกอีเมล',
        'string.email':'กรุณากรอกเป็นรูปแบบอีเมล'
    })

    var password = Joi.string().min(8).max(20).pattern(new RegExp(strongPasswordRegex)).required()
    .messages({
                'string.empty': `กรุณากรอกรหัสผ่าน`,
                'any.required': `กรุณากรอกรหัสผ่าน`,
                'string.min': `รหัสต้องมีความยาวไม่ต่ำกว่า 8 ตัว`,
                'string.max': `รหัสต้องมีความยาวไม่เกิน 20 ตัว`,
                'string.pattern.base': 'รหัสต้องประกอบด้วยตัวอักษรเล็ก ใหญ่ ตัวเลข และสัญลักษณ์พิเศษ อย่างน้อย 1 ตัว'
    })

var repassword = Joi.string().min(8).max(20).valid(Joi.ref('password')).pattern(new RegExp(strongPasswordRegex)).required()
    .messages({
                'string.empty': `กรุณากรอกยืนยันรหัสผ่าน`,
                'any.required': `กรุณากรอกยืนยันรหัสผ่าน`,
                'any.only' : 'ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่าน',
                'string.min': `รหัสต้องมีความยาวไม่ต่ำกว่า 8 ตัว`,
                'string.max': `รหัสต้องมีความยาวไม่เกิน 20 ตัว`,
                'string.pattern.base': 'รหัสต้องประกอบด้วยตัวอักษรเล็ก ใหญ่ ตัวเลข และสัญลักษณ์พิเศษ อย่างน้อย 1 ตัว'
})

var agreement = Joi.string().required().valid('1').messages({ 
    'string.empty': `กรุณาตกลงเงื่อนไขการใช้งาน`,
    'string.base': `กรุณาตกลงเงื่อนไขการใช้งาน`,
    'any.required': `กรุณาตกลงเงื่อนไขการใช้งาน`,
    'string.min': `กรุณาตกลงเงื่อนไขการใช้งาน`,
    'string.max': `กรุณาตกลงเงื่อนไขการใช้งาน`,
    'any.only' : 'กรุณาตกลงเงื่อนไขการใช้งาน',
    'any.invalid' : 'กรุณาตกลงเงื่อนไขการใช้งาน',
})

var remember_me = Joi.string().allow(null).valid('1').messages({ 
    'string.empty': `กรุณาเลือกเฉพาะจากช่อง`,
    'string.base': `กรุณาเลือกเฉพาะจากช่อง`,
    'any.required': `กรุณาเลือกเฉพาะจากช่อง`,
    'string.min': `กรุณาเลือกเฉพาะจากช่อง`,
    'string.max': `กรุณาเลือกเฉพาะจากช่อง`,
    'any.only' : 'กรุณาเลือกเฉพาะจากช่อง',
    'any.invalid' : 'กรุณาเลือกเฉพาะจากช่อง',
})

module.exports.usersignin = Joi.object().keys({
    username: username,
    password: password,
    remember_me: remember_me
})

module.exports.usersignup = Joi.object().keys({
    username: username,
    password: password,
    repassword: repassword,
    email: email,
    agreement : agreement
})


module.exports.requestforgotpassword = Joi.object().keys({
    email: email
})

module.exports.resetpassword = Joi.object().keys({
    password: password,
    repassword: repassword,
})
