var renderer;
var scene;
var camera;

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
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 'red'});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

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

    document.body.appendChild(renderer.domElement);


    // call add vertices function
    addVertices(cube);

    render();
}

function addVertices(mesh){
    // get vertices from received mesh
    var vertices = mesh.geometry.vertices;
    var vertexMaterial = new THREE.MeshPhongMaterial( { color:0x00ff00 } );

    // add a sphere at each vertex
    vertices.forEach(function(vertex){
        var vertexSphere = new THREE.SphereGeometry(0.15);
        var vertexMesh = new THREE.Mesh(vertexSphere, vertexMaterial);
        vertexMesh.position = vertex;
        scene.add(vertexMesh);
    });
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}