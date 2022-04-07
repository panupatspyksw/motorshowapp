const express = require('express');
const router = express.Router();



var table = {
    headpage: [
        {title:"News",first: true},
        {title:"Photos",first: false},
        {title:"Videos",first: false},
    ],
    gridtype:[
        "grid-1-1",
        "grid-2-2",
        "grid-1-2"
    ],
    path:[
        "/app/highlight/news/",
        "/app/highlight/photos/",
        "/app/highlight/videos/"
    ],
    content:[
        [
            {
                title:"5 มอเตอร์ไซค์ทัวร์ริ่ง 1,000 ซีซี สุดสายท่องเที่ยวผจญภัย",
                image:"/cover/new1.jpg",
                date:"14 ธ.ค. 2565",
                short:"เข้าสู่การขับขี่ท่องเที่ยวระยะไกลพร้อมนวัตกรรมที่เหนือชั้นของมอเตอร์ไซค์แอดเวนเจอร์ทัวร์ริ่งไบค์ระดับ 1,000 ซีซี ที่ถือว่าเป็นคลาสสูงสุดของมอเตอร์ไซค์ประเภทนี้ พร้อมนำเสนอ 5 รุ่น สำหรับนักบิดสายท่องเที่ยวที่กำลังจะอัพเลเวลการขับขี่"
            },
            {
                title:"คอมแพ็กต์ซีดานน่าซื้อในงานบางกอก มอเตอร์โชว์ 2022",
                image:"/cover/new2.jpg",
                date:"13 ธ.ค. 2565",
                short:"จากที่เงียบเหงามาหลายปีคราวนี้งานบางกอก อินเตอร์เนชั่นแนล มอเตอร์โชว์ ครั้งที่ 43 ค่อนข้างคึกคักกับการเปิดตัวของรถยนต์คอมแพ็กต์ซีดานทั้งรุ่นขวัญใจมหาชนไปจนถึงกลุ่มลักชัวรี่"
            },
            {
                title:"สำรวจ B-SUV รุ่นยอดนิยมปี 2022",
                image:"/cover/new3.jpg",
                date:"13 ธ.ค. 2565",
                short:"ในช่วงหลายปีที่ผ่านมารถยนต์ SUV กำลังได้รับความนิยมอย่างสูงจากผู้บริโภคในประเทศไทย ด้วยความอเนกประสงค์ในด้านการใช้งาน และให้ความคล่องตัวในการขับขี่ที่มากกว่ารถยนต์ทั่วไป ทั้งยังเหมาะกับการเดินทางไปเป็นกลุ่มเพื่อนหมู่คณะ และครอบครัว"
            },
            {
                title:"8 รถยนต์ไฟฟ้าน่าใช้ ราคาน่าคบ ในงานมอเตอร์โชว์ ครั้งที่ 43",
                image:"/cover/new4.jpg",
                date:"12 ธ.ค. 2565",
                short:"งานบางกอก อินเตอร์เนชั่นแนล มอเตอร์โชว์ ครั้งที่ 43 เต็มไปด้วยความตื่นเต้นภายใต้มาตรการคัดกรอง covid 19 ที่เข้มงวด เนื่องจากแต่ละแบรนด์นำเสนอรถยนต์รุ่นใหม่ทั้งเครื่องยนต์สันดาปและรถยนต์ไฟฟ้า 100%"
            },{
                title:"คอมแพ็กต์ซีดานน่าซื้อในงานบางกอก มอเตอร์โชว์ 2022",
                image:"/cover/new2.jpg",
                date:"13 ธ.ค. 2565",
                short:"จากที่เงียบเหงามาหลายปีคราวนี้งานบางกอก อินเตอร์เนชั่นแนล มอเตอร์โชว์ ครั้งที่ 43 ค่อนข้างคึกคักกับการเปิดตัวของรถยนต์คอมแพ็กต์ซีดานทั้งรุ่นขวัญใจมหาชนไปจนถึงกลุ่มลักชัวรี่"
            },
            {
                title:"สำรวจ B-SUV รุ่นยอดนิยมปี 2022",
                image:"/cover/new3.jpg",
                date:"13 ธ.ค. 2565",
                short:"ในช่วงหลายปีที่ผ่านมารถยนต์ SUV กำลังได้รับความนิยมอย่างสูงจากผู้บริโภคในประเทศไทย ด้วยความอเนกประสงค์ในด้านการใช้งาน และให้ความคล่องตัวในการขับขี่ที่มากกว่ารถยนต์ทั่วไป ทั้งยังเหมาะกับการเดินทางไปเป็นกลุ่มเพื่อนหมู่คณะ และครอบครัว"
            },
            {
                title:"8 รถยนต์ไฟฟ้าน่าใช้ ราคาน่าคบ ในงานมอเตอร์โชว์ ครั้งที่ 43",
                image:"/cover/new4.jpg",
                date:"12 ธ.ค. 2565",
                short:"งานบางกอก อินเตอร์เนชั่นแนล มอเตอร์โชว์ ครั้งที่ 43 เต็มไปด้วยความตื่นเต้นภายใต้มาตรการคัดกรอง covid 19 ที่เข้มงวด เนื่องจากแต่ละแบรนด์นำเสนอรถยนต์รุ่นใหม่ทั้งเครื่องยนต์สันดาปและรถยนต์ไฟฟ้า 100%"
            },
           
        ],
        [
            {
                title:"AUDI MOTOR EXPO 2022",
                image:"/cover/media1.jpg",
                date:"13 ธ.ค. 2565",
                short:""
            },
            {
                title:"ASTON MARTIN MOTOR EXPO 2022",
                image:"/cover/media2.jpg",
                date:"12 ธ.ค. 2565",
                short:""
            },
            {
                title:"BMW MOTOR EXPO 2022",
                image:"/cover/media3.jpg",
                date:"12 ธ.ค. 2565",
                short:""
            },
            {
                title:"MESERATI MOTOR EXPO 2022",
                image:"/cover/media4.jpg",
                date:"12 ธ.ค. 2565",
                short:""
            },
            {
                title:"ASTON MARTIN MOTOR EXPO 2022",
                image:"/cover/media2.jpg",
                date:"12 ธ.ค. 2565",
                short:""
            },
            {
                title:"BMW MOTOR EXPO 2022",
                image:"/cover/media3.jpg",
                date:"12 ธ.ค. 2565",
                short:""
            },
            {
                title:"MESERATI MOTOR EXPO 2022",
                image:"/cover/media4.jpg",
                date:"12 ธ.ค. 2565",
                short:""
            },
            {
                title:"MESERATI MOTOR EXPO 2022",
                image:"/cover/media4.jpg",
                date:"12 ธ.ค. 2565",
                short:""
            }
        ],
        [
            {
                title:"ขอมอบบรรยากาศสุขสันต์ จากงาน MOTOR EXPO 2021 แทนคำอวยพรให้ท่านมีความสุข ประสบความสำเร็จ ตลอดปี 2565",
                image:"/cover/video1.jpg",
                date:"13 ธ.ค. 2565",
                short:""
            },
            {
                title:"ขอมอบบรรยากาศสุขสันต์ จากงาน MOTOR EXPO 2021 แทนคำอวยพรให้ท่านมีความสุข ประสบความสำเร็จ ตลอดปี 2565",
                image:"/cover/video1.jpg",
                date:"13 ธ.ค. 2565",
                short:""
            },
            {
                title:"ขอมอบบรรยากาศสุขสันต์ จากงาน MOTOR EXPO 2021 แทนคำอวยพรให้ท่านมีความสุข ประสบความสำเร็จ ตลอดปี 2565",
                image:"/cover/video1.jpg",
                date:"13 ธ.ค. 2565",
                short:""
            },{
                title:"ขอมอบบรรยากาศสุขสันต์ จากงาน MOTOR EXPO 2021 แทนคำอวยพรให้ท่านมีความสุข ประสบความสำเร็จ ตลอดปี 2565",
                image:"/cover/video1.jpg",
                date:"13 ธ.ค. 2565",
                short:""
            },
            {
                title:"ขอมอบบรรยากาศสุขสันต์ จากงาน MOTOR EXPO 2021 แทนคำอวยพรให้ท่านมีความสุข ประสบความสำเร็จ ตลอดปี 2565",
                image:"/cover/video1.jpg",
                date:"13 ธ.ค. 2565",
                short:""
            }
        ]
    ]
}

// var table = {
//     headpage: [
//         {title:"News",first: true},
//         {title:"Photos",first: false},
//         {title:"Videos",first: false}
//     ],
//     gridtype:[
//         "grid-1-1",
//         "grid-2-2",
//         "grid-1-2"
//     ],
//     path:[
//         "/app/highlight/news/",
//         "/app/highlight/photos/",
//         "/app/highlight/videos/"
//     ],
//     content:[[],[]]
// }

router.get('/',(req,res)=>{
    res.render("app/gridsliideblog",{title:"Highlights", table})
})


router.get('/news/:index',(req,res)=>{
    res.render("app/new",{title:"Highlights", table})
})
router.get('/photos/:index',(req,res)=>{
    res.render("app/media",{title:"Highlights", table})
})
router.get('/videos/:index',(req,res)=>{
    res.render("app/video",{title:"Highlights", table})
})










module.exports = router;




