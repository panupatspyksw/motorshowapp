const express = require('express');
const router = express.Router();

// const tokenvalidation = require('../../middleware/tokenvalidation')
// const joischemavalidation = require('../../middleware/joischemavalidation')


router.use("/buyerguide", require('../routes/buyerguiderouter'))
router.use("/booth", require('../routes/boothrouter'))
router.use("/highlight", require('../routes/highlightrouter'))
router.use("/activity", require('../routes/activityrouter'))
router.use("/promotion", require('../routes/promotionrouter'))
router.use("/brochure", require('../routes/brochurerouter'))
router.use("/mytickets", require('../routes/ticketrouter'))

router.get("/arvisualization",(req,res)=>{
res.render("app/armenu",{title:"AR VISUALIZATION"})
})

router.get("/arvisualization/car",(req,res)=>{
res.render("app/arvisualization",{title:"AR VISUALIZATION | CAR"})
})

router.get("/arvisualization/booth",(req,res)=>{
res.render("app/arvisualization2",{title:"AR VISUALIZATION | BOOTH"})
})

router.get("/mapnavigation",(req,res)=>{
res.render("app/mapnavigation",{title:"map navigation"})
})


router.get("/mapnavigation/location/:index",(req,res)=>{
res.render("app/mapnavigation",{title:"map navigation",olddata:"HYUNDAI"})
})

router.get('/home',(req,res)=>{
    res.render("app/home")
})

router.get('/favorites',(req,res)=>{
    res.render("app/favouritescategory",{title:"Favorites Category"})
})
router.get('/favorites/list',(req,res)=>{
    res.render("app/favourites",{title:"Favorites"})
})



router.get('/',(req,res)=>{
    res.render("app/home")
})


router.get('/login',(req,res)=>{
    res.render("app/login")
})
router.get('/signup',(req,res)=>{
    res.render("app/signup")
})

router.get('/logout',(req,res)=>{
    res.redirect("/app/login")
})







module.exports = router;




