var pick = true
var picklocation = ''
var pickmapid = false
$(".selection").children().map((index,element)=>{
    $(element).on("click",()=>{
        var bname = $(element).find("[boothname]").html().toUpperCase()
        $("[mapselection]").find("[locationpicker]").val(bname)
        $("[mapselection]").find("[locationlist]").addClass("d-none")
        $("[mapselection]").find("[show]").removeClass("d-none")
        $("[mapselection]").find("[back]").addClass("d-none")

        pick = true


        if(picklocation != bname){
            picklocation = bname;
            var id = $(element).find("[boothname]").attr("id")
            loadmap(id)
            $("[mapselection]").find("[locationpicker]").trigger("change");
        }
    })
})

$("[clearselect]").on("click",()=>{
    $("[mapselection]").find("[locationpicker]").val('')
    $("[mapselection]").find("[locationpicker]").trigger("change");
    picklocation = ''
})

$("[mapselection]").find("[back]").on("click",()=>{
    $("[mapselection]").find("[locationlist]").addClass("d-none")
    $("[mapselection]").find("[show]").removeClass("d-none")
    $("[mapselection]").find("[back]").addClass("d-none")
    pick = true
})

$("[mapselection]").find("[locationpicker]").on("click",()=>{
    if(pick){
        $("[mapselection]").find("[locationlist]").removeClass("d-none")
        $("[mapselection]").find("[show]").addClass("d-none")
        $("[mapselection]").find("[back]").removeClass("d-none")
        pick = false
    }
})
$("[mapselection]").find("[locationpicker]").on("change",(event)=>{
    $("#maparcontainer").addClass("pe-none")
    $("#maparcontainer").css("opacity","0")
    $("[startarmap]").removeClass("active")
    if($(event.target).val()){
        $("[mapselection]").find("[clearselect]").removeClass('d-none')
        $("[startnavigation]").removeClass("d-none")
    }else{
        $("[mapselection]").find("[clearselect]").addClass('d-none')
        resetmap()
    }
})



function resetmap(){
    $("#spots circle").css("opacity","0")
    $("#redmark g").css("opacity","0")
    $("[startpathfinding]").removeClass("active")
    $("[startnavigation]").addClass("d-none")
    maparclose()
}

function loadmap(id){
    $("#spots circle").css("opacity","0")
    $("[startpathfinding]").removeClass("active")
    $("#redmark g").css("opacity","0")
    $("#redmark").find("#"+id).css("opacity","1")
    pickmapid = id

}
var path = {
    b1_a15: ["c9","c10"],
    b2_a16: ["c8"],
    ra: ["d1","d2","d3","d4","d5"],
    gate1: ["c8","c7","c6","b1","b2","b3","b4","b5"],
    a13_a14: ["c9","c10","c11","c12","c13"]

}

function pathfinding2d(){
    var id = pickmapid;
    var tl = gsap.timeline()
    path[id].map((e,index)=>{
        if(index > 0){
            tl.to("#spots circle#"+e,{opacity: 1,duration:.4},"-=.3")
        }else{
            tl.to("#spots circle#"+e,{opacity: 1,duration:.4})
        }
    })
}


$("[startpathfinding]").on("click",(event)=>{
    if($(event.target).hasClass("active")){
        $("#spots circle").css("opacity","0")
        $("[startpathfinding]").removeClass("active")

    }else{
        if(pickmapid){
            $("#maparcontainer").addClass("pe-none")
            $("#maparcontainer").css("opacity","0")
            $("[startarmap]").removeClass("active")
            $("#spots circle").css("opacity","0")
            $(event.target).addClass("active")
            pathfinding2d()
        }
    }
})

$("[startarmap]").on("click",(event)=>{
    if($("#maparcontainer").hasClass("pe-none")){
        maparopen()
    }else{
        maparclose()

    }


})

$("#spots circle").css("opacity","0")
$("#redmark g").css("opacity","0")


;


var centermap = ($("#map2d div").width() - $("#map2d").width())/2
$("#map2d").scrollLeft(centermap)
$("#map2d").scrollTop(centermap)

$("[snaptomylocation]").on("click",()=>{
    var centermap = ($("#map2d div").width() - $("#map2d").width())/2
    $("#map2d").scrollLeft(centermap)
    $("#map2d").scrollTop(centermap)


})


function maparopen(){
    $("#maparcontainer").removeClass("d-none")
    $("#maparcontainer").removeClass("pe-none")
    $("#maparcontainer").css("opacity","1")
    $("[startpathfinding]").removeClass("active")
    $("[startarmap]").addClass("active")
    $("[snaptomylocation]").addClass("d-none")
}
function maparclose(){
    $("#maparcontainer").addClass("d-none")
    $("#maparcontainer").addClass("pe-none")
    $("#maparcontainer").css("opacity","0")
    $("[startarmap]").removeClass("active")
    $("#spots circle").css("opacity","0")
    $("[snaptomylocation]").removeClass("d-none")

}
// $("#mapsvg").hide


import * as THREE from './build/three.module.js';
import { GUI } from '../dat.gui/build/dat.gui.module.js'
import Stats from './examples/jsm/libs/stats.module.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from './examples/jsm/loaders/RGBELoader.js';
import { CSS3DRenderer, CSS3DObject } from './examples/jsm/renderers/CSS3DRenderer.js';


var camera,renderer,scene,controls,container,vw,vh,renderer2
// const gui = new GUI()

var spots = []
var spotsxray = []


function init(){

    // scene setting
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.environment = new RGBELoader().load( '/js/modelassets/bg.hdr' );
    scene.environment.mapping = THREE.EquirectangularReflectionMapping;

    // render setting
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( vw, vh );

    // camera setting
    camera = new THREE.PerspectiveCamera( 40, vw / vh, 1, 1100 );
    // camera.position.z = 400;
    // camera.position.set(-0.040968,0.114963,0.992524)
    camera.position.set(-0.997974,0.041018,0.048618)


    guigenerate(camera,"camera")

    // setting controls
    controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 0;
    controls.maxDistance = 400;
    controls.minPolarAngle = Math.PI/3;
    // controls.maxPolarAngle = Math.PI/2.3;

    controls.enablePan = false;
    // controls.enableZoom = false;
    $("#webgl").append(renderer.domElement)
    window.addEventListener( 'resize', onWindowResize );

}


function loadpointlight(){
    const light = new THREE.PointLight( 0xffffff, 1, 300 );
    light.position.set( 0, 5.31, -0.87 );
    light.castShadow = true;
    light.shadow.mapSize.width = 1512;
    light.shadow.mapSize.height = 1512;
    light.shadow.camera.near = 3;
    light.shadow.camera.far = 1500;
    guigenerate(light)
    scene.add( light );
}

function panorama(){
	const geometry2 = new THREE.SphereGeometry( 1000, 100, 40 );
    geometry2.scale(-1, 1, 1 );
    const texture2 = new THREE.TextureLoader().load( '/js/panoramaassets/realonetwo.jpg' );
    const material2 = new THREE.MeshBasicMaterial( { map: texture2 } );
    const mesh2 = new THREE.Mesh( geometry2, material2 );
    // mesh2.position.set(0,139.5,1)
    guigenerate(mesh2,"panorama")
    mesh2.position.set( 0, 0, 0);

    // panoramaele = mesh2;
    scene.add( mesh2 );
}


function sceneload(){
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/js/modelassets/' );
    loader.setDRACOLoader( dracoLoader );

    loader.load( '/js/modelassets/scene.glb', function ( gltf ) {

        const scenemodel = gltf.scene;
        const wall = scenemodel.getObjectByName( 'wall' )
        if(wall.material){
            wall.material.metalness = 0;
            wall.material.side = THREE.DoubleSide;
            wall.material.roughness = 2;
        }
        const floor = scenemodel.getObjectByName( 'floor' )
        floor.castShadow = true;
        floor.receiveShadow = true;
        if(floor.material){
            floor.material.metalness = 0;
            floor.material.side = THREE.DoubleSide;
            floor.material.roughness = 0;
        }

        scenemodel.traverse( function( node ) {
                node.receiveShadow = true
                node.castShadow = true;           
        });

        guigenerate(scenemodel,"scenemodel")

        scene.add( scenemodel );

    } );
}

function init2(){
    renderer2 = new CSS3DRenderer();
    renderer2.setSize( vw, vh );
    $("#webcssrender").append(renderer2.domElement)
    renderer2.render( scene, camera );
}

var c = 0

function infospot({
    svg= false
    ,style = ""
    ,x = 0
    ,y = 1.66
    ,z = -0.26
    ,icon = ""
    ,sizevalue = 1
    ,other = 'menuspot'
    ,size = "normal"
    ,image = false
    ,arrow = false
    ,rotation = false
    ,onclick = ()=>{}
}){

const element = document.createElement( 'div' );
if(arrow){
    element.className = "arrows-container"
}
var html = ''
if(svg){
    html = `<a ${other} role="button" class="${style} focus-shadow-scale text-decoration-none text-main2 d-block wh80 bg-white rounded-circle d-flex align-items-center justify-content-center shadow p-0" style="opacity:0;" >${svg}</a>`;
}else if(image){
    html = `<a ${other} role="button" class="${style} focus-shadow-scale text-decoration-none text-main2 d-block wh80 bg-white rounded-circle d-flex align-items-center justify-content-center shadow p-0" style="opacity:0; background-image: url(${image}); background-size:80%; background-position:center; background-repeat:no-repeat"></a>`;
}else if(arrow){
    html = `
    <div class="arrows "><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span><span class="arrow"></span></div>
`
}
else{
    html = `<a ${other} role="button" class="${style} focus-shadow-scale text-decoration-none text-main2 d-block wh80 bg-white rounded-circle d-flex align-items-center justify-content-center shadow" style="opacity:0;"><i class="fs-icon fa-solid ${icon} "}></i></a>`;
}
element.innerHTML = html

$(element).on("click",onclick)

var objectCSS = new CSS3DObject( element );

if(size == "normal"){
    objectCSS.scale.set(sizevalue,sizevalue,sizevalue)
}else{
    objectCSS.scale.set(0.002,0.002,0.002)
}

objectCSS.position.set(x,y,z)
if(rotation){
    objectCSS.rotation.set(rotation.x,rotation.y,rotation.z)

}

guigenerate(objectCSS,"infospot"+c)

if(size != "normal"){
    // objectCSS.visible = false;
    spotsxray.push(objectCSS)
}
if(!arrow){
    spots.push(objectCSS)
}
scene.add( objectCSS );

c++;
}


function containersetting(){
container = $("#webgl")
vw = $("#webgl").width();
vh = $("#webgl").height();
}

function onWindowResize() {
    containersetting()
    camera.aspect = vw / vh;
    camera.updateProjectionMatrix();
    renderer.setSize( vw ,vh );
    renderer2.setSize( vw ,vh );

}

function guigenerate(cube,name){
    // const cubeFolder = gui.addFolder(name)
    // cubeFolder.add(cube.position, 'x', -1400,  1400).step(0.000001).name("position x ").listen();
    // cubeFolder.add(cube.position, 'y', -1400,  1400).step(0.000001).name("position y ").listen();
    // cubeFolder.add(cube.position, 'z', -1400,  1400).step(0.000001).name("position z ").listen();
    // cubeFolder.add(cube.rotation, 'x', -2,  2).step(0.000001).name("rotation x ").listen();
    // cubeFolder.add(cube.rotation, 'y', -2, 2).step(0.000001).name("rotation y ").listen();
    // cubeFolder.add(cube.rotation, 'z', -2,  2).step(0.000001).name("rotation z ").listen();
    // cubeFolder.add(cube.scale, 'x', -1,  1).step(0.000001).name("scale x ").listen();
    // cubeFolder.add(cube.scale, 'y', -1,  1).step(0.000001).name("scale y ").listen();
    // cubeFolder.add(cube.scale, 'z', -1,  1).step(0.000001).name("scale z ").listen();
}

function animate() {
    spots.map((e)=>{
        e.lookAt(camera.position)
    })
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
    renderer2.render( scene, camera)
};

var tbtl = gsap.timeline()
var xrtl = gsap.timeline()

function toolbaropen(container){
    $("[menucontainer]").not(container).addClass("d-none")

    $(container).removeClass("d-none")
    tbtl.to("#toolbar",{bottom: 0, opacity: 1,duration: .3})
}
$("#whitebox rect").not("#whitebox rect:nth-child(4)").not("#whitebox rect:nth-child(5)").map((index,ele)=>{
    $(ele).on("click",()=>{
        toolbaropen("#productdetail1")
    })
})
function toolbarclose(){
    tbtl.to("#toolbar",{bottom: "-70px", opacity: 0,duration: .3,onComplete:()=>{
        $("[menucontainer]").addClass("d-none")
    }})
}
function xraycarinfoopen(container,title){
    $("[titleinfo]").html(title)
    $("[xrayinfocontainer]").not(container).addClass("d-none")
    $(container).removeClass("d-none")
    $("#xraycarinfo").removeClass("d-none")
    tbtl.to("#xraycarinfo",{bottom: 0, y:"0" ,opacity: 1,duration: .5})
}
function xraycarinfoclose(){
    xrtl.to("#xraycarinfo",{ opacity: 0, y:"20%",duration: .5,onComplete:()=>{
        $("#xraycarinfo").addClass("d-none")
    }})
}

$("[closexraycarinfo]").on("click",()=>{
    xraycarinfoclose()
})

$("[closetoolbar]").on("click",()=>{
    toolbarclose()
});

(
    async ()=>{
    containersetting()
    init()
    init2()
    infospot({
        other:"menuspot",
        image: "/map/hyundai.svg",
        onclick:()=>{toolbaropen("#productdetail1")},
        x:1400,
        y:63.806324,
        z:-59.70535,
        sizevalue:2
    })

    var newrotate = {x:-1.585078,y:-0.129405,z:0.04704}

    infospot({
        other:"arrow",
        arrow: true,
        // image: "/logo/kialogo.png",
        onclick:()=>{toolbaropen("#productdetail1")},
        // x:0.927802,
        // y:-219.091927,
        // z:-1400,
        // rotation: {x:-1.452745,y:0.002929,z:1.546825},
        x: 1400,
        y:-275.85078,
        z:-59.70535,
        rotation: newrotate,

        sizevalue:2,

    })
    // 1000
    // -329.370208
    // -59.70535
   
    await loadpointlight()
    await panorama()
    animate()
    
    gsap.to("[menuspot]",{duration: 1, opacity: 1})
    var xraytl = gsap.timeline()
    xraytl.to("[spotsxray]",{opacity: 1,duration: 0.2})
    xraytl.reverse(-1)
    xraytl.reversed(true);
    var l = false;
    $("[startxray]").on("click",()=>{
        
        xraytl.reversed(!xraytl.reversed());
        $("[spotsxray]").toggleClass("pe-none")
        l = !l;
        spotsxray.map((e)=>{
            e.visible = l;
        })
    })
    
   

    
    
    }
)();


if($("[locationpicker]").val()){
    picklocation = "a13_a14"
    $("[locationpicker]").trigger("change")
    loadmap(picklocation)
}
