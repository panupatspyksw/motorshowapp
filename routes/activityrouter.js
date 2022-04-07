const express = require('express');
const router = express.Router();



var table = {
    headpage: [
        {title:"InDoor",first: true},
        {title:"OutDoor",first: false},
    ],
    gridtype:[
        "grid-1-1-nobig",
        "grid-1-1-nobig",

    ],
    path:[
        "/app/activity/indoor/p/",
        "/app/activity/outdoor/p/",
    ],
    content:[
        [
            {
                title:"มอเตอร์โชว์ฯ ประกาศรางวัล Lucky Draw แก่ผู้ชมงาน มูลค่ากว่า 2.17 ล้านบาท",
                image:"/cover/activity1.jpg",
                date:"14 ธ.ค. 2565",
                short:"ปิดฉากลงอย่างยิ่งใหญ่ และเต็มไปด้วยความประทับใจ สำหรับงานบางกอก อินเตอร์เนชันแนล มอเตอร์โชว์ ปี 2022 ซึ่งจัดขึ้นระหว่างวันที่ 12 ธันวาคม – 17 ธันวาคม 2565 ท่ามกลางความคึกคักที่สุดในรอบสองปีที่ผ่านมา รวมถึงยังมีการรักษามาตรฐานด้านความปลอดภัยในเรื่องโรคระบาดอย่างเคร่งครัดเช่นเคย"
            },
            {
                title:"สัมผัสโลกความเร็วแบบดิจิตอลที่บู๊ธ GP eRacing",
                image:"/cover/activitycover1.jpg",
                date:"13 ธ.ค. 2565",
                short:"GP eRacing เปิดให้สัมผัสความเร็วในรูปแบบ Digital Motorsport แล้ววันนี้ ที่งาน Bangkok International Motor Show 2022 เมืองทองธานี ตั้งแต่วันที่ 12 ธันวาคม ถึง 17 ธันวาคม"
            },
            {
                title:"Great Wall Motors ประเทศไทย จัดกิจกรรม User Test Drive ในงาน Motor Expo 2022",
                image:"/cover/activitycover2.jpg",
                date:"13 ธ.ค. 2565",
                short:"Great Wall Motors ประเทศไทย จัดกิจกรรม User Test Drive ในงาน Motor Expo 2021 ให้กับผู้ชมงาน และลูกค้าที่สนใจซื้อรถยนต์ของบริษัท โดยปกติงาน Motor Expo 2021 มีผู้เข้าชมงาน และลูกค้าเป็นจำนวนมากอยู่แล้ว โดยเราได้ใช้ลานทะเลสาปเป็นสถานที่จัดกิจกรรมให้กับลูกค้าในครั้งนี้ "
            },
            {
                title:"Motor Expo 2022 จัดกิจกรรม Spirit of the 4x4 Driving School",
                image:"/cover/activitycover3.jpg",
                date:"12 ธ.ค. 2565",
                short:"Motor Expo 2021 จัดกิจกรรม Spirit of the 4x4 Driving School ร่วมกับบริษัทผู้ผลิตรถยนต์ รุ่นขับเคลื่อน 4 ล้อ เช่น Ford, Mitsubishi, MG, Nissan, Subaru ร่วมถาม/ตอบกับผู้บริหารบริษัทผู้ผลิตรถยนต์ รุ่นขับเคลื่อน 4 ล้อ และครูปุ้ม พร้อมครูฝึกสอนมากประสบการณ์จาก Spirit of the 4x4 Driving School รวมถึงข้อมูลเกี่ยวกับรถยนต์ทั้งด้านสมรรถนะ การดูแลรักษา การใช้งานอย่างถูกต้อง เพื่อเรียนรู้ด้านประสิทธิภาพสูงสุดให้แก่ผู้เริ่มต้นที่ใช้รถยนต์ประเภทนี้"
            },
           
        ],
        [
            {
                title:"Jimny Owner Thailand , 106 Never Die และ Flexdream Japan Style",
                image:"/cover/activity2.jpg",
                date:"13 ธ.ค. 2565",
                short:"กองทัพ Jimny Owner Thailand , 106 Never Die และ Flexdream Japan Style รวมกว่า 50 คัน ในกิจกรรม Jimny Owner Thailand & Flexdream Japan Style Club Meet ที่จะจัดที่งาน อินเตอร์เนชั่นแนล มอเตอร์โชว์ 2022 "
            },
            {
                title:"Motor Expo 2022 ลานทดลองขับ",
                image:"/cover/activitycover4.jpg",
                date:"12 ธ.ค. 2565",
                short:"เปิดพื้นที่ทดลองขับรถรุ่นที่ผู้ชมสนใจ โดยมีมาตรการคุมเข้มพิเศษเพื่อความปลอดภัย บริเวณด้านหลังชาลเลนเจอร์"
            },
            {
                title:"Motor Expo 2022 Spirit of the 4x4 Driving School",
                image:"/cover/activitycover5.jpg",
                date:"12 ธ.ค. 2565",
                short:"Motor Expo จัดกิจกรรมเปิดโรงเรียนพัฒนาทักษะการขับขี่รถขับเคลื่อน 4 ล้อ นำทีมครูฝึกมากประสบการณ์ ร่วมพูดคุยกับผู้สนใจรถขับเคลื่อน 4 ล้อ พร้อมแนะนำหลักสูตรสำหรับรถขับเคลื่อน 4 ล้อ ขั้นพื้นฐาน Part Time และหลักสูตรใหม่ Spirit Plus แบบ Full Time "
            }
        ]
    ]
}

var data1 = "asdasdsad"
var data2 = "asdasdas"
router.get('/',(req,res)=>{
    res.render("app/gridsliideblog",{title:"Activities", table})
})
router.get('/indoor/p/:index',(req,res)=>{
    res.render("app/indoor",{title:"Indoor Activitie", data: data1})
})
router.get('/outdoor/p/:index',(req,res)=>{
    res.render("app/outdoor",{title:"Outdoor Activities", data: data2})
})











module.exports = router;




