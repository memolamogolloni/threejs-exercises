var renderer;
var scene;
var camera;
var control;
var stats;
var cameraControl;


function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    var sphereGeometry = new THREE.SphereGeometry(15, 60, 60);
    var sphereMaterial = createEarthMaterial();
    var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = 'earth';
    scene.add(earthMesh);

    var cloudGeometry = new THREE.SphereGeometry(15.25, 60, 60);
    var cloudMaterial = createCloudMaterial();
    var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudMesh.name = 'clouds';
    scene.add(cloudMesh);

    camera.position.x = 25;
    camera.position.y = 26;
    camera.position.z = 23;
    camera.lookAt(scene.position);

    cameraControl = new THREE.OrbitControls(camera);

    control = new function () {
        this.rotationSpeed = 0.001;
    };

    addControlGui(control);
    addStatsObject();

    document.body.appendChild(renderer.domElement);

    render();
}

function createEarthMaterial() {
    var earthTexture = THREE.ImageUtils.loadTexture("../../assets/textures/planets/earthmap4k.jpg");

    var earthMaterial = new THREE.MeshBasicMaterial();
    earthMaterial.map = earthTexture;

    return earthMaterial;
}

function createCloudMaterial() {
    var cloudTexture = THREE.ImageUtils.loadTexture("../../assets/textures/planets/fair_clouds_4k.png");

    var cloudMaterial = new THREE.MeshBasicMaterial();
    cloudMaterial.map = cloudTexture;
    cloudMaterial.transparent = true;

    return cloudMaterial;
}

function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
}


function render() {

    stats.update();

    cameraControl.update();

    scene.getObjectByName('earth').rotation.y+=control.rotationSpeed;
    scene.getObjectByName('clouds').rotation.y+=control.rotationSpeed*1.1;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}


function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleResize, false);
