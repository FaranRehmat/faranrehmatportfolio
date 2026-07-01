/* ============================================================
   FARAN REHMAT — THREE.JS BACKGROUND ANIMATION
   ============================================================ */

(function () {
  const canvas   = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  // Particle field
  const count = 1800;
  const geo   = new THREE.BufferGeometry();
  const pos   = new Float32Array(count * 3);
  const col   = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i*3]   = (Math.random()-0.5)*120;
    pos[i*3+1] = (Math.random()-0.5)*80;
    pos[i*3+2] = (Math.random()-0.5)*60;
    const c = Math.random();
    if      (c < 0.5) { col[i*3]=0;   col[i*3+1]=0.96; col[i*3+2]=1;    } // cyan
    else if (c < 0.8) { col[i*3]=0.5; col[i*3+1]=0;    col[i*3+2]=1;    } // purple
    else               { col[i*3]=1;   col[i*3+1]=0;    col[i*3+2]=0.43; } // pink
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const mat       = new THREE.PointsMaterial({ size:0.25, vertexColors:true, transparent:true, opacity:0.7 });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Wireframe icosahedra
  const shapes = [];
  const wMat   = new THREE.MeshBasicMaterial({ color:0x00f5ff, wireframe:true, transparent:true, opacity:0.06 });
  [[0,0,-10,10],[20,-10,-20,6],[-18,8,-15,8],[0,15,-25,12]].forEach(([x,y,z,r]) => {
    const g = new THREE.IcosahedronGeometry(r, 1);
    const m = new THREE.Mesh(g, wMat.clone());
    m.position.set(x, y, z);
    scene.add(m); shapes.push(m);
  });

  // Grid
  const gridHelper = new THREE.GridHelper(200, 40, 0x00f5ff, 0x00f5ff);
  gridHelper.material.transparent = true;
  gridHelper.material.opacity     = 0.04;
  gridHelper.position.y  = -20;
  gridHelper.position.z  = -10;
  scene.add(gridHelper);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += 0.005;
    particles.rotation.y = t * 0.08;
    particles.rotation.x = t * 0.03;
    shapes.forEach((s, i) => {
      s.rotation.x += 0.003 * (i % 2 ? 1 : -1);
      s.rotation.y += 0.004;
    });
    camera.position.x += (mx*3 - camera.position.x) * 0.04;
    camera.position.y += (my*2 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);
    gridHelper.position.x = mx * 2;
    renderer.render(scene, camera);
  })();
})();
