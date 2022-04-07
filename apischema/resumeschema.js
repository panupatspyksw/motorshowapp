const Joi = require('joi')
const moment = require('moment')

var allowallwhitespaceandsomesymbol = "^[\u0E00-\u0E7Fa-zA-Z0-9./-<>]+[\u0E00-\u0E7Fa-zA-Z0-9\.\r\n\-<> ]+[\u0E00-\u0E7Fa-zA-Z0-9.<>]{1,10000}$"
var yearmax = new Date().getFullYear();
var yearmin = yearmax - 70
var minage = moment().subtract(18, "years");
var maxage = moment().subtract(70, "years");
var monthmax = 12;
var monthmin = 1;

// var maxage = startdate.subtract(70, "years");
minage = minage.format("YYYY-MM-DD");
maxage = maxage.format("YYYY-MM-DD");

var name = Joi.string().required().max(100)
    .messages({ 
        'string.base': `กรุณากรอกชื่อนามสกุล`,
        'string.empty': `กรุณากรอกชื่อนามสกุล`,
        'any.required': `กรุณากรอกชื่อนามสกุล`,
        'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
        'string.max': `ชื่อนามสกุลไม่สามารถยาวเกิน 100 ตัวอักษร`,
        'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})
var birthday = Joi.date().min(maxage).max(minage).raw().required().messages({ 
    'date.base': `กรุณากรอกวันเกิด`,
    'date.empty': `กรุณากรอกวันเกิด`,
    'date.max': `ท่านต้องมีอายุ 15 ปีขึ้นไป`,
    'date.min': `ท่านต้องมีอายุไม่เกิน 70 ปี`,
    'any.required': `กรุณากรอกวันเกิด`,
    'string.pattern.base': 'กรุณากรอกข้อมูล',
    'any.only' : 'กรุณากรอกเป็นวันที่เท่านั้น',
})

var body = Joi.string().required().max(3000).min(100)
    .messages({ 
        'string.empty': `กรุณากรอกเนื้อหาโพสต์`,
        'any.required': `กรุณากรอกเนื้อหาโพสต์`,
        'string.min': `เนื้อหาน้อยเกินไป`,
        'string.max': `เนื้อหาเยอะเกินไป`,
        'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ หรือเว้นช่องว่างก่อนหรือหลังเนื้อหา'
})
var weightandheight = Joi.number().max(999).required().messages({ 
    'any.required': `กรุณากรอกข้อมูล`,
    'string.empty': 'กรุณากรอกข้อมูล',
    'number.base': 'กรุณากรอกข้อมูลเป็นตัวเลข',
    'number.max': `กรุณากรอกตัวเลขไม่เกิน 3 หลัก`,
})
var numberneed = Joi.number().min(1).max(999).required().messages({ 
    'any.required': `กรุณากรอกข้อมูล`,
    'string.empty': 'กรุณากรอกข้อมูล',
    'number.base': 'กรุณาเลือกตัวเลือก',
    'number.min': `กรุณาเลือกตัวเลือก`,
    'number.max': `กรุณาเลือกตัวเลือก`,
})
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
var gender = Joi.number().required().max(2).min(1).messages({ 
    'any.required': `กรุณาเลือกตัวเลือก`,
    'number.base': 'กรุณาเลือกตัวเลือก',
    'number.min': `กรุณาเลือกตัวเลือก`,
    'number.max': `กรุณาเลือกตัวเลือก`,
})
var stanapaab = Joi.number().min(1).max(10).required().messages({ 
    'any.required': `กรุณาเลือกตัวเลือก`,
    'string.empty': 'กรุณาเลือกตัวเลือก',
    'number.base': 'กรุณาเลือกตัวเลือก',
    'number.min': `กรุณาเลือกตัวเลือก`,
    'number.max': `กรุณาเลือกตัวเลือก`,
})






var longtextneed = Joi.string().min(100).max(2000).required().messages({ 
    'any.required': `กรุณากรอกข้อมูล`,
    'string.empty': `กรุณากรอกข้อมูล`,
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 100 ตัว`,
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

var province1 = Joi.number().min(1).max(77).required().messages({ 
    'any.required': `กรุณาเลือกจังหวัด`,
    'string.empty': 'กรุณาเลือกจังหวัด',
    'number.base': 'กรุณาเลือกจังหวัด',
    'number.min': `กรุณาเลือกจังหวัดในตัวเลือก`,
    'number.max': `กรุณาเลือกจังหวัดในตัวเลือก`,
})

// var address = Joi.string().required().max(1000).messages({ 
//     'any.required': `กรุณากรอกรายระเอียดที่อยู่`,
//     'string.empty': `กรุณากรอกรายระเอียดที่อยู่`,
//     'string.max': `ต้องมีตัวอักษรไม่เกิน 1000 ตัว`,
//     'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
// })


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

var phone = Joi.string().required().max(10).min(9).pattern(new RegExp('^[0-9]{1,100}$')).messages({ 
    'string.empty': `กรุณากรอกเบอร์โทรศัพท์`,
    'any.required': `กรุณากรอกเบอร์โทรศัพท์`,
    'string.min': `กรุณากรอกเบอร์โทรศัพท์ไม่ต่ำกว่า 9 หลัก`,
    'string.max': `กรุณากรอกเบอร์โทรศัพท์ไม่เกิน 10 หลัก`,
    'string.pattern.base': 'กรอกเฉพาะตัวเลขเท่านั้น'
})

var sociallink = Joi.string().uri().allow(null,'').max(100).messages({ 
    'any.required': `กรุณากรอกเป็นลิงค์เท่านั้น`,
    'string.empty': `กรุณากรอกเป็นลิงค์เท่านั้น`,
    'string.max': `ลิงค์ห้ามยาวเกิน 100 ตัวอักษร`,
    'string.dataUri': 'กรุณากรอกเป็นลิงค์เท่านั้น',
    'string.uri': 'กรุณากรอกเป็นลิงค์เท่านั้น',
    'string.domain': 'กรุณากรอกเป็นลิงค์เท่านั้น'

    // 'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})
var email = Joi.string().required().email()
    .messages({
        'string.empty':'กรุณากรอกอีเมล',
        'any.required':'กรุณากรอกอีเมล',
        'string.email':'กรุณากรอกเป็นรูปแบบอีเมล'
    })

var noexp = Joi.number().max(1).messages({
    'number.base': 'ข้อมูลไม่ถูกต้อง',
    'number.min': `ข้อมูลไม่ถูกต้อง`,
    'number.max': `ข้อมูลไม่ถูกต้อง`,
})

var company_name = Joi.string().required().max(100).min(5)
    .messages({ 
        'string.empty': `กรุณากรอกชื่อบริษัท`,
        'any.required': `กรุณากรอกชื่อบริษัท`,
        'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 5 ตัว`,
        'string.max': `ต้องมีตัวอักษรไม่เกิน 100 ตัว`,
        'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var position = Joi.string().required().max(200)
    .messages({ 
        'string.empty': `กรุณากรอกตำแหน่ง`,
        'any.required': `กรุณากรอกตำแหน่ง`,
        'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
        'string.max': `ต้องมีตัวอักษรไม่เกิน 200 ตัว`,
        'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var year_start = Joi.number().max(yearmax).min(yearmin).required().messages({ 
    'number.empty': `กรุณากรอกปีที่เริ่มทำงาน`,
    'any.required': `กรุณากรอกปีที่เริ่มทำงาน`,
    'number.base': 'กรุณากรอกเป็นตัวเลข',
    'number.min': `กรุณากรอกปีที่เริ่มทำงานไม่ต่ำกว่า 70 ปีที่แล้ว`,
    'number.max': `กรุณากรอกปีที่เริ่มทำงานที่เป็นปัจจุบัน`,
    'number.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var year_end = Joi.number().max(yearmax).min(Joi.ref('year_start')).required().messages({ 
    'number.empty': `กรุณากรอกปีที่ทำงานถึง`,
    'any.required': `กรุณากรอกปีที่ทำงานถึง`,
    'number.base': 'กรุณากรอกเป็นตัวเลข',
    'number.min': `กรุณากรอกปีที่ทำงานถึงไม่ต่ำกว่าปีที่เริ่มทำงาน`,
    'number.max': `กรุณากรอกปีที่ทำงานถึงที่เป็นปัจจุบัน`,
    'number.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})
var salary_realvalue = Joi.number().min(1000).max(999999).required().messages({ 
    'any.required': `กรุณากรอกเงินเดือน`,
    'number.empty': 'กรุณากรอกเงินเดือน',
    'number.base': 'กรุณากรอกเป็นตัวเลข',
    'number.min': `กรุณากรอกเงินเดือนไม่ต่ำกว่า 4 หลัก`,
    'number.max': `กรุณากรอกเงินเดือนไม่เกิน 6 หลัก`,
})

var address = Joi.string().required().min(10).max(250).messages({ 
    'any.required': `กรุณากรอกรายระเอียดที่อยู่`,
    'string.empty': `กรุณากรอกรายระเอียดที่อยู่`,
    'string.min': `ต้องมีตัวอักษรไม่ต่ำกว่า 10 ตัว`,
    'string.max': `ต้องมีตัวอักษรไม่เกิน 500 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})


var month_start = Joi.number().max(monthmax).min(monthmin).required().messages({ 
    'any.required': `กรุณากรอกเดือนที่เริ่มทำงาน`,
    'number.empty': 'กรุณากรอกเดือนที่เริ่มทำงาน',
    'number.base': 'กรุณากรอกเดือนที่เริ่มทำงาน',
    'number.min': `กรุณากรอกเดือนที่เริ่มทำงานให้ถูกต้อง`,
    'number.max': `กรุณากรอกเดือนที่เริ่มทำงานให้ถูกต้อง`,
})
var month_end = Joi.number().min(monthmin).max(monthmax).required()
.when('year_start', { is: Joi.number().equal(Joi.ref('year_end')), then: Joi.number().min(Joi.ref('month_start')) })
.when('year_end', { is: Joi.number().greater(Joi.ref('year_end')), then: Joi.number().min(monthmin) }).messages({ 
    'any.required': `กรุณากรอกเดือนที่ทำงานถึง`,
    'number.empty': 'กรุณากรอกเดือนที่ทำงานถึง',
    'number.base': 'กรุณากรอกเดือนที่ทำงานถึง',
    'number.min': `กรุณากรอกเดือนที่ทำงานถึงให้ถูกต้อง`,
    'number.max': `กรุณากรอกเดือนที่ทำงานถึงให้ถูกต้อง`,
})




// education

 var degree = Joi.string().required().min(5).max(50).messages({ 
    'any.required': `กรุณากรอกระดับวุฒิการศึกษา`,
    'string.empty': `กรุณากรอกระดับวุฒิการศึกษา`,
    'string.min': `ระดับวุฒิการศึกษาความยาวไม่ควรสั้นกว่า 5 ตัวอักษร`,
    'string.max': `ระดับวุฒิการศึกษาความยาวไม่ควรเกิน 50 ตัวอักษร`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})
var institution = Joi.string().required().min(10).max(50).messages({ 
    'any.required': `กรุณากรอกชื่อสถาบัน`,
    'string.empty': `กรุณากรอกชื่อสถาบัน`,
    'string.min': `ชื่อเต็มสถาบันความยาวไม่ควรสั้นกว่า 10 ตัวอักษร`,
    'string.max': `ชื่อเต็มสถาบันความยาวไม่ควรเกิน 50 ตัวอักษร`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})
var country = Joi.string().required().min(3).max(50).messages({ 
    'any.required': `กรุณากรอกประเทศที่ตั้งของสถาบัน`,
    'string.empty': `กรุณากรอกประเทศที่ตั้งของสถาบัน`,
    'string.min': `ชื่อประเทศที่ตั้งของสถาบันความยาวไม่ควรสั้นกว่า 3 ตัวอักษร`,
    'string.max': `ชื่อประเทศที่ตั้งของสถาบันความยาวไม่ควรเกิน 50 ตัวอักษร`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})
var edu_year = Joi.number().max(yearmax).min(yearmin).required().messages({ 
    'number.empty': `กรุณากรอกปีที่จบการศึกษาหรือกำลังศึกษา`,
    'any.required': `กรุณากรอกปีที่จบการศึกษาหรือกำลังศึกษา`,
    'number.base': 'กรุณากรอกปีที่จบการศึกษาหรือกำลังศึกษา',
    'number.min': `กรุณากรอกปีที่จบการศึกษาหรือกำลังศึกษาไม่ต่ำกว่า 70 ปีที่แล้ว`,
    'number.max': `กรุณากรอกปีที่จบการศึกษาหรือกำลังศึกษาที่เป็นปัจจุบัน`,
    'number.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})
var grade = Joi.number().max(4).min(1).required().messages({ 
    'number.empty': `กรุณากรอกเกรดเฉลี่ย`,
    'any.required': `กรุณากรอกเกรดเฉลี่ย`,
    'number.base': 'กรุณากรอกเกรดเฉลี่ยเป็นตัวเลขเท่านั้น',
    'number.min': `กรุณากรอกเกรดเฉลี่ยไม่ต่ำกว่า 1`,
    'number.max': `กรุณากรอกเกรดเฉลี่ยไม่มากกว่า 4`,
    'number.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})
var province = Joi.string().max(50).min(3).required().messages({ 
    'any.required': `กรุณากรอกจังหวัดที่ตั้งของสถาบัน`,
    'string.empty': `กรุณากรอกจังหวัดที่ตั้งของสถาบัน`,
    'string.min': `ชื่อจังหวัดที่ตั้งของสถาบันความยาวไม่ควรสั้นกว่า 3 ตัวอักษร`,
    'string.max': `ชื่อจังหวัดที่ตั้งของสถาบันความยาวไม่ควรเกิน 50 ตัวอักษร`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})
var faculty = Joi.string().max(50).min(10).required().messages({ 
    'any.required': `กรุณากรอกชื่อคณะ`,
    'string.empty': `กรุณากรอกชื่อคณะ`,
    'string.min': `ชื่อคณะความยาวไม่ควรสั้นกว่า 10 ตัวอักษร`,
    'string.max': `ชื่อคณะความยาวไม่ควรเกิน 50 ตัวอักษร`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})
var branch = Joi.string().max(50).min(10).required().messages({ 
    'any.required': `กรุณากรอกชื่อสาขา`,
    'string.empty': `กรุณากรอกชื่อสาขา`,
    'string.min': `ชื่อสาขาความยาวไม่ควรสั้นกว่า 10 ตัวอักษร`,
    'string.max': `ชื่อสาขาความยาวไม่ควรเกิน 50 ตัวอักษร`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})


var edu = Joi.array()
.items({
   edu_year: edu_year,
   degree: degree,
   institution: institution,
   country: country,
   province: province,
   faculty: faculty,
   branch: branch,
   grade: grade
}).min(1).max(10).required()


var path = Joi.number().min(1).max(16).required().messages({ 
    'any.required': `กรุณาเลือกประเภทงาน`,
    'string.empty': 'กรุณาเลือกประเภทงาน',
    'number.base': 'กรุณาเลือกประเภทงาน',
    'number.min': `กรุณาเลือกประเภทงาน`,
    'number.max': `กรุณาเลือกประเภทงาน`,
})
var detail = Joi.string().min(10).max(250).required().messages({ 
    'any.required': `กรุณากรอกรายละเอียดลักษณะงาน`,
    'string.empty': `กรุณากรอกรายละเอียดลักษณะงาน`,
    'string.min': `รายละเอียดลักษณะงานความยาวไม่ควรสั้นกว่า 10 ตัวอักษร`,
    'string.max': `รายละเอียดลักษณะงานความยาวไม่ควรเกิน 250 ตัว`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัดว่าง'
})
var jn_jobtype = Joi.string().required().max(200).min(5)
    .messages({ 
        'string.empty': `กรุณากรอกรูปแบบงานที่ต้องการ`,
        'any.required': `กรุณากรอกรูปแบบงานที่ต้องการ`,
        'string.min': `รูปแบบงานความยาวไม่ควรต่ำกว่า 5 ตัว`,
        'string.max': `รูปแบบงานความยาวไม่ควรเกิน 200 ตัว`,
        'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})

var jn_place = Joi.string().required().max(100).min(5)
    .messages({ 
        'string.empty': `กรุณากรอกสถานที่ทำงานที่ต้องการ`,
        'any.required': `กรุณากรอกสถานที่ทำงานที่ต้องการ`,
        'string.min': `ความยาวไม่ควรต่ำกว่า 5 ตัว`,
        'string.max': `ความยาวไม่ควรเกิน 100 ตัว`,
        'string.pattern.base': 'กรุณาอย่ากรอกสัญลักษณ์พิเศษ'
})
var start_work = Joi.string().required().max(30).min(5).valid('เริ่มงานได้ทันที','ภายใน 7 วัน','ภายใน 15 วัน','ภายใน 30 วัน','มากกว่า 30 วัน')
.messages({ 
    'string.empty': `กรุณาเลือกตัวเลือก`,
    'any.required': `กรุณาเลือกตัวเลือก`,
    'string.min': `กรุณาเลือกตัวเลือก`,
    'string.max': `กรุณาเลือกตัวเลือก`,
    'string.pattern.base': 'กรุณาเลือกตัวเลือก',
    'any.only' : 'กรุณาเลือกตัวเลือกเท่านั้น',

})

var yesandno = Joi.string().required().max(30).min(5).valid('ได้','ไม่ได้')
.messages({ 
    'string.empty': `กรุณาเลือกตัวเลือก`,
    'any.required': `กรุณาเลือกตัวเลือก`,
    'string.min': `กรุณาเลือกตัวเลือก`,
    'string.max': `กรุณาเลือกตัวเลือก`,
    'string.pattern.base': 'กรุณาเลือกตัวเลือก',
    'any.only' : 'กรุณาเลือกตัวเลือกเท่านั้น',

})



var positionneeds = Joi.array()
.items({
    path: path,
    position: position,
    detail: detail,
}).min(1).max(3).required()

// start skills

var skill = Joi.string().max(50).min(5).required().messages({ 
    'any.required': `กรุณากรอกทักษะ`,
    'string.empty': `กรุณากรอกทักษะ`,
    'string.min': `ชื่อทักษะความยาวไม่ควรสั้นกว่า 5 ตัวอักษร`,
    'string.max': `ชื่อทักษะความยาวไม่ควรเกิน 50 ตัวอักษร`,
    'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})
var level = Joi.string().required().max(20).min(5).valid('ระดับเริ่มต้น','ระดับชำนาญ','ระดับมีประสบการณ์','ระดับผู้เชี่ยวชาญ')
.messages({ 
    'string.empty': `กรุณาเลือกตัวเลือก`,
    'any.required': `กรุณาเลือกตัวเลือก`,
    'string.min': `กรุณาเลือกตัวเลือก`,
    'string.max': `กรุณาเลือกตัวเลือก`,
    'string.pattern.base': 'กรุณาเลือกตัวเลือก',
    'any.only' : 'กรุณาเลือกตัวเลือกเท่านั้น',

})

var language = Joi.string().required().max(20).valid('ไทย','อังกฤษ','เกาหลี','จีน','ญี่ปุ่น','โปรตุเกส','ฝรั่งเศส','เยอรมัน','รัสเซีย','สเปน','อาราบิก')
.messages({ 
    'string.empty': `กรุณาเลือกตัวเลือก`,
    'any.required': `กรุณาเลือกตัวเลือก`,
    'string.min': `กรุณาเลือกตัวเลือก`,
    'string.max': `กรุณาเลือกตัวเลือก`,
    'string.pattern.base': 'กรุณาเลือกตัวเลือก',
    'any.only' : 'กรุณาเลือกตัวเลือกเท่านั้น',
})
var languagelevel = Joi.string().required().max(20).valid('พอใช้','ดี','ดีมาก')
.messages({ 
    'string.empty': `กรุณาเลือกตัวเลือก`,
    'any.required': `กรุณาเลือกตัวเลือก`,
    'string.min': `กรุณาเลือกตัวเลือก`,
    'string.max': `กรุณาเลือกตัวเลือก`,
    'string.pattern.base': 'กรุณาเลือกตัวเลือก',
    'any.only' : 'ข้อมูลไม่ถูกต้อง',
})




var hardskills = Joi.array()
.items({
    skill: skill,
    level: level,
}).min(1).max(10).required()

var softskills = Joi.array()
.items({
    skill: skill,
    level: level,
}).min(1).max(10).required()

var languages = Joi.array()
.items({
    language: language,
    listen: languagelevel,
    speak: languagelevel,
    read: languagelevel,
    write: languagelevel,
}).unique('language').min(1).max(5).required().messages({ 
    'string.empty': `กรุณาเลือกตัวเลือก`,
    'any.required': `กรุณาเลือกตัวเลือก`,
    'array.unique': `กรุณาอย่าเลือกภาษาซ้ำ`,
    'string.max': `กรุณาเลือกตัวเลือก`,
    'string.pattern.base': 'กรุณาเลือกตัวเลือก',
    'any.only' : 'กรุณาเลือกตัวเลือกเท่านั้น',
})

var skillcar1 = Joi.array().items(Joi.string().valid('รถยนต์','รถจักรยานยนต์','อื่นๆ')).unique()
var skillcar2 = Joi.array().items(Joi.string().valid('รถยนต์','รถจักรยานยนต์','รถบรรทุก')).unique()

// course
var nocourse = noexp
var courses = Joi.array()
.items({
    year_start: year_start,
    month_start: month_start,
    year_end: year_end,
    month_end: month_end,
    institution: institution,
    course: Joi.string().min(10).max(80).required()
    .messages({ 
        'string.empty': `กรุณากรอกชื่อหลักสูตร`,
        'any.required': `กรุณากรอกชื่อหลักสูตร`,
        'string.min': `ชื่อหลักสูตรไม่ควรสั้นกว่า 10 ตัวอักษร`,
        'string.max': `ชื่อหลักสูตรไม่ควรยาวกว่า 80 ตัวอักษร`,
        'string.pattern.base': 'ชื่อหลักสูตรไม่ถูกต้อง',
        'any.only' : 'ข้อมูลไม่ถูกต้อง',
    }),
    certificate: Joi.string().min(10).max(80).required()
    .messages({ 
        'string.empty': `กรุณากรอกชื่อใบ:`,
        'any.required': `กรุณากรอกชื่อใบ`,
        'string.min': `ชื่อใบไม่ควรสั้นกว่า 10 ตัวอักษร`,
        'string.max': `ชื่อใบไม่ควรยาวกว่า 80 ตัวอักษร`,
        'string.pattern.base': 'ข้อมูลไม่ถูกต้อง',
        'any.only' : 'ข้อมูลไม่ถูกต้อง',
    }),
    filename: Joi.string().allow('').max(80).pattern(new RegExp('^.*\.(jpg|jpeg|pdf)$'))
    .messages({ 
        'string.empty': `ไฟล์ไม่ถูกต้อง`,
        'any.required': `ไฟล์ไม่ถูกต้อง`,
        'string.min': `ไฟล์ไม่ถูกต้อง`,
        'string.max': `ไฟล์ชื่อยาวเกินไป`,
        'string.pattern.base': 'รองรับแค่ไฟล์ jpg jpeg pdf เท่านั้น',
        'any.only' : 'รองรับแค่ไฟล์ jpg jpeg pdf เท่านั้น',
    })

}).when("nocourse", {
    not: Joi.exist(),
    then: Joi.array().min(1).max(5).required()
 })

var cover = Joi.string().required()
var covernotneed = Joi.string()

module.exports.profileinfo = Joi.object().keys({
    name:name
    ,birthday:birthday
    ,gender:gender
    ,stanapab:stanapaab
    ,height:weightandheight
    ,weight:weightandheight
    ,nationality:numberneed
    ,religion:numberneed
    ,education:numberneed
    ,address:address
    ,province:province1
    ,amphoe:amphoe
    ,tambon:tambon
    ,postal:postal
    ,phone:phone
    ,email:email
    ,facebook:sociallink
    ,line:sociallink
    ,disability:optionneed
})




var workexp = Joi.array()
.items({
    year_start: year_start,
    month_start: month_start,
    year_end: year_end,
    month_end: month_end,
    position: position,
    salary: salary_realvalue,
    company_name: company_name,
    address: address,
    detail: detail
}).when("noexp", {
    not: Joi.exist(),
    then: Joi.array().min(1).max(10).required()
 })

module.exports.workhistorys = Joi.object().keys({
    noexp:noexp,
    workexp: workexp
})

module.exports.educations = Joi.object().keys({
    edu:edu,
})

module.exports.jobneeds = Joi.object().keys({
    positionneeds:positionneeds,
    jn_jobtype:jn_jobtype,
    jn_place:jn_place,
    jn_salary:salary_realvalue,
    start_work:start_work,
    in_bangkok:yesandno,
    oversea:yesandno
})

module.exports.skills = Joi.object().keys({
    hardskills:hardskills,
    softskills:softskills,
    languages:languages,
    vehicle:skillcar1,
    drive_license:skillcar1,
    drive:skillcar2,
})

module.exports.courses = Joi.object().keys({
    nocourse:nocourse,
    courses: courses
})


var filefiles = Joi.string().allow('').max(80).pattern(new RegExp('^.*\.(jpg|jpeg|pdf)$'))
.messages({ 
    'string.empty': `ไฟล์ไม่ถูกต้อง`,
    'any.required': `ไฟล์ไม่ถูกต้อง`,
    'string.min': `ไฟล์ไม่ถูกต้อง`,
    'string.max': `ไฟล์ชื่อยาวเกินไป`,
    'string.pattern.base': 'รองรับแค่ไฟล์ jpg jpeg pdf เท่านั้น',
    'any.only' : 'รองรับแค่ไฟล์ jpg jpeg pdf เท่านั้น',
})


var youtubelink = Joi.string().uri().allow(null,'').max(100).messages({ 
    'any.required': `กรุณากรอกเป็นลิงค์เท่านั้น`,
    'string.empty': `กรุณากรอกเป็นลิงค์เท่านั้น`,
    'string.max': `ลิงค์ห้ามยาวเกิน 100 ตัวอักษร`,
    'string.dataUri': 'กรุณากรอกเป็นลิงค์เท่านั้น',
    'string.uri': 'กรุณากรอกเป็นลิงค์เท่านั้น',
    'string.pattern.base': 'กรุณากรอกเป็นลิงค์เท่านั้น'

    // 'string.pattern.base': 'กรุณาอย่ากรอกอักขระ สัญลักษณ์พิเศษ หรือเว้นบรรทัด '
})

module.exports.files = Joi.object().keys({
    file1: filefiles,
    file2: filefiles,
    file3: filefiles,
    videolink: youtubelink
})