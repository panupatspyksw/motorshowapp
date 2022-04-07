const Joi = require('joi');
// .pattern(new RegExp('^https://storage\.googleapis\.com/storagejms/([0-9a-zA-Z]+)\.[a-zA-Z]+$'))
var post = {}
    post.id = Joi.string().required().max(100),
    post.cover =  Joi.string().required().max(200).min(30).messages({ 
        'string.empty': `กรุณาเลือกรูปภาพหน้าปกโพสต์`,
        'any.required': `กรุณาเลือกรูปภาพหน้าปกโพสต์`,
        'string.min': `ต้องมีตัวอักษรความยาวไม่ต่ำกว่า 30 ตัว`,
        'string.max': `ต้องมีตัวอักษรความยาวไม่เกิน 50 ตัว`,
        'string.pattern.base': 'กรุณาเลือกรูปภาพจาก media library เท่านั้น'
    }),
    post.title = Joi.string().required().max(100).min(10).messages({ 
        'string.empty': `กรุณากรอกหัวเรื่องโพสต์`,
        'any.required': `กรุณากรอกหัวเรื่องโพสต์`,
        'string.min': `ต้องมีตัวอักษรความยาวไม่ต่ำกว่า 10 ตัว`,
        'string.max': `ต้องมีตัวอักษรความยาวไม่เกิน 100 ตัว`,
        'string.pattern.base': 'กรูณากรอกเป็นตัวเลขและตัวอักษรภาษาอังกฤษเท่านั้น'
    }),
    post.category = Joi.string().required().max(100).min(1).messages({ 
        'string.empty': `กรุณาเลือก catagory ของโพสต์`,
        'any.required': `กรุณาเลือก catagory ของโพสต์`,
        'string.min': `ต้องมีตัวอักษรความยาวไม่ต่ำกว่า 1 ตัว`,
        'string.max': `ต้องมีตัวอักษรความยาวไม่เกิน 100 ตัว`,
        'string.pattern.base': 'กรูณากรอกเป็นตัวเลขและตัวอักษรภาษาอังกฤษเท่านั้น'
    }),
    post.tags = Joi.array().max(5).allow(null).allow('').message({
        'array.empty': `กรุณาเพิ่ม tags`,
        'array.required': `กรุณาเพิ่ม tags`,
        'any.base': `กรุณาเลือก tags`,
        'array.max': `เพิ่ม tags ได้ไม่เกิน 5 อัน`,
        'array.pattern.base': 'กรุณาใส่แท็กที่เป็นตัวอักษรข้อความหรือตัวเลขเท่านั้น'
    }),
    post.short = Joi.string().required().max(280).min(30).messages({ 
        'string.empty': `กรุณากรอกคำอธิบายโดยย่อของโพสต์`,
        'any.required': `กรุณากรอกคำอธิบายโดยย่อของโพสต์`,
        'string.min': `ต้องมีตัวอักษรความยาวไม่ต่ำกว่า 30 ตัว`,
        'string.max': `ต้องมีตัวอักษรความยาวไม่เกิน 200 ตัว`,
        'string.pattern.base': 'กรูณากรอกเป็นตัวเลขและตัวอักษรภาษาอังกฤษเท่านั้น'
    }),
    post.detail = Joi.string().required().max(10000).min(30).messages({ 
        'string.empty': `กรุณาใส่เนื้อหาของโพสต์`,
        'any.required': `กรุณาใส่เนื้อหาของโพสต์`,
        'string.min': `ต้องมีตัวอักษรความยาวไม่ต่ำกว่า 30 ตัว`,
        'string.max': `ต้องมีตัวอักษรความยาวไม่เกิน 10000 ตัว`,
        'string.pattern.base': 'กรูณากรอกเป็นตัวเลขและตัวอักษรภาษาอังกฤษเท่านั้น'
    })
    post.visible = Joi.string().min(5).max(7).required().valid('private','public').messages({ 
        'any.required': `กรุณาเลือก visibility`,
        'any.invalid': `กรุณาเลือกเฉพาะ public กับ private เท่านั้น`,
        'string.min': `กรุณาเลือกเฉพาะ public กับ private เท่านั้น`,
        'string.max': `กรุณาเลือกเฉพาะ public กับ private เท่านั้น`,
        'any.only' : `กรุณาเลือกเฉพาะ public กับ private เท่านั้น`
    })

module.exports = post