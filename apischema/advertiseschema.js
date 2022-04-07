const Joi = require('joi')
var allowallwhitespaceandsomesymbol = "^[\u0E00-\u0E7Fa-zA-Z0-9./-<>]+[\u0E00-\u0E7Fa-zA-Z0-9\.\r\n\-<> ]+[\u0E00-\u0E7Fa-zA-Z0-9.<>]{1,10000}$"

var title = Joi.string().required().max(200).min(10).pattern(new RegExp('^[\u0E00-\u0E7Fa-zA-Z0-9]+[\u0E00-\u0E7Fa-zA-Z0-9._ ]+[\u0E00-\u0E7Fa-zA-Z0-9.]{1,200}$'))
    .messages({ 
        'string.empty': `กรุณากรอกหัวเรื่อง`,
        'any.required': `กรุณากรอกหัวเรื่อง`,
        'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
        'string.max': `ต้องมีตัวอักษรไม่เกิน 200 ตัว`,
        'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var body = Joi.string().required().max(3000).min(100)
    .messages({ 
        'string.empty': `กรุณากรอกเนื้อหาโพสต์`,
        'any.required': `กรุณากรอกเนื้อหาโพสต์`,
        'string.min': `เนื้อหาน้อยเกินไป`,
        'string.max': `เนื้อหาเยอะเกินไป`,
        'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ หรือเว้นช่องว่างก่อนหรือหลังเนื้อหา'
})

var cover = Joi.string().required()
var covernotneed = Joi.string()


module.exports.create = Joi.object().keys({
    title: title,
    body: body,
    cover :covernotneed,
})

module.exports.edit = Joi.object().keys({
    title: title,
    body: body,
    cover :covernotneed,
})