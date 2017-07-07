// global variables
var renderer;
var scene;
var camera;
var control;

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -2;
    plane.position.z = 0;

    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, transparent:true, opacity:0.6});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name='cube';
    cube.castShadow = true;

    scene.add(cube);

    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 13;
    camera.lookAt(scene.position);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 20, 20);
    spotLight.shadowCameraNear = 20;
    spotLight.shadowCameraFar = 50;
    spotLight.castShadow = true;

    scene.add(spotLight);

    control = new function() {
        this.rotationSpeed = 0.005;
        this.opacity = 0.6;
        this.color = cubeMaterial.color.getHex();
    };

    addControlGui(control);
    // call function for showing stats
    addStatsObjects();

    document.body.appendChild(renderer.domElement);

    render();
}

// function that shows fps
function addStatsObjects(){
    stats = new Stats();
    // stats.setMode(0) --> fps,   stats.setMode(1) --> ms between frames 
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
    gui.add(controlObject, 'opacity', 0.1, 1);
    gui.addColor(controlObject, 'color');
}

function render() {
    var rotSpeed = control.rotationSpeed;
    camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
    camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
    camera.lookAt(scene.position);

    scene.getObjectByName('cube').material.opacity = control.opacity;

    scene.getObjectByName('cube').material.color = new THREE.Color(control.color);

    stats.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}