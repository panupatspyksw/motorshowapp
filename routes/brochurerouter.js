const express = require('express');
const router = express.Router();
const {carbrand} = require('../helpers/brandcar')

// const tokenvalidation = require('../../middleware/tokenvalidation')
// const joischemavalidation = require('../../middleware/joischemavalidation')


const { carmodel } = require('../helpers/modelcar');


var table = {
    headpage: false,
    gridtype:"grid-2 gap-3 p-3",
    path:"/app/promotion/p/",
    content:[
        {
            cover: "/cover/kiapromotion.jpg",
            title: "เกีย คาร์นิวัล ใหม่ พร้อมข้อเสนอพิเศษสำหรับลูกค้าที่จองภายในงาน",
            date: "13 ธ.ค. 65",
            short: "อัตราดอกเบี้ยพิเศษ 1.99% สำหรับการจัดไฟแนนซ์ผ่านลีสซิ่งกสิกรไทย รับสิทธิ์ผ่อนชำระเงินดาวน์ 0% นานสูงสุด 6 เดือน ผ่านบัตรเครดิตกสิกรไทย การประกันคุณภาพนาน 5 ปี หรือ 150,000 กม. บริการช่วยเหลือฉุกเฉินบนท้องถนนตลอด 24 ชม. นาน 5 ปี"
        },
        {
            cover: "/cover/toyotapromotion.jpg",
            title: "โคโรลล่า อัลติส รุ่นไฮบริด รุ่น GR Sport และรุ่น 1.8 ใหม่ (ปี 65)",
            date: "13 ธ.ค. 65",
            short: "ดอกเบี้ยพิเศษ 1.35% พร้อมประกันภัยชั้นหนึ่ง TOYOTA Care ทางเลือกที่ 2 ดอกเบี้ยพิเศษ ต่ำสุด 0.85% โคโรลล่า ครอส รุ่นปรับปรุงโฉมใหม่ (เครื่องยนต์ไฮบริด, รุ่น HEV GR Sport) ข้อเสนอพิเศษ อัตราดอกเบี้ย 1.69 %"
        },
        {
            cover: "/cover/hyundaipromotion.jpg",
            title: "ฮุนได ออกตัวรถใหม่ พร้อมจัดเต็มสฺทธิพิเศษสำหรับลูกค้าที่จองภายในงาน",
            date: "13 ธ.ค. 65",
            short: "ฮุนได เครต้า ใหม่ ดาวน์เริ่มต้น 10 เปอร์เซ็นต์ ผ่อนนานสูงสุด 84 เดือน, ประกันภัยชั้นหนึ่งนาน 1 ปี รับประกันคุณภาพ 5 ปีหรือ 150,000 กิโลเมตร บริการช่วยเหลือฉุกเฉินนาน 5 ปี และฟรีค่าบำรุงรักษานาน 5 ปีฮุนได สตาร์เรีย พรีเมียม ดาวน์เริ่มต้น 10 เปอร์เซ็นต์ ผ่อนนานสูงสุด 84 เดือน, ประกันภัยชั้นหนึ่งนาน 1 ปี รับประกันคุณภาพ 5 ปีหรือ 150,000 กิโลเมตร บริการช่วยเหลือฉุกเฉินนาน 5 ปีฮุนได สตาร์เรีย ทุกรุ่นดาวน์เริ่มต้น 10 เปอร์เซ็นต์ ผ่อนนานสูงสุด 84 เดือน, ประกันภัยชั้นหนึ่ง"
        },
        {
            cover: "/cover/mgpromotion.jpg",
            title: "ข้อเสนอพิเศษสำหรับลูกค้าที่จองและรับรถยนต์ NEW MG HS และ NEW MG HS PHEV โฉมใหม่",
            date: "13 ธ.ค. 65",
            short: "ภายในวันที่ 21 มีนาคม - วันที่ 3 เมษายนนี้เท่านั้น NEW MG HS ดาวน์เริ่มต้นที่ 5% หรือดอกเบี้ยพิเศษ 0.90 % นาน 4 ปี ฟรี ประกันภัยชั้น 1 พร้อม พ.ร.บ. ความคุ้มครอง 1 ปี ประกันคุณภาพรถยนต์นาน 5 ปี หรือ 150,000 กม."
        },
        {
            cover: "/cover/susukipromotion.jpg",
            title: "ซูซูกิจัดแคมเปญพิเศษ  “SUZUKI SUPER SURPRISE DEAL” มอบให้แก่ลูกค้าที่จองและรับรถยนต์ซูซูกิทุกท่าน",
            date: "13 ธ.ค. 65",
            short: "ในงานบางกอกอินเตอร์เนชั่นแนล มอเตอร์โชว์ ครั้งนี้ ซูซูกิได้จัดแคมเปญพิเศษ  “SUZUKI SUPER SURPRISE DEAL” มอบให้แก่ลูกค้าที่จองและรับรถยนต์ซูซูกิทุกท่าน โดยสามารถเลือกรับข้อเสนอพิเศษได้มากมาย อาทิ จอง SUZUKI SWIFT ขับฟรี 120 วัน หรือโปรแกรมช่วยผ่อนค่างวดรถ 10 เดือน เดือนละ 4,000 บาท รับบัตรเติมน้ำมัน มูลค่า 3,000 บาท"
        },
        {
            cover: "/cover/isuzupromotion.jpg",
            title: "ISUZU โปรจัดใหญ่ ให้เต็มแมคซ์ ผ่อนขั้นต่ำในอัตราเริ่มต้นเพียง 4,000 บาท/เดือน",
            date: "13 ธ.ค. 65",
            short: "โปรโมชั่นชุดใหญ่ให้ผู้ที่สนใจเลือกซื้อรถสามารถเลือกสรรให้เหมาะได้ตามความต้องการ อาทิ “โปรจัดใหญ่ ให้เต็มแมคซ์” และ “โปรแรงทะลุไมค์” ที่เลือกผ่อนขั้นต่ำในอัตราเริ่มต้นเพียง 4,000 บาท/เดือน* (ในรุ่นรถและรายละเอียดที่บริษัทฯ กำหนด) หรือทดลองขับฟรี 90 วัน"
        }
    ]
}

router.get('/brand/:brand',(req,res)=>{
    res.render("app/selectmodelbybrand",{title:"brochures", path:"/app/brochure/p", table: carmodel.astonmartin})
})

router.get('/',(req,res)=>{
    res.render("app/selectbrandorstyle",{title:"SELECT BRAND",path:"/app/brochure/brand/",table: carbrand})
})

router.get('/p/:id',(req,res)=>{
    // res.render("app/brochure")
    res.redirect("http://www.autoinfo.co.th/ipad/pdf/20211116_A6_Avant_WebBrochure_Mar2020.pdf")

})

// router.get('/car/bodystyle',(req,res)=>{
//     res.render("app/selectbrandorstyle",{title:"SELECT BODY STYLE",path:"/app/buyerguide/car/bodystyle/"})
// })
// router.get('/motorcycle/brand',(req,res)=>{
//     res.render("app/selectbrandorstyle",{title:"SELECT BRAND",path:"/app/buyerguide/motorcycle/brand/"})
// })
// router.get('/motorcycle/bodystyle',(req,res)=>{
//     res.render("app/selectbrandorstyle",{title:"SELECT BODY STYLE",path:"/app/buyerguide/motorcycle/bodystyle/"})
// })

// router.get('/car/brand/:type',(req,res)=>{
//     res.render("app/selectmodelbybrand",{title:"SELECT MODEL",style:"brand"})
// })
// router.get('/car/bodystyle/:type',(req,res)=>{
//     res.render("app/selectmodelbybodystyle",{title:"SELECT MODEL",style:"body"})
// })
// router.get('/motorcycle/brand/:type',(req,res)=>{
//     res.render("app/selectmodelbybrand",{title:"SELECT MODEL",style:"brand"})
// })
// router.get('/motorcycle/bodystyle/:type',(req,res)=>{
//     res.render("app/selectmodelbybodystyle",{title:"SELECT MODEL",style:"body"})
// })
// router.get('/p/:id',(req,res)=>{
//     res.render("app/productdetail",{title:"buyer's guide"})
// })

// router.get('/p/:id/gallery',(req,res)=>{
//     res.render("app/modelgallery",{title:"Gallery"})
// })









module.exports = router;



