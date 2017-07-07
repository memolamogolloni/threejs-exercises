var renderer;
var scene;
var camera;
var control;
var stats;
var cameraControl;

var cameraBG;
var sceneBG;
var composer;
var clock;


function init() {

    clock = new THREE.Clock();

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

    var ambientLight = new THREE.AmbientLight(0x111111);
    ambientLight.name='ambient';
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position = new THREE.Vector3(100,10,-50);
    directionalLight.name='directional';
    scene.add(directionalLight);

    camera.position.x = 25;
    camera.position.y = 26;
    camera.position.z = 23;
    camera.lookAt(scene.position);

    cameraControl = new THREE.OrbitControls(camera);


    control = new function () {
        this.rotationSpeed = 0.001;
        this.ambientLightColor = ambientLight.color.getHex();
        this.directionalLightColor = directionalLight.color.getHex();
    };

    addControlGui(control);
    addStatsObject();

    cameraBG = new THREE.OrthographicCamera( -window.innerWidth, window.innerWidth, window.innerHeight, window.innerHeight, -10000, 10000 );
    cameraBG.position.z = 50;
    sceneBG = new THREE.Scene();

    var materialColor = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture("../../assets/textures/planets/starry_background.jpg"), depthTest: false });
    var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
    bgPlane.position.z = -100;
    bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);
    sceneBG.add(bgPlane);

    document.body.appendChild(renderer.domElement);

    render();
}

function createEarthMaterial() {
    var earthTexture = THREE.ImageUtils.loadTexture("../../assets/textures/planets/earthmap4k.jpg");

    var earthMaterial = new THREE.MeshPhongMaterial();
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
    gui.addColor(controlObject, 'ambientLightColor');
    gui.addColor(controlObject, 'directionalLightColor');

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
    scene.getObjectByName('ambient').color = new THREE.Color(control.ambientLightColor);
    scene.getObjectByName('directional').color = new THREE.Color(control.directionalLightColor);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}


function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleResize, false);
