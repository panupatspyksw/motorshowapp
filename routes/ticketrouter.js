const express = require('express');
const router = express.Router();



var table = {
    headpage: false,
    gridtype:"grid-1 grid-md-2 gap-3 p-3",
    path:"/app/promotion/p/",
    content:[]
}

router.get('/',(req,res)=>{
    res.render("app/mytickets",{title:"My tickets", table})
})
router.get('/settingqrcode',(req,res)=>{
    res.render("app/settingqrcode",{title:"Setting Qrcode", table})
})

router.get('/view',(req,res)=>{
    res.render("app/settingqrcode",{title:"View my tickets", table})
})

router.get('/view/t/:id',(req,res)=>{
    res.render("app/viewmyticket",{title:"my ticket", table})
})

router.get('/buymore',(req,res)=>{
    res.render("app/buyticket",{title:"Buy tickets", table})
})
router.get('/buymore/selectticket',(req,res)=>{
    res.render("app/selectticket",{title:"Select ticket", table})
})
router.post('/buymore/process',(req,res)=>{
    res.render("app/ticketprocess",{title:"Buy tickets", table})
})

router.get('/buymore/process',(req,res)=>{
    res.render("app/ticketprocess",{title:"Buy tickets", table})
})









module.exports = router;




