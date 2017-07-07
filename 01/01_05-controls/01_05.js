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

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 20, 20);
    spotLight.shadowCameraNear = 20;
    spotLight.shadowCameraFar = 50;
    spotLight.castShadow = true;

    scene.add(spotLight);

    // setup the control object for the control gui
    control = new function() {
        this.rotationSpeed = 0.005;
        this.opacity = 0.6;
        this.color = cubeMaterial.color.getHex();
    };
    addControlGui(control);

    document.body.appendChild(renderer.domElement);

    render();
}

function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
    gui.add(controlObject, 'opacity', 0.1, 1);
    gui.addColor(controlObject, 'color');
}

function render() {
    // update the camera
    var rotSpeed = control.rotationSpeed;
    camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
    camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
    camera.lookAt(scene.position);

    // change opacity
    scene.getObjectByName('cube').material.opacity = control.opacity;

    // change color
    scene.getObjectByName('cube').material.color = new THREE.Color(control.color);

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}