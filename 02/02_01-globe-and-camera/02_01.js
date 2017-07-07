// global variables
var renderer;
var scene;
var camera;
var control;
var stats;
var cameraControl;


function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    var sphereGeometry = new THREE.SphereGeometry( 15, 30, 30);
    var sphereMaterial = new THREE.MeshNormalMaterial();
    var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = 'earth';
    scene.add(earthMesh);

    camera.position.x = 35;
    camera.position.y = 36;
    camera.position.z = 33;
    camera.lookAt(scene.position);

    // add controls over camera
    cameraControl = new THREE.OrbitControls(camera);

    control = new function(){
        this.rotationSpeed = 0.005;
        this.opacity = 0.6;
    };

    addControlGui(control);
    addStatsObject();

    document.body.appendChild(renderer.domElement);

    render();

}


function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
}

function addStatsObject(){
    stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
}

function render(){
    stats.update();
    cameraControl.update();
    scene.getObjectByName('earth').rotation.y += control.rotationSpeed;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}