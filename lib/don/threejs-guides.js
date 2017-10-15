function addHelpers(axis, x, y, z) {
  var xGridHelper = new THREE.GridHelper(
    100,
    10,
    new THREE.Color("rgb(130, 20, 20)"),
    new THREE.Color("rgb(130, 20, 20)")
  );
  x && scene.add(xGridHelper);

  var yGridHelper = new THREE.GridHelper(
    100,
    10,
    new THREE.Color("rgb(20, 100, 20)"),
    new THREE.Color("rgb(20, 100, 20)")
  );
  yGridHelper.rotation.x = 3.14 / 2;
  y && scene.add(yGridHelper);

  var zGridHelper = new THREE.GridHelper(
    100,
    10,
    new THREE.Color("rgb(20, 20, 150)"),
    new THREE.Color("rgb(20, 20, 150)")
  );
  zGridHelper.rotation.z = 3.14 / 2;
  z && scene.add(zGridHelper);

  var axisHelper = new THREE.AxisHelper(100);
  axis && scene.add(axisHelper);
}
