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
    renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.toneMappingExposure = 0.85;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( vw, vh );

    // camera setting
    camera = new THREE.PerspectiveCamera( 40, vw / vh, 1, 1100 );
    // camera.position.set(1.9,146.3,-335.8)
    camera.position.set(-0.07,1.81,-6.9)
    camera.rotation.set(-2.94,-1.1,3.14)

    guigenerate(camera,"camera")

    // setting controls
    controls = new OrbitControls( camera, renderer.domElement );
    // controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.minDistance = 5;
    controls.maxDistance = 6.9;
    // controls.minPolarAngle = Math.PI/3;
    controls.maxPolarAngle = Math.PI/2.3;
    controls.enablePan = false;
    // controls.enableZoom = false;
    // controls.target.set( 0, -10, 1);

    $("#webgl").append(renderer.domElement)

    window.addEventListener( 'resize', onWindowResize );

}

function loadcarmodel(){
    const shadow = new THREE.TextureLoader().load( '/js/modelassets/ferrari_ao.png' );

    const bodyMaterial = new THREE.MeshPhysicalMaterial( {
        color: 0xff0000, metalness: 1.0, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5
    } );
    const detailsMaterial = new THREE.MeshStandardMaterial( {
        color: 0xffffff, metalness: 1.0, roughness: 0.5
    } );
    const glassMaterial = new THREE.MeshPhysicalMaterial( {
        color: 0xffffff, metalness: 0.25, roughness: 0, transmission: 1.0
    } );

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/js/modelassets/' );

    const loader = new GLTFLoader();
    loader.setDRACOLoader( dracoLoader );

    loader.load( '/js/modelassets/ferrari.glb', function ( gltf ) {

        const carModel = gltf.scene.children[ 0 ];

        carModel.getObjectByName( 'body' ).material = bodyMaterial;

        carModel.getObjectByName( 'rim_fl' ).material = detailsMaterial;
        carModel.getObjectByName( 'rim_fr' ).material = detailsMaterial;
        carModel.getObjectByName( 'rim_rr' ).material = detailsMaterial;
        carModel.getObjectByName( 'rim_rl' ).material = detailsMaterial;
        carModel.getObjectByName( 'trim' ).material = detailsMaterial;

        carModel.getObjectByName( 'glass' ).material = glassMaterial;

        // shadow
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry( 0.655 * 4, 1.3 * 4 ),
            new THREE.MeshBasicMaterial( {
                map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
            } )
        );
        mesh.rotation.x = - Math.PI / 2;
        mesh.renderOrder = 2;
        carModel.position.y  = 0.11;

        carModel.add( mesh );
        // carModel.position.set(0,-75.5,1)
        // carModel.scale.set(60,60,60)

        guigenerate(carModel,"car")

        scene.add( carModel );

    } );
}
function loadcarmodel2(){

    const bodyMaterial = new THREE.MeshPhysicalMaterial( {
        transparent: true, opacity: 1,
        color: new THREE.Color("#ff0000"), metalness: 1.0, roughness: 0.3, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5
    } );
    const detailsMaterial = new THREE.MeshStandardMaterial( {
        color: 0xffffff, metalness: 1.0, roughness: 0.3, transparent: true, opacity: 1
    } );
    const spotlightMaterial = new THREE.MeshStandardMaterial( {
        color: 0xffffff, metalness: 1.0, roughness: 0.3, transparent: true, opacity: 0.5
    } );
    const glassMaterial = new THREE.MeshPhysicalMaterial( {
        color: 0xffffff, metalness: 0.1,  roughness: 0, transmission: 1.0, transparent: true, opacity: 0.5
    } );


    $(document).on("click",(evt)=>{
        
    })
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/js/modelassets/' );

    const loader = new GLTFLoader();
    loader.setDRACOLoader( dracoLoader );

    loader.load( '/js/modelassets/ferari2.glb', function ( gltf ) {

        const carModel = gltf.scene;
        var newwheel = carModel.getObjectByName( 'newwheel' );
        newwheel.material = detailsMaterial
        newwheel.visible = false;
        var oldwheel = carModel.getObjectByName( 'oldwheel' );
        oldwheel.material = detailsMaterial
        oldwheel.visible = true;

        $(document).on("click",(evt)=>{
            if($(evt.target).is("[colorpicker]")){
                var color = $(evt.target).css('background-color')
                bodyMaterial.color.set( new THREE.Color(color) );
            }else if($(evt.target).is("[wheelpicker]")){
                if( evt.target.id =="newwheel"){
                    newwheel.visible = true
                    oldwheel.visible = false
                }else{
                    newwheel.visible = false
                    oldwheel.visible = true
                }
            }else if($(evt.target).is("[startxray]")){
                if(bodyMaterial.opacity != 0.6){
                    gsap.to(bodyMaterial, {opacity: 0.6,duration:0.5})
                }else{
                    gsap.to(bodyMaterial, {opacity: 1,duration:0.5})

                }
            }
        })

       carModel.scale.set(0.20,0.20,0.20)
       carModel.position.set(0,0.09,0)
       carModel.rotation.y = -3.16;
     

       gltf.scene.traverse( function( node ) {

        node.receiveShadow = true
        node.castShadow = true; 
       
        if(node?.name == "glass"){
            node.children.map((e)=>{
                e.material = glassMaterial
            })
        }
        else if(node?.name == "carspotlight"){
            node.material = spotlightMaterial
        }

        } );

        carModel.getObjectByName( 'bodycolor' ).material = bodyMaterial;
        carModel.getObjectByName( 'glass' ).material = glassMaterial;
        carModel.getObjectByName( 'glass' ).material.transparent = true;

        carModel.receiveShadow = true;
        carModel.castShadow = true; 

        guigenerate(carModel,"car2")

        scene.add( carModel );

    } );
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
    ,other = 'menuspot'
    ,size = "normal"
    ,onclick = ()=>{}
}){

const element = document.createElement( 'div' );
var html = ''
if(svg){
    html = `<a ${other} role="button" class="${style} focus-shadow-scale text-decoration-none text-main2 d-block wh80 bg-white rounded-circle d-flex align-items-center justify-content-center shadow p-3" style="opacity:0;" >${svg}</a>`;
}else{
    html = `<a ${other} role="button" class="${style} focus-shadow-scale text-decoration-none text-main2 d-block wh80 bg-white rounded-circle d-flex align-items-center justify-content-center shadow" style="opacity:0;"><i class="fs-icon fa-solid ${icon} "}></i></a>`;
}
element.innerHTML = html

$(element).on("click",onclick)

var objectCSS = new CSS3DObject( element );

if(size == "normal"){
    objectCSS.scale.set(0.005,0.005,0.005)
}else{
    objectCSS.scale.set(0.002,0.002,0.005)
}

objectCSS.position.set(x,y,z)

// guigenerate(objectCSS,"infospot"+c)

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
    // cubeFolder.add(cube.position, 'x', -2,  2).step(0.01).name("position x ").listen();
    // cubeFolder.add(cube.position, 'y', -2,  2).step(0.01).name("position y ").listen();
    // cubeFolder.add(cube.position, 'z', -2,  2).step(0.01).name("position z ").listen();
    // cubeFolder.add(cube.rotation, 'x', -2,  2).step(0.01).name("rotation x ").listen();
    // cubeFolder.add(cube.rotation, 'y', -20, 2).step(0.01).name("rotation y ").listen();
    // cubeFolder.add(cube.rotation, 'z', -2,  2).step(0.01).name("rotation z ").listen();
    // cubeFolder.add(cube.scale, 'x', -2,  2).step(0.01).name("scale x ").listen();
    // cubeFolder.add(cube.scale, 'y', -2,  2).step(0.01).name("scale y ").listen();
    // cubeFolder.add(cube.scale, 'z', -2,  2).step(0.01).name("scale z ").listen();
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

// toolbaropen("#productdetail")
// toolbarclose("#productdetail")

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
    infospot({other:"menuspot",x:0.75,icon:"fa-circle-info",onclick:()=>{toolbaropen("#productdetail")}})
    infospot({other:"menuspot",x:0.29,icon:"fa-palette",onclick:()=>{toolbaropen("#colorpicker")}})
    infospot({other:"menuspot",x:-0.17,icon:"fa-tire",onclick:()=>{toolbaropen("#wheelpicker")},svg:`
    <svg width="100%" height="100%" class="pe-none" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 339.38 339.38"><defs><style>.cls-1{fill:#4F76B1;stroke:#231f20;stroke-miterlimit:10;}</style></defs><path class="cls-1" d="M169.69.5A169.19,169.19,0,1,0,338.88,169.69,169.19,169.19,0,0,0,169.69.5Zm0,283.1A113.92,113.92,0,1,1,283.6,169.69,113.92,113.92,0,0,1,169.69,283.6Z"/><circle class="cls-1" cx="169.69" cy="169.69" r="20.82"/><path class="cls-1" d="M108.58,233l24.54-33.77a46.83,46.83,0,0,1-10.42-29.5c0-.8,0-1.59.06-2.38l-39.71-12.9A88,88,0,0,0,108.58,233Z"/><path class="cls-1" d="M181.93,124.32A47.06,47.06,0,0,1,209,144l39.72-12.91a88,88,0,0,0-66.83-48.54Z"/><path class="cls-1" d="M130.33,144a47.06,47.06,0,0,1,27.11-19.71V82.58a88,88,0,0,0-66.83,48.54Z"/><path class="cls-1" d="M216.62,167.31c0,.79.06,1.58.06,2.38a46.78,46.78,0,0,1-10.43,29.5L230.79,233a88.14,88.14,0,0,0,25.54-78.55Z"/><path class="cls-1" d="M186.45,213.59a47,47,0,0,1-33.52,0l-24.54,33.78a88.1,88.1,0,0,0,82.6,0Z"/></svg>
    `})
    infospot({x:-0.64,
        other:"startxray menuspot",
        icon:"fa-tire",
        svg:`<svg width="100%" height="100%" class="pe-none" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248.79 240.64"><defs><style>.cls-1{fill:#4F76B1;}.cls-2{fill:#fff;}</style></defs><rect class="cls-1" width="248.79" height="240.64" rx="31.47"/><path class="cls-2" d="M77.12,107.39l7.69-22A21,21,0,0,1,104.6,71.38h39.59A21,21,0,0,1,164,85.43l7.69,22a14,14,0,0,1,8.65,12.93v42a7,7,0,0,1-7,7h-7a7,7,0,0,1-7-7V151.78H89.44v10.49a7,7,0,0,1-7,7h-7a7,7,0,0,1-7-7v-42a14,14,0,0,1,8.65-12.93Zm15.18-1h64.19L150.79,90a7,7,0,0,0-6.6-4.68H104.6A7,7,0,0,0,98,90Zm-2.86,14a7,7,0,1,0,7,7A7,7,0,0,0,89.44,120.32Zm69.91,14a7,7,0,1,0-7-7A7,7,0,0,0,159.35,134.3Z"/><path class="cls-2" d="M45.48,71.67V37L38,44.45h32.3c3.93,0,7.68-3.45,7.5-7.5a7.62,7.62,0,0,0-7.5-7.5H38a7.61,7.61,0,0,0-7.5,7.5V71.67c0,3.92,3.45,7.68,7.5,7.5a7.63,7.63,0,0,0,7.5-7.5Z"/><path class="cls-2" d="M45.48,71.67V37L38,44.45h32.3c3.93,0,7.68-3.45,7.5-7.5a7.62,7.62,0,0,0-7.5-7.5H38a7.61,7.61,0,0,0-7.5,7.5V71.67c0,3.92,3.45,7.68,7.5,7.5a7.63,7.63,0,0,0,7.5-7.5Z"/><path class="cls-2" d="M174.85,45.66h34.72l-7.5-7.5v32.3c0,3.92,3.45,7.68,7.5,7.5a7.63,7.63,0,0,0,7.5-7.5V38.16a7.6,7.6,0,0,0-7.5-7.5H174.85c-3.92,0-7.68,3.45-7.5,7.5a7.63,7.63,0,0,0,7.5,7.5Z"/><path class="cls-2" d="M45.48,71.67V37L38,44.45h32.3c3.93,0,7.68-3.45,7.5-7.5a7.62,7.62,0,0,0-7.5-7.5H38a7.61,7.61,0,0,0-7.5,7.5V71.67c0,3.92,3.45,7.68,7.5,7.5a7.63,7.63,0,0,0,7.5-7.5Z"/><path class="cls-2" d="M45.48,71.67V37L38,44.45h32.3c3.93,0,7.68-3.45,7.5-7.5a7.62,7.62,0,0,0-7.5-7.5H38a7.61,7.61,0,0,0-7.5,7.5V71.67c0,3.92,3.45,7.68,7.5,7.5a7.63,7.63,0,0,0,7.5-7.5Z"/><path class="cls-2" d="M174.85,45.66h34.72l-7.5-7.5v32.3c0,3.92,3.45,7.68,7.5,7.5a7.63,7.63,0,0,0,7.5-7.5V38.16a7.6,7.6,0,0,0-7.5-7.5H174.85c-3.92,0-7.68,3.45-7.5,7.5a7.63,7.63,0,0,0,7.5,7.5Z"/><path class="cls-2" d="M202.07,169.37V204.1l7.5-7.5h-32.3c-3.92,0-7.68,3.45-7.5,7.5a7.64,7.64,0,0,0,7.5,7.5h32.3a7.61,7.61,0,0,0,7.5-7.5V169.37c0-3.92-3.45-7.68-7.5-7.5a7.64,7.64,0,0,0-7.5,7.5Z"/><path class="cls-2" d="M202.07,169.37V204.1l7.5-7.5h-32.3c-3.92,0-7.68,3.45-7.5,7.5a7.64,7.64,0,0,0,7.5,7.5h32.3a7.61,7.61,0,0,0,7.5-7.5V169.37c0-3.92-3.45-7.68-7.5-7.5a7.64,7.64,0,0,0-7.5,7.5Z"/><path class="cls-2" d="M72.7,195.39H38l7.5,7.5v-32.3c0-3.93-3.45-7.69-7.5-7.5a7.63,7.63,0,0,0-7.5,7.5v32.3a7.61,7.61,0,0,0,7.5,7.5H72.7c3.93,0,7.69-3.45,7.5-7.5a7.62,7.62,0,0,0-7.5-7.5Z"/></svg>`
    })
    await infospot({other:"spotsxray", style:"pe-none" ,x:-1,y:0.49,z:-1.42,icon:"fa-circle",size:"small",onclick:()=>{xraycarinfoopen("#content3","disc brake system")}})
    await infospot({other:"spotsxray", style:"pe-none" ,x:0.06,y:0.79,z:-1.85,icon:"fa-circle",size:"small",onclick:()=>{xraycarinfoopen("#content2","power stage")}})
    await infospot({other:"spotsxray", style:"pe-none" ,x:0.06,y:1.1,z:1,icon:"fa-circle",size:"small",onclick:()=>{xraycarinfoopen("#content1","engine system")}})
    // await infospot({other:"spotsxray", x:-0.44,y:0.44,z:2,icon:"fa-circle",size:"small"})
    await loadcarmodel2()
    await loadpointlight()
    await sceneload()
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

// gui.close();
// dat.GUI.toggleHide();
