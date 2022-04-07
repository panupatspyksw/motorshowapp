
// import * as THREE from './build/three.module.js'
// import { OrbitControls } from './examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';

import * as THREE from 'three';
import { GUI } from '../dat.gui/build/dat.gui.module.js'
import Stats from './examples/jsm/libs/stats.module.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from './examples/jsm/loaders/RGBELoader.js';
import { CSS3DRenderer, CSS3DObject } from './examples/jsm/renderers/CSS3DRenderer.js';
var i = 0;

let camera, scene, renderer, panoramaele, car,diff =0;
let stats;
let grid;
let controls;
const gui = new GUI()

const wheels = [];
var container = document.getElementById("#webgl")
var vw = $("#webgl").width()
var vh = $("#webgl").height()

scene = new THREE.Scene();
// scene.background = new THREE.Color( 0xffffff );
scene.environment = new RGBELoader().load( '/js/modelassets/bg.hdr' );
scene.environment.mapping = THREE.EquirectangularReflectionMapping;
// scene.fog = new THREE.Fog( 0x333333, 1, 1 );

camera = new THREE.PerspectiveCamera( 40, vw / vh, 1, 1100 );
// camera.position.set( -2.2, 0.5, 1);
// camera.position.set( 200,300,200);
camera.position.set(1.9,146.3,-335.8)

guigenerate(camera,"camera")
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( vw, vh );
// renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMappingExposure = 0.85;
controls = new OrbitControls( camera, renderer.domElement );

function guigenerate(cube,name){
    i++;
    const cubeFolder = gui.addFolder(name)
    cubeFolder.add(cube.position, 'x', -100, 200).step(0.1).listen()
    cubeFolder.add(cube.position, 'y', -100, 200).step(0.1).listen()
    cubeFolder.add(cube.position, 'z', -100, 200).step(0.1).listen()
    cubeFolder.add(cube.rotation, 'x', -100, 200).step(0.1).listen()
    cubeFolder.add(cube.rotation, 'y', -100, 200).step(0.1).listen()
    cubeFolder.add(cube.rotation, 'z', -100, 200).step(0.1).listen()
}
// controls.minPolarAngle = Math.PI/3;
controls.maxPolarAngle = Math.PI/2;

// controls.enablePan = false;
// controls.enableZoom = false;
// controls.target.set( 0, -10, 1);

// controls.target.set( 70, -1, 70);
controls.target.set(0,1,1)

controls.update();

$("#webgl").append(renderer.domElement)
renderer.setSize( vw, vh );

function modelload(){
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

        wheels.push(
            carModel.getObjectByName( 'wheel_fl' ),
            carModel.getObjectByName( 'wheel_fr' ),
            carModel.getObjectByName( 'wheel_rl' ),
            carModel.getObjectByName( 'wheel_rr' )
        );

        

        // shadow
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry( 0.655 * 4, 1.3 * 4 ),
            new THREE.MeshBasicMaterial( {
                map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
            } )
        );
        mesh.rotation.x = - Math.PI / 2;
        mesh.renderOrder = 2;
        carModel.add( mesh );

        carModel.position.set(0,-75.5,1)
        carModel.scale.set(60,60,60)

            guigenerate(carModel,"car")

        scene.add( carModel );

    } );

}

function panorama(){
	const geometry2 = new THREE.SphereGeometry( 500, 100, 40 );
    geometry2.scale(-1, 1, 1 );
    const texture2 = new THREE.TextureLoader().load( '/js/textures/shutterstock_1904109787.jpg' );
    const material2 = new THREE.MeshBasicMaterial( { map: texture2 } );
    const mesh2 = new THREE.Mesh( geometry2, material2 );
    mesh2.position.set(0,139.5,1)
    guigenerate(mesh2,"panorama")
    // mesh2.position.set( 140, -140, 140);

    panoramaele = mesh2;
    scene.add( mesh2 );
}
panorama()
modelload()


let renderer2;

const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };
const webcssrender = renderer2 = new CSS3DRenderer();
renderer2.setSize( $("#webcssrender").width(), $("#webcssrender").height() );
$("#webcssrender").append(renderer2.domElement)
renderer2.render( scene, camera );

var spotnum = 0
function infospot(){
    spotnum +=1;

    const element = document.createElement( 'div' );
    element.className = 'p-3 pe-auto';
    element.style.backgroundColor = 'black' ;
    const objectCSS = new CSS3DObject( element );
    objectCSS.position.x = 90.1;
    objectCSS.position.y = -29;
    objectCSS.rotation.y = 2;
    scene.add( objectCSS );
    

    const cubeFolder = gui.addFolder('infospot'+spotnum)
    cubeFolder.add(cube.position, 'x', -100, 100)
    cubeFolder.add(cube.position, 'y', -100, 100)
    cubeFolder.add(cube.position, 'z', -100, 100)
    cubeFolder.add(cube.rotation, 'x', -100, 100)
    cubeFolder.add(cube.rotation, 'y', -100, 100)
    cubeFolder.add(cube.rotation, 'z', -100, 100)
    // cubeFolder.open()

}



function animate() {
    requestAnimationFrame( animate );
    controls.update();
    // o.position.x  = controls.target.x


    renderer.render( scene, camera );
    renderer2.render( scene, camera );

};

function onWindowResize() {
    var vw = $("#webgl").width()
    var vh = $("#webgl").height()
    camera.aspect = vw / vh;
    camera.updateProjectionMatrix();

    renderer.setSize( vw ,vh );

}

window.addEventListener( 'resize', onWindowResize );


animate();




