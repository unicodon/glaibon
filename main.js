var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var light = new THREE.DirectionalLight(0xFF00FF);
light.position = new THREE.Vector3(35.577, 36.577, 35.577);
scene.add(light);

var light2 = new THREE.DirectionalLight(0xFFFF00);
light2.position = new THREE.Vector3(-35.577, -36.577, -35.577);
scene.add(light2);


var ambient = new THREE.AmbientLight(0x808080);
scene.add(ambient);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

trackball = new THREE.TrackballControls( camera, renderer.domElement );

var loader = new THREE.JSONLoader();
loader.load( "model/LhindfootC.js", modelToScene );

function modelToScene( geometry, materials ) {
        for ( var i = 0; i < materials.length; i++ ) {
//                materials[i].side = THREE.BackSide;
        }
        var material = new THREE.MeshFaceMaterial( materials );
//      var material = new THREE.MeshBasicMaterial( {wireframe:true} );
            obj = new THREE.Mesh( geometry, material );
            obj.scale.set(1,1,1);
            scene.add( obj );
}

camera.position.z = 0.1;
camera.position.x = 0.1;

function render() {
	requestAnimationFrame(render);
	trackball.update();
	renderer.render(scene, camera);
}
render();
