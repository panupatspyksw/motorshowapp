const express = require('express');
const router = express.Router();
const {carbrand} = require('../helpers/brandcar')
const { carmodel } = require('../helpers/modelcar');


var brandtype = [
    {
        image:"",
        title:"ALL"
    },
    {
        image:"",
        title:"CARS"
    },
    {
        image:"",
        title:"MOTORCYCLES"
    },
    {
        image:"",
        title:"CAR STEREO"
    },
    {
        image:"",
        title:"CAR ACCESSORIES"
    },
    {
        image:"",
        title:"SPONSORS"
    }
]


var boothcar = [
{
    image:"/carbrandlogo/aston-202943.svg",
    name:"aston martin",
    boothno: "A2"
},
{
    image:"/carbrandlogo/acura-202938.svg",
    name:"acura",
    boothno:"A3"
},
{
    name:"porsche",
    image:"/map/porsche.jpg",
    boothno: "A15"
},
{
    name:"subaru",
    image:"/map/subaru.jpg",
    boothno: "A16"
},
{
    name:"lamina films digital",
    image:"/map/lamina.jpg",
    boothno: "B2"
},
{
    name:"kia",
    image:"/map/kia.svg",
    boothno: "B1"
},
{
    name:"hyundai",
    image:"/map/hyundai.svg",
    boothno: "A5"
}
]


router.get('/',(req,res)=>{
    res.render("app/selectbrandorstyle",{title:"Exhibitors category",path:"/app/booth/category/",table: brandtype})
})
router.get('/category/:type',(req,res)=>{
    res.render("app/selectbooth",{title:"Exhibitors",path:"/app/booth/d/",table:boothcar})
})

router.get('/d/:id',(req,res)=>{
    res.render("app/boothdetail",{title:"Exhibitors",path:"/app/booth/d/",products: carmodel.astonmartin})

    // res.render("app/selectbooth",{title:"Exhibitors",path:"/app/booth/d/"})
})










module.exports = router;




