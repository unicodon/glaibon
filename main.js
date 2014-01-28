var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000 );

var light = new THREE.DirectionalLight(0xFF80FF);
light.position = new THREE.Vector3(35.577, 36.577, 35.577);
scene.add(light);

var light2 = new THREE.DirectionalLight(0xFFFF80);
light2.position = new THREE.Vector3(-35.577, -36.577, -35.577);
scene.add(light2);

var ambient = new THREE.AmbientLight(0x808080);
scene.add(ambient);

var renderer = new THREE.WebGLRenderer({canvas:$("#example").get(0)});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

trackball = new THREE.TrackballControls( camera, renderer.domElement );

parts = [
{
 position: { x:0, y:0, z:0 }, 
 parts:[
 "body01",
 "body02",
 "body03",
 "body04",
 "body05",
 "body06",
 ]
}
,
{
 position: { x:0, y:0.0995, z:0.0625 }, 
 parts:[
 "head01",
 "head02",
 "head03",
 "head04",
 "head05",
 "head06",
 ]
}
,

{ position: { x:0, y:0.0820, z:0.1025 },  parts:[ "chops" ] },

{ position: { x:0.0, y:0.0195, z:0.0625 },  parts:[ "neck" ] },

{ position: { x:0.0, y:0.0, z:0.06 },  parts:[ "LforefootA" ] },
{ position: { x:0.0622, y:0.0, z:0.06 },  parts:[ "LforefootB" ] },
{ position: { x:0.0622, y:-0.0695, z:0.074 },  parts:[ "LforefootC","LforefootD" ]},

{ position: { x:0.0, y:0.0, z:-0.06 },  parts:[ "LhindfootA" ] },
{ position: { x:0.0622, y:0.0, z:-0.06 },  parts:[ "LhindfootB" ] },
{ position: { x:0.0622, y:-0.0695, z:-0.074 },  parts:[ "LhindfootC","LhindfootD" ]},

{ position: { x:-0.0, y:0.0, z:0.06 },  parts:[ "RforefootA" ] },
{ position: { x:-0.0622, y:0.0, z:0.06 },  parts:[ "RforefootB" ] },
{ position: { x:-0.0622, y:-0.0695, z:0.074 },  parts:[ "RforefootC","RforefootD" ]},

{ position: { x:-0.0, y:0.0, z:-0.06 },  parts:[ "RhindfootA" ] },
{ position: { x:-0.0622, y:0.0, z:-0.06 },  parts:[ "RhindfootB" ] },
{ position: { x:-0.0622, y:-0.0695, z:-0.074 },  parts:[ "RhindfootC","RhindfootD" ]},

//{ position: { x:0, y:0.0820, z:0.1025 },  parts:[ "tail0, tail1" ] },

]

function MyObj() {
}

MyObj.prototype.load = function(p) {
for (var j = 0; j < p.parts.length; j++) {
	var model = "model/js/" + p.parts[j] + ".js";
	var loader = new THREE.JSONLoader();
	var cb = function( geometry, materials ) {
	        var material = new THREE.MeshFaceMaterial( materials );
	//      var material = new THREE.MeshBasicMaterial( {wireframe:true} );
	            var obj = new THREE.Mesh( geometry, material );
	            obj.scale.set(1,1,1);
	            obj.position = p.position;
	            scene.add( obj );
	};
	loader.load( model, cb);
};
}

for (var i = 0; i < parts.length; i++) {
var p = parts[i];
my = new MyObj();
my.load(p);
}




var gridHelper = new THREE.GridHelper( 1, 0.1 );
gridHelper.position = new THREE.Vector3( 0, 0, 0 );
gridHelper.rotation = new THREE.Euler( 0, 0, 0 );
scene.add( gridHelper );

camera.position.x = 0.5;
camera.position.y = 0.1;
camera.position.z = 0.5;

function render() {
	requestAnimationFrame(render);
	trackball.update();
	renderer.render(scene, camera);
}
render();
