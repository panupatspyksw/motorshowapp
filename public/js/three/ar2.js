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
    camera.position.z = 400;

    guigenerate(camera,"camera")

    // setting controls
    controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 1;
    controls.maxDistance = 400;
    controls.minPolarAngle = Math.PI/3;
    controls.enablePan = false;
    controls.enableZoom = false;
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
	const geometry2 = new THREE.SphereGeometry( 500, 100, 40 );
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
    ,onclick = ()=>{}
}){

const element = document.createElement( 'div' );
var html = ''
if(svg){
    html = `<a ${other} role="button" class="${style} focus-shadow-scale text-decoration-none text-main2 d-block wh80 bg-white rounded-circle d-flex align-items-center justify-content-center shadow p-0" style="opacity:0;" >${svg}</a>`;
}else if(image){
    html = `<a ${other} role="button" class="${style} focus-shadow-scale text-decoration-none text-main2 d-block wh80 bg-white rounded-circle d-flex align-items-center justify-content-center shadow p-0" style="opacity:0; background-image: url(${image}); background-size:80%; background-position:center; background-repeat:no-repeat"></a>`;
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

guigenerate(objectCSS,"infospot"+c)

if(size != "normal"){
    // objectCSS.visible = false;
    spotsxray.push(objectCSS)
}

spots.push(objectCSS)
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
    // cubeFolder.add(cube.position, 'x', -500,  500).step(0.01).name("position x ").listen();
    // cubeFolder.add(cube.position, 'y', -500,  500).step(0.01).name("position y ").listen();
    // cubeFolder.add(cube.position, 'z', -500,  500).step(0.01).name("position z ").listen();
    // cubeFolder.add(cube.rotation, 'x', -500,  500).step(0.01).name("rotation x ").listen();
    // cubeFolder.add(cube.rotation, 'y', -500, 500).step(0.01).name("rotation y ").listen();
    // cubeFolder.add(cube.rotation, 'z', -500,  500).step(0.01).name("rotation z ").listen();
    // cubeFolder.add(cube.scale, 'x', -500,  500).step(0.01).name("scale x ").listen();
    // cubeFolder.add(cube.scale, 'y', -500,  500).step(0.01).name("scale y ").listen();
    // cubeFolder.add(cube.scale, 'z', -500,  500).step(0.01).name("scale z ").listen();
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
        image: "/logo/kialogo.png",
        onclick:()=>{toolbaropen("#productdetail1")},
        x:309.32,
        y:71.13,
        z:-400,
        sizevalue:2
    })
    infospot({
        other:"menuspot",
        image: "/logo/laminalogo.png",
        onclick:()=>{toolbaropen("#productdetail2")},
        x:-334.67,
        y:71.13,
        z:-400,
        sizevalue:2
    })
    // subaru booth
    infospot({
        other:"menuspot",
        image: "/logo/subarulogo.png",
        onclick:()=>{toolbaropen("#productdetail4")},
        x:-330.12,
        y:88.93,
        z:400,
        sizevalue:2
    })
    infospot({
        other:"menuspot",
        image: "/logo/porschelogo.png",
        onclick:()=>{toolbaropen("#productdetail3")},
        x:408.7,
        y:88.93,
        z:400,
        sizevalue:2
    })
    
   
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
