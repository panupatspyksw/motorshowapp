const Joi = require('joi')
var allowallwhitespaceandsomesymbol = "^[\u0E00-\u0E7Fa-zA-Z0-9./-]+[\u0E00-\u0E7Fa-zA-Z0-9\.\r\n\- ]+[\u0E00-\u0E7Fa-zA-Z0-9.]{1,2000}$"

const moment = require('moment')
var today = moment().startOf('day') 
console.log(today)
var position = Joi.string().required().max(200).min(3)
    .messages({ 
        'string.empty': `กรุณากรอกตำแหน่ง`,
        'any.required': `กรุณากรอกตำแหน่ง`,
        'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 3 ตัว`,
        'string.max': `ต้องมีตัวอักษรไม่เกิน 200 ตัว`,
        'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var path = Joi.number().min(1).max(16).required().messages({ 
    'any.required': `กรุณาเลือกประเภทงาน`,
    'string.empty': 'กรุณาเลือกประเภทงาน',
    'number.base': 'กรุณาเลือกประเภทงาน',
    'number.min': `กรุณาเลือกประเภทงาน`,
    'number.max': `กรุณาเลือกประเภทงาน`,
})

var type = Joi.number().min(1).max(999).required().messages({ 
    'any.required': `กรุณาเลือกรูปแบบงาน`,
    'string.empty': 'กรุณาเลือกรูปแบบงาน',
    'number.base': 'กรุณาเลือกรูปแบบงาน',
    'number.min': `กรุณาเลือกรูปแบบงาน`,
    'number.max': `กรุณาเลือกรูปแบบงาน`,
})

var amount = Joi.number().min(1).max(999).required().messages({ 
    'any.required': `จำนวนอัตราที่รับ`,
    'string.empty': 'จำนวนอัตราที่รับ',
    'number.base': 'จำนวนอัตราที่รับ',
    'number.min': `จำนวนอัตราที่รับ`,
    'number.max': `จำนวนอัตราที่รับ`,
})


var time_start = Joi.number().min(1).max(999).required().messages({ 
    'any.required': `กรุณาเลือกตัวเลือก`,
    'string.empty': 'กรุณาเลือกตัวเลือก',
    'number.base': 'กรุณาเลือกตัวเลือก',
    'number.min': `กรุณาเลือกตัวเลือก`,
    'number.max': `กรุณาเลือกตัวเลือก`,
})



var time_other = Joi.string().allow(null,'')

var optionneed = Joi.number().min(0).max(9999999).required().messages({ 
    'any.required': `กรุณาเลือกตัวเลือก`,
    'string.empty': 'กรุณาเลือกตัวเลือก',
    'number.base': 'กรุณาเลือกตัวเลือก',
    'number.min': `กรุณาเลือกตัวเลือก`,
    'number.max': `กรุณาเลือกตัวเลือก`,
})
var optionnoneed = Joi.number().min(0).max(9999999).allow(null,'').messages({ 
    'any.required': `กรุณาเลือกตัวเลือก`,
    'string.empty': 'กรุณาเลือกตัวเลือก',
    'number.base': 'กรุณาเลือกตัวเลือก',
    'number.min': `กรุณาเลือกตัวเลือก`,
    'number.max': `กรุณาเลือกตัวเลือก`,
})

var salary = Joi.number().min(1).max(20000).required().messages({ 
    'any.required': `กรุณาเลือกตัวเลือก`,
    'string.empty': 'กรุณาเลือกตัวเลือก',
    'number.base': 'กรุณาเลือกตัวเลือก',
    'number.min': `กรุณาเลือกตัวเลือก`,
    'number.max': `กรุณาเลือกตัวเลือก`,
})


var longtext = Joi.string().min(10).max(5000).required().messages({ 
    'any.required': `กรุณากรอกข้อมูล`,
    'string.empty': `กรุณากรอกข้อมูล`,
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 5000 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัดว่าง'
})

var longtextnoneed = Joi.string().max(5000).allow('',null).messages({ 
    'any.required': `กรุณากรอกข้อมูล`,
    'string.empty': `กรุณากรอกข้อมูล`,
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

var address = Joi.string().required().max(1000).messages({ 
    'any.required': `กรุณากรอกรายระเอียดที่อยู่`,
    'string.empty': `กรุณากรอกรายระเอียดที่อยู่`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 1000 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
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

var tran_detail = Joi.string().allow(null).max(500).messages({ 
    'string.empty': `กรุณากรอกรายละเอียดการเดินทาง`,
    'any.required': `กรุณากรอกรายละเอียดการเดินทาง`,
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 500 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var other_requirment = Joi.string().allow(null).allow('').max(500).messages({ 
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 500 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var on_public_at = Joi.date().min(today).raw().required().messages({ 
    'date.empty': `กรุณากรอกข้อมูลเป็นวันที่`,
    'any.required': `กรุณากรอกข้อมูล`,
    'date.base': `กรุณากรอกข้อมูลเป็นวันที่`,
    'string.pattern.base': 'กรุณากรอกข้อมูล',
    'any.only' : 'กรุณากรอกข้อมูล',
    'date.min': `วันที่เริ่มเผยแพร่ควรเป็นปัจจุบันหรืออนาคต`,


})
var off_public_at = Joi.date().greater(Joi.ref('on_public_at')).raw().required().messages({ 
    'date.empty': `กรุณากรอกข้อมูลเป็นวันที่`,
    'date.base': `กรุณากรอกข้อมูลเป็นวันที่`,
    'any.required': `กรุณากรอกข้อมูล`,
    'date.min': 'กรุณาเลือกวันที่ถัดจากวันเริ่มเผยแพร่',
    'date.greater': 'กรุณาเลือกวันที่ถัดจากวันเริ่มเผยแพร่',
    'any.min': 'กรุณาเลือกวันที่ถัดจากวันเริ่มเผยแพร่',
    'string.pattern.base': 'กรุณากรอกข้อมูล',
    'any.only' : 'กรุณากรอกข้อมูล',

})

var phone = Joi.string().required().max(10).min(9).pattern(new RegExp('^[0-9]{1,100}$')).messages({ 
    'string.empty': `กรุณากรอกเบอร์โทรศัพท์`,
    'any.required': `กรุณากรอกเบอร์โทรศัพท์`,
    'string.min': `กรุณากรอกเบอร์โทรศัพท์ไม่ต่ำกว่า 9 หลัก`,
    'string.max': `กรุณากรอกเบอร์โทรศัพท์ไม่เกิน 10 หลัก`,
    'string.pattern.base': 'กรอกเฉพาะตัวเลขเท่านั้น'
})
var contact_name = Joi.string().required().max(60).messages({ 
    'string.empty': `กรุณากรอกชื่อผู้ติดต่อ`,
    'any.required': `กรุณากรอกชื่อผู้ติดต่อ`,
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 60 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var job_category = Joi.string().required().messages({ 
    'any.required': `กรุณาเลือกหมวดหมู่งาน`,
    'string.empty': `กรุณากรอกเลือกหมวดหมู่งาน`

})

var email = Joi.string().required().email()
    .messages({
        'string.empty':'กรุณากรอกอีเมล',
        'any.required':'กรุณากรอกอีเมล',
        'string.email':'กรุณากรอกเป็นรูปแบบอีเมล'
    })

module.exports.createjoppost = Joi.object().keys({
    path: path,
    position: position,
    type :optionneed,
    amount: optionneed,
    time_start: optionneed,
    time_end: optionneed,
    time_other: longtextnoneed,
    salary_start: optionneed,
    salary_end: optionneed,
    detail: longtext,
    address: address,
    province: province,
    amphoe: amphoe,
    tambon: tambon,
    bts: bts,
    mrt: mrt,
    bus: bus,
    tran_detail: longtextnoneed,
    gender_male: optionnoneed,
    gender_female: optionnoneed,
    gender_none: optionnoneed,
    age_start: optionneed,
    age_end: optionneed,
    // age_all: optionnoneed,
    // age_upto: optionnoneed,
    edu_start: optionneed,
    edu_end: optionneed,
    edu_all: optionnoneed,
    other_requirment: other_requirment,
    expyear_start: optionneed,
    expyear_end: optionneed,
    contact_name: contact_name,
    contact_phone: phone,
    contact_email: email,
    contact_other: longtextnoneed,
    accept_with_service: optionnoneed,
    accept_with_walkin: optionnoneed,
    accept_detail: longtextnoneed,
    job_category: job_category,
    on_public_at: on_public_at,
    off_public_at: off_public_at
})


