const express = require('express');
const { carbrand, motorcyclebrand } = require('../helpers/brandcar');
const { carmodel } = require('../helpers/modelcar');
const router = express.Router();

// const tokenvalidation = require('../../middleware/tokenvalidation')
// const joischemavalidation = require('../../middleware/joischemavalidation')

var cartype = [
    {
        image:"/cartype/cabriolet.svg",
        title:"cabriolet"
    },
    {
        image:"/cartype/coupe.svg",
        title:"coupe"
    },
    {
        image:"/cartype/hatchback.svg",
        title:"hatchback"
    },
    {
        image:"/cartype/micro.svg",
        title:"micro"
    },
    {
        image:"/cartype/sedan.svg",
        title:"sedan"
    },
    {
        image:"/cartype/sportcar.svg",
        title:"sportcar"
    },
    {
        image:"/cartype/supercar.svg",
        title:"supercar"
    },
    {
        image:"/cartype/suv.svg",
        title:"suv"
    },
    {
        image:"/cartype/wagon.svg",
        title:"wagon"
    },
   
]

var motorcycletype = [
    {
        image:"/motorcycletype/atv.svg",
        title:"atv"
    },
    {
        image:"/motorcycletype/chopper.svg",
        title:"chopper"
    },
    {
        image:"/motorcycletype/cross.svg",
        title:"cross"
    },
    {
        image:"/motorcycletype/cruiser.svg",
        title:"cruiser"
    },
    {
        image:"/motorcycletype/enduro.svg",
        title:"enduro"
    },
    {
        image:"/motorcycletype/naked.svg",
        title:"naked"
    },
    {
        image:"/motorcycletype/scooter.svg",
        title:"scooter"
    },
    {
        image:"/motorcycletype/sport.svg",
        title:"sport"
    },
    {
        image:"/motorcycletype/street.svg",
        title:"street"
    },
    {
        image:"/motorcycletype/touring.svg",
        title:"touring"
    },
   
]

var cartypewithbrand = {
    bodystyle:"coupe",
    brand:[
        carmodel.astonmartin,
        carmodel.audi,
    ]
}

var motorcycletypewithbrand = {
    bodystyle:"sport",
    brand:[
        carmodel.APRILIA,
        carmodel.BMW,
        carmodel.GPX,
        carmodel.KAWASAKI
    ]
}




router.get('/',(req,res)=>{
    res.render("app/buyerguide",{title:"buyer's guide",products: carmodel.astonmartin})
})
router.get('/car/brand',(req,res)=>{
    res.render("app/selectbrandorstyle",{title:"SELECT BRAND",path:"/app/buyerguide/car/brand/",table: carbrand})
})
router.get('/car/bodystyle',(req,res)=>{
    res.render("app/selectbrandorstyle",{title:"SELECT BODY STYLE",path:"/app/buyerguide/car/bodystyle/",table: cartype})
})
router.get('/motorcycle/brand',(req,res)=>{
    res.render("app/selectbrandorstyle",{title:"SELECT BRAND",path:"/app/buyerguide/motorcycle/brand/",table: motorcyclebrand})
})
router.get('/motorcycle/bodystyle',(req,res)=>{
    res.render("app/selectbrandorstyle",{title:"SELECT BODY STYLE",path:"/app/buyerguide/motorcycle/bodystyle/",table: motorcycletype})
})

router.get('/car/brand/:type',(req,res)=>{
    res.render("app/selectmodelbybrand",{title:"SELECT MODEL",style:"brand",path:"/app/buyerguide/p",table: carmodel.astonmartin})
})
router.get('/car/bodystyle/:type',(req,res)=>{
    res.render("app/selectmodelbybodystyle",{title:"SELECT MODEL",style:"body",path:"/app/buyerguide/p",data:cartypewithbrand})
})
router.get('/motorcycle/brand/:type',(req,res)=>{
    res.render("app/selectmodelbybrand",{title:"SELECT MODEL",style:"brand",path:"/app/buyerguide/mt/p",table: carmodel.GPX})
})
router.get('/motorcycle/bodystyle/:type',(req,res)=>{
    res.render("app/selectmodelbybodystyle",{title:"SELECT MODEL",style:"body",path:"/app/buyerguide/mt/p",data:motorcycletypewithbrand})
})
router.get('/p/:id',(req,res)=>{
    res.render("app/productdetail",{title:"buyer's guide",products: carmodel.astonmartin})
})
router.get('/mt/p/:id',(req,res)=>{
    res.render("app/motorcycledetail",{title:"buyer's guide",products: carmodel.GPX})
})

router.get('/p/:id/gallery',(req,res)=>{
    res.render("app/modelgallery",{title:"Gallery"})
})


router.get('/mt/p/:id/gallery',(req,res)=>{
    res.render("app/mtmodelgallery",{title:"Gallery"})
})






module.exports = router;




