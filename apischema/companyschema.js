const Joi = require('joi')
var nowhitespacexallowallcharacterandnumber = "^[\u0E00-\u0E7Fa-zA-Z0-9./-]+[\u0E00-\u0E7Fa-zA-Z0-9\.\r\n\-/ ]+[\u0E00-\u0E7Fa-zA-Z0-9.-]{1,2000}$"
const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

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

var repassword = Joi.string().min(8).max(20).valid(Joi.ref('password')).required()
    .messages({
                'string.empty': `กรุณากรอกยืนยันรหัสผ่าน`,
                'any.required': `กรุณากรอกยืนยันรหัสผ่าน`,
                'any.only' : 'ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่าน',
                'string.min': `รหัสต้องมีความยาวไม่ต่ำกว่า 8 ตัว`,
                'string.max': `รหัสต้องมีความยาวไม่เกิน 20 ตัว`,
                'string.pattern.base': 'รหัสต้องประกอบด้วยตัวอักษรเล็ก ใหญ่ ตัวเลข และสัญลักษณ์พิเศษ อย่างน้อย 1 ตัว'
})

var company_name = Joi.string().required().max(100).min(5)
    .messages({ 
        'string.empty': `กรุณากรอกชื่อบริษัท`,
        'any.required': `กรุณากรอกชื่อบริษัท`,
        'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 5 ตัว`,
        'string.max': `ต้องมีตัวอักษรไม่เกิน 100 ตัว`,
        'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var company_type = Joi.number().min(1).max(999).required().messages({ 
    'any.required': `กรุณาเลือกประเภทธุรกิจ`,
    'string.empty': 'กรุณาเลือกประเภทธุรกิจ',
    'number.base': 'กรุณาเลือกประเภทธุรกิจ',
    'number.min': `กรุณาเลือกประเภทธุรกิจในตัวเลือก`,
    'number.max': `กรุณาเลือกประเภทธุรกิจนตัวเลือก`,
})

var contact_name = Joi.string().required().max(60).min(10).messages({ 
    'string.empty': `กรุณากรอกชื่อผู้ติดต่อ`,
    'any.required': `กรุณากรอกชื่อผู้ติดต่อ`,
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 60 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var sociallink = Joi.string().uri().allow(null,'').max(200).messages({ 
    'any.required': `กรุณากรอกเป็นลิงค์เท่านั้น`,
    'string.empty': `กรุณากรอกเป็นลิงค์เท่านั้น`,
    'string.max': `ลิงค์ห้ามยาวเกิน 200 ตัวอักษร`,
    'string.dataUri': 'กรุณากรอกเป็นลิงค์เท่านั้น',
    'string.uri': 'กรุณากรอกเป็นลิงค์เท่านั้น',
    'string.domain': 'กรุณากรอกเป็นลิงค์เท่านั้น'

    // 'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})

var address = Joi.string().required().min(10).max(1000).messages({ 
    'any.required': `กรุณากรอกรายระเอียดที่อยู่`,
    'string.empty': `กรุณากรอกรายระเอียดที่อยู่`,
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 1000 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})

var company_detail = Joi.string().min(10).max(5000).required().messages({ 
    'any.required': `กรุณากรอกรายละเอียดบริษัท`,
    'string.empty': `กรุณากรอกรายละเอียดบริษัท`,
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 100 ตัว`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 5000 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัดว่าง'
})

var company_goal = Joi.string().min(100).max(5000).required().messages({ 
    'any.required': `กรุณากรอกเป้าหมายของบริษัท`,
    'string.empty': `กรุณากรอกเป้าหมายของบริษัท`,
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 100 ตัว`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 5000 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัดว่าง'
})

var province = Joi.number().min(1).max(77).required().messages({ 
    'any.required': `กรุณาเลือกจังหวัด`,
    'string.empty': 'กรุณาเลือกจังหวัด',
    'number.base': 'กรุณาเลือกจังหวัด',
    'number.min': `กรุณาเลือกจังหวัดในตัวเลือก`,
    'number.max': `กรุณาเลือกจังหวัดในตัวเลือก`,
})

var amphoe = Joi.number().min(1).max(999).required().messages({ 
    'any.required': `กรุณาเลือกอำเภอ/เขต`,
    'string.empty': 'กรุณาเลือกอำเภอ/เขต',
    'number.base': 'กรุณาเลือกอำเภอ/เขต',
    'number.min': `กรุณาเลือกอำเภอ/เขตในตัวเลือก`,
    'number.max': `กรุณาเลือกอำเภอ/เขตในตัวเลือก`,
})

var tambon = Joi.number().min(1).max(8000).required().messages({ 
    'any.required': `กรุณาเลือกตำบล/แขวง`,
    'string.empty': 'กรุณาเลือกตำบล/แขวง',
    'number.base': 'กรุณาเลือกตำบล/แขวง',
    'number.min': `กรุณาเลือกตำบล/แขวงในตัวเลือก`,
    'number.max': `กรุณาเลือกตำบล/แขวงในตัวเลือก`,
})

var postal = Joi.string().min(5).max(5).required().pattern(new RegExp('^(?!0)([0-9]{5})$')).messages({ 
    'any.required': `กรุณากรอกรหัสไปรษณีย์`,
    'string.empty': 'กรุณากรอกรหัสไปรษณีย์',
    'string.base': 'กรุณากรอกรหัสไปรษณีย์',
    'string.min': `กรุณากรอกเป็นตัวเลข 5 หลักเท่านั้น`,
    'string.max': `กรุณากรอกเป็นตัวเลข 5 หลักเท่านั้น`,
    'string.pattern.base': 'กรุณาเป็นรหัสไปรษณีย์เท่านั้น'
})

var benefit = Joi.string().min(1).max(1000).required().messages({ 
    'any.required': `กรุณากรอกสวัสดิการ`,
    'string.empty': 'กรุณากรอกสวัสดิการ',
    'string.base': 'กรุณากรอกสวัสดิการ',
    'string.min': `กรุณากรอกสวัสดิการ`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 1000 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'

})

var bts = Joi.string().allow(null).valid('1', '0').messages({ 
    'string.min': `กรุณาติกเลือกจากช่องเท่านั้น`,
    'string.max': `กรุณาติกเลือกจากช่องเท่านั้น`,
    'any.only' : 'กรุณาติกเลือกจากช่องเท่านั้น',
})

var mrt = Joi.string().allow(null).valid('1', '0').messages({ 
    'string.min': `กรุณาติกเลือกจากช่องเท่านั้น`,
    'string.max': `กรุณาติกเลือกจากช่องเท่านั้น`,
    'any.only' : 'กรุณาติกเลือกจากช่องเท่านั้น'
})

var bus = Joi.string().allow(null).valid('1', '0').messages({ 
    'string.min': `กรุณาติกเลือกจากช่องเท่านั้น`,
    'string.max': `กรุณาติกเลือกจากช่องเท่านั้น`,
    'any.only' : 'กรุณาติกเลือกจากช่องเท่านั้น',
})

var tran_detail = Joi.string().allow(null).required().max(500).min(10).messages({ 
    'string.empty': `กรุณากรอกรายละเอียดการเดินทาง`,
    'any.required': `กรุณากรอกรายละเอียดการเดินทาง`,
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 500 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var phone = Joi.string().required().max(10).min(9).messages({ 
    'string.empty': `กรุณากรอกเบอร์โทรศัพท์`,
    'any.required': `กรุณากรอกเบอร์โทรศัพท์`,
    'string.min': `กรุณากรอกเบอร์โทรศัพท์ไม่ต่ำกว่า 9 หลัก`,
    'string.max': `กรุณากรอกเบอร์โทรศัพท์ไม่เกิน 10 หลัก`,
    'string.pattern.base': 'กรอกเฉพาะตัวเลขเท่านั้น'
})

var phone_to = Joi.string().allow(null,'').max(5).min(2).pattern(new RegExp('^[0-9]{1,100}$')).messages({ 
    'string.empty': `กรุณากรอกสายต่อเบอร์โทร`,
    'any.required': `กรุณากรอกสายต่อเบอร์โทร`,
    'string.min': `กรุณากรอกสายต่อเบอร์โทรไม่ต่ำกว่า 2 ตัว`,
    'string.max': `กรุณากรอกสายต่อเบอร์โทรไม่เกิน 5 ตัว`,
    'string.pattern.base': 'กรอกเฉพาะตัวเลขเท่านั้น'
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
// var agreement = Joi.array().required().items(Joi.string().valid('1','0')).min(1).max(1).messages({ 
//     'any.required': `กรุณาตกลงเงื่อนไขการใช้งาน`,
//     'array.length' : 'กรุณาเลือกแค่ 1 ตัวเลือก',
//     'array.min' : 'กรุณาเลือกอย่างน้อย 1 ตัวเลือก',
//     'array.max' : 'กรุณาเลือกไม่เกิน 1 ตัวเลือก',
//     'any.only' : 'กรุณาติกเลือกจากช่องเท่านั้น',

// });





module.exports.usersignup = Joi.object().keys({
    username: username,
    password: password,
    repassword: repassword,
    company_name: company_name,
    company_type: company_type,
    contact_name: contact_name,
    address: address,
    province: province,
    amphoe: amphoe,
    tambon: tambon,
    postal: postal,
    phone: phone,
    phone_to: phone_to,
    email: email,
    agreement: agreement
})


module.exports.usersignin = Joi.object().keys({
    username: username,
    password: password,
    remember_me: remember_me
})

module.exports.requestforgotpassword = Joi.object().keys({
    email: email
})

module.exports.resetpassword = Joi.object().keys({
    password: password,
    repassword: repassword,
})



module.exports.editprofile = Joi.object().keys({
    company_name: company_name,
    company_type: company_type,
    contact_name: contact_name,
    company_detail: company_detail,
    company_goal: company_goal,
    benefit: benefit,
    address: address,
    province: province,
    amphoe: amphoe,
    tambon: tambon,
    postal: postal,
    phone: phone,
    phone_to: phone_to,
    bts: bts,
    bus: bus,
    mrt: mrt,
    tran_detail: tran_detail,
    facebook: sociallink,
    ig: sociallink,
    twitter: sociallink,
    line: sociallink,
    website: sociallink
})