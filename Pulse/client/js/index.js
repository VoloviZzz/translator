'use strict';
var counter_dead = 0;
var tail_z_spawn = 55;
var timeCloudGenerateInterval = 500;
var speed_tail = 0.37;
var name_num_tail = 0;
var camera_speed = 6;
// var choose_line = [0, 0, 0, 0, 0];
var choose_line = [0, 8, -8, 16];
let scene,
    camera,
    renderer,
    controls,
    mouseDown,
    world,
    game_over = false,
    night = true;
var CloudGenerateInterval;
let sheep,
    cloud,
    torus,
    sky;

let width,
    height;

function init() {
  width = window.innerWidth,
  height = window.innerHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, width / height, 0.9, 4000);
  camera.lookAt(scene.position);
  camera.position.x = 0;
  camera.position.y = 22;
  camera.position.z = -28;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.dampingFactor = 0.25;

  // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
  // Set to false to disable zooming
  controls.enableZoom = false;
  controls.zoomSpeed = 50.0;

  // Set to false to disable rotating
  controls.enableRotate = false;
  controls.rotateSpeed = 5.0;

  // Set to false to disable panning
  controls.enablePan = false;
  controls.keyPanSpeed = 7.0; // pixels moved per arrow key push

  // Set to true to automatically rotate around the target
  // If auto-rotate is enabled, you must call controls.update() in your animation loop
  controls.autoRotate = false;
  controls.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60


  drawTorus();
  addLights();
  drawSheep();
  drawCloud();
  // drawSky();

  world = document.querySelector('.world');
  world.appendChild(renderer.domElement);

  $('.fullsreen').click(function () {
    if (localStorage['music'] == 'true') {
      console.log(localStorage['music']);
      btnMusic.classList.add('music-off');
      worldMusic.play();
    }else {
      console.log(localStorage['music']);
      btnMusic.classList.remove('music-off');
      worldMusic.pause();
    }
    $('.fullsreen').remove();
    $('.intefase_block').hide(200);
    mouseDown = true;
    document.addEventListener('touchmove', function (event) {
        sheep.group.position.x = -((((event.changedTouches[0].clientX/(window.innerWidth/100))/10)*camera_speed)-30);
        camera.position.x = -((((event.changedTouches[0].clientX/(window.innerWidth/100))/10)*camera_speed)-30);
        scene.children[0].position.x = -((((event.changedTouches[0].clientX/(window.innerWidth/100))/10)*camera_speed)-23.5);
    });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', onResize);
    cloud.grenerateCloud_long(0);
    CloudGenerateInterval = setInterval(function () {
      cloud.grenerateCloud(tail_z_spawn);
    }, timeCloudGenerateInterval);

    $('.reload').click(function () {
      location.reload();
    });

  });

}

function gameOver() {
  $('.intefase_block_gameOver').show(200);
  $('.stat').show(200);
  $('.points span').hide(200);
  setTimeout(function () {
    $('.reload').show(500);
  }, 300);
  setTimeout(function () {
    $('.score_table').show(400);
  }, 200);
  $('.share').show(200);
  $('.fullsreen_gameOver').show();
  $('.score_table span').text($('.points span').text());

}


function render() {
  if (game_over == false) {
    if (mouseDown == true) {

    scene.children[0].rotation.y += 0.1;
    if (scene.children.length > 7) {
      if (scene.children[7].position.z < 1.2 && scene.children[7].position.z > 0.9) {
        if(scene.children[7].name == 'tail'){
          if (sheep.group.position.x > scene.children[7].position.x-2.8 && sheep.group.position.x < scene.children[7].position.x+2.8) {
            var points = $('.points span').text();
            points++;
            beep1.play()
            $('.points span').text(points);
          }else {
            game_over = true;
          }
        }
      }
      if (scene.children[7].position.z < -1) {

        scene.children[7].material.color.setHex(0xffffff);
        scene.children[7].position.y -= 1;
        if(scene.children[7].name == 'torus'){
          localStorage['score']++;
          beep3.play()
          $('.score span').text(localStorage['score']);
        }

      }
      if (scene.children[7].position.z < -5) {

        scene.remove(scene.children[7]);
      }
    }
    cloud.moveCloud()
  }
    sheep.jumpOnMouseDown();
  }else {
    scene.remove(scene.children[10]);
    scene.children[7].material.color.setHex(0xff0000);
    sheep.group.position.y -= 1;
    sheep.group.position.z -= 0.2;
    gameOver();
    if (counter_dead == 0) {
      beep2.play()
      counter_dead++;
    }
    setTimeout(function () {
      scene.remove(sheep.group);

    }, 500);
  }
  if (sheep.group.position.y > 0.3) cloud.bend();
  // sky.moveSky();
  renderer.render(scene, camera);
}

function addLights() {
  const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
  scene.add(light);

  const directLight1 = new THREE.DirectionalLight(0xffd798, 0.8);
  directLight1.castShadow = true;
  directLight1.position.set(9.5, 8.2, 8.3);
  scene.add(directLight1);

  const directLight2 = new THREE.DirectionalLight(0xc9ceff, 0.5);
  directLight2.castShadow = true;
  directLight2.position.set(-15.8, 5.2, 8);
  scene.add(directLight2);
}

function drawSheep() {
      sheep = new Sheep();
      scene.add(sheep.group);
    }

    function drawCloud() {
      cloud = new Cloud();
      scene.add(cloud.group);
    }
    function drawCloud2() {
      scene.add(cloud.group);
    }

    function drawSky() {
      sky = new Sky();
      // sky.showNightSky(night);
      scene.add(sky.group);
    }

    function drawTorus() {
      torus = new Torus();
      // scene.add(torus.group);
    }

    function onResize() {
          width = window.innerWidth;
          height = window.innerHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }

        function onMouseDown(e) {
          // mouseDown = true;


        }
        function onTouchStart(event) {
          // const targetClass = event.target.classList[0];
          // if (targetClass === 'toggle' || targetClass === 'toggle-music') return;
          // event.preventDefault();
          mouseDown = true;
        }

        function onMouseUp() {
          // mouseDown = false;
        }
        function onTouchEnd(event) {
          // const targetClass = event.target.classList[0];
          // if (targetClass === 'toggle' || targetClass === 'toggle-music') return;
          // event.preventDefault();
          // mouseDown = false;
        }

    function rad(degrees) {
      return degrees * (Math.PI / 180);
    }

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

class Torus {
  constructor() {
    const partGeometry = new THREE.TorusGeometry(3, 0.4, 5);
    this.upperPart = new THREE.Mesh(partGeometry, new THREE.MeshStandardMaterial({
      color: 0xf1cd89,
      transparent: true,
      opacity: 0.5,
      roughness: 1,
      shading: THREE.FlatShading
    }));
    this.upperPart.name = '-----------------';
    this.upperPart.position.set(-6.5, 14, 0);
    this.upperPart.rotation.x = 0.3;
    this.upperPart.scale.set(0.25, 0.25, 0.25);

    scene.add(this.upperPart);

  }

}


class Sheep {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.y = 0.3;

    this.woolMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      shading: THREE.FlatShading
    });
    this.skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaf8b,
      roughness: 1,
      shading: THREE.FlatShading
    });
    this.darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4b4553,
      roughness: 1,
      shading: THREE.FlatShading
    });

    this.vAngle = 100;

    this.drawBody();
    this.drawHead();
    this.drawLegs();
  }
  drawBody() {
    const bodyGeometry = new THREE.IcosahedronGeometry(1.0, 0);
    const body = new THREE.Mesh(bodyGeometry, this.woolMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    this.group.add(body);
  }
  drawHead() {
    const head = new THREE.Group();
    head.position.set(0, 0.65, 1.6);
    head.rotation.x = rad(-20);
    this.group.add(head);

    const foreheadGeometry = new THREE.BoxGeometry(0.7, 0.6, 0.7);
    const forehead = new THREE.Mesh(foreheadGeometry, this.skinMaterial);
    forehead.castShadow = true;
    forehead.receiveShadow = true;
    forehead.position.y = -0.15;
    head.add(forehead);

    const faceGeometry = new THREE.CylinderGeometry(0.5, 0.15, 0.3, 4, 1);
    const face = new THREE.Mesh(faceGeometry, this.skinMaterial);
    face.castShadow = true;
    face.receiveShadow = true;
    face.position.y = -0.65;
    face.rotation.y = rad(45);
    head.add(face);

    const woolGeometry = new THREE.BoxGeometry(0.84, 0.36, 0.9);
    const wool = new THREE.Mesh(woolGeometry, this.woolMaterial);
    wool.position.set(0, 0.12, 0.07);
    wool.rotation.x = rad(20);
    head.add(wool);

    const rightEyeGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.06, 6);
    const rightEye = new THREE.Mesh(rightEyeGeometry, this.darkMaterial);
    rightEye.castShadow = true;
    rightEye.receiveShadow = true;
    rightEye.position.set(0.35, -0.38, 0.33);
    rightEye.rotation.set(rad(130.8), 0, rad(-45));
    head.add(rightEye);

    const leftEye = rightEye.clone();
    leftEye.position.x = -rightEye.position.x;
    leftEye.rotation.z = -rightEye.rotation.z;
    head.add(leftEye);

    const rightEarGeometry = new THREE.BoxGeometry(0.12, 0.5, 0.3);
    rightEarGeometry.translate(0, -0.25, 0);
    this.rightEar = new THREE.Mesh(rightEarGeometry, this.skinMaterial);
    this.rightEar.castShadow = true;
    this.rightEar.receiveShadow = true;
    this.rightEar.position.set(0.35, -0.12, -0.07);
    this.rightEar.rotation.set(rad(20), 0, rad(50));
    head.add(this.rightEar);

    this.leftEar = this.rightEar.clone();
    this.leftEar.position.x = -this.rightEar.position.x;
    this.leftEar.rotation.z = -this.rightEar.rotation.z;
    head.add(this.leftEar);
  }
  drawLegs() {
    const legGeometry = new THREE.CylinderGeometry(0.3, 0.15, 1, 4);
    legGeometry.translate(0, -0.5, 0);
    this.frontRightLeg = new THREE.Mesh(legGeometry, this.darkMaterial);
    this.frontRightLeg.castShadow = true;
    this.frontRightLeg.receiveShadow = true;
    this.frontRightLeg.position.set(0.7, -0.8, 0.5);
    this.frontRightLeg.rotation.x = rad(-12);
    this.group.add(this.frontRightLeg);

    this.frontLeftLeg = this.frontRightLeg.clone();
    this.frontLeftLeg.position.x = -this.frontRightLeg.position.x;
    this.frontLeftLeg.rotation.z = -this.frontRightLeg.rotation.z;
    this.group.add(this.frontLeftLeg);

    this.backRightLeg = this.frontRightLeg.clone();
    this.backRightLeg.position.z = -this.frontRightLeg.position.z;
    this.backRightLeg.rotation.x = -this.frontRightLeg.rotation.x;
    this.group.add(this.backRightLeg);

    this.backLeftLeg = this.frontLeftLeg.clone();
    this.backLeftLeg.position.z = -this.frontLeftLeg.position.z;
    this.backLeftLeg.rotation.x = -this.frontLeftLeg.rotation.x;
    this.group.add(this.backLeftLeg);
  }
  jump(speed) {
    // speed += 5.055;
    speed += 5.128;
    this.vAngle += speed/200;
    this.group.position.y = Math.sin(this.vAngle) * 3 + 3;
    // this.group.position.z = Math.sin(this.vAngle) + 1.38;

    const legRotation = Math.sin(this.vAngle) * Math.PI / 7 + 0.3;

    this.frontRightLeg.rotation.z = legRotation;
    this.backRightLeg.rotation.z = legRotation;
    this.frontLeftLeg.rotation.z = -legRotation;
    this.backLeftLeg.rotation.z = -legRotation;

    const earRotation = Math.sin(this.vAngle) * Math.PI / 3 + 1.5;

    this.rightEar.rotation.z = earRotation;
    this.leftEar.rotation.z = -earRotation;
  }
  jumpOnMouseDown() {
    if (mouseDown) {
      this.jump(speed_tail * 100);
    } else {
      if (this.group.position.y <= 0.3) return;
      this.jump(speed_tail * 100);
    }
  }
}

class Cloud {
  constructor() {
    this.group = new THREE.Group();
    // this.group.position.y = -2;
    this.group.scale.set(1.5, 1.5, 1.5);

    this.material = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 1,
      shading: THREE.FlatShading
    });

    this.vAngle = 0;

    // this.drawParts();


    this.group.traverse((part) => {
      part.castShadow = true;
      part.receiveShadow = true;
    });
  }

  grenerateCloud_long(tail_z_spawn) {

    const partGeometry = new THREE.BoxGeometry(3, 0.4, 5);
    this.upperPart = new THREE.Mesh(partGeometry, new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 1,
      shading: THREE.FlatShading
    }));
    this.upperPart.position.set(0, -1.8, tail_z_spawn);
    this.upperPart.scale.set(130, 1.5, 25);
    this.upperPart.name = 'tail'+name_num_tail;
    name_num_tail++;
    scene.add(this.upperPart);

  }

  grenerateCloud(tail_z_spawn) {

    const partGeometry = new THREE.BoxGeometry(3, 0.4, 5);
    this.upperPart = new THREE.Mesh(partGeometry, new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 1,
      shading: THREE.FlatShading
    }));
    var tmp_rand_num = rand(0,3);
    this.upperPart.position.set(choose_line[tmp_rand_num], -1.8, tail_z_spawn);
    this.upperPart.scale.set(1.5, 1.5, 1.5);
    this.upperPart.name = 'tail';
    name_num_tail++;
    scene.add(this.upperPart);
    if (rand(1,99) > 90) {

      const partGeometry2 = new THREE.TorusGeometry(3, 0.4, 5);
      this.upperPart = new THREE.Mesh(partGeometry2, new THREE.MeshStandardMaterial({
        color: 0xf1cd89,
        transparent: true,
        opacity: 0.5,
        roughness: 1,
        shading: THREE.FlatShading
      }));
      this.upperPart.position.set(choose_line[tmp_rand_num], 0, tail_z_spawn);
      this.upperPart.scale.set(3, 3, 3);
      this.upperPart.name = 'torus';
      name_num_tail++;
      scene.add(this.upperPart);
    }

  }
  removeCloud() {
    scene.remove(scene.children[4]);
  }
  moveCloud() {
    if (scene.children.length > 3) {
      for (var i = 0; i < scene.children.length; i++) {
        if (i>3) {
          scene.children[i].position.z -= speed_tail;
        }
      }
      scene.children[4].position.z += speed_tail-0.0009;
      // scene.children[4].position.z += speed_tail;
    }

  }
  drawParts() {
    const partGeometry = new THREE.BoxGeometry(3, 0.4, 5);
    this.upperPart = new THREE.Mesh(partGeometry, this.material);
    this.group.add(this.upperPart);

  }
  bend() {
    this.vAngle += 0.08;

  }
}

// class Sky {
//   constructor() {
//     this.group = new THREE.Group();
//
//     this.daySky = new THREE.Group();
//     this.nightSky = new THREE.Group();
//
//     this.group.add(this.daySky);
//     this.group.add(this.nightSky);
//
//     this.colors = {
//       day: [0xFFFFFF, 0xEFD2DA, 0xC1EDED, 0xCCC9DE],
//       night: [0x5DC7B5, 0xF8007E, 0xFFC363, 0xCDAAFD, 0xDDD7FE],
//     };
//
//     this.drawSky('day');
//     this.drawSky('night');
//     this.drawNightLights();
//   }
//   drawSky(phase) {
//     for (let i = 0; i < 30; i ++) {
//       const geometry = new THREE.IcosahedronGeometry(0.4, 0);
//       const material = new THREE.MeshStandardMaterial({
//         color: this.colors[phase][Math.floor(Math.random() * this.colors[phase].length)],
//         roughness: 1,
//         shading: THREE.FlatShading
//       });
//       const mesh = new THREE.Mesh(geometry, material);
//
//       mesh.position.set((Math.random() - 0.5) * 30,
//                          (Math.random() - 0.5) * 30,
//                          (Math.random() - 0.5) * 30);
//       if (phase === 'day') {
//         this.daySky.add(mesh);
//       } else {
//         this.nightSky.add(mesh);
//       }
//     }
//   }
//   drawNightLights() {
//     const geometry = new THREE.SphereGeometry(0.1, 5, 5);
//     const material = new THREE.MeshStandardMaterial({
//       color: 0xFF51B6,
//       roughness: 1,
//       shading: THREE.FlatShading
//     });
//
//     for (let i = 0; i < 3; i ++) {
//       const light = new THREE.PointLight(0xF55889, 2, 30);
//       const mesh = new THREE.Mesh(geometry, material);
//       light.add(mesh);
//
//       light.position.set((Math.random() - 2) * 6,
//                          (Math.random() - 2) * 6,
//                          (Math.random() - 2) * 6);
//       light.updateMatrix();
//       light.matrixAutoUpdate = false;
//
//       this.nightSky.add(light);
//     }
//   }
//   showNightSky(condition) {
//     if (condition) {
//       this.daySky.position.set(100, 100, 100);
//       this.nightSky.position.set(0, 0, 0);
//     } else {
//       this.daySky.position.set(0, 0, 0);
//       this.nightSky.position.set(100, 100, 100);
//     }
//   }
//   moveSky() {
//     this.group.rotation.x += 0.001;
//     this.group.rotation.y -= 0.004;
//   }
// }

const toggleBtn = document.querySelector('.toggle');
toggleBtn.addEventListener('click', toggleNight);

const worldMusic = document.querySelector('.world-music');
const btnMusic = document.querySelector('.toggle-music');
let playMusic = true;
btnMusic.addEventListener('click', toggleMusic);
worldMusic.volume = 0.9;
worldMusic.loop = true;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toggleNight() {
  night = !night;
  console.log('fuck');
  toggleBtn.classList.toggle('toggle-night');
  world.classList.toggle('world-night');
  if (localStorage['night'] == 'false') {
    localStorage['night'] = 'true';
  }else {
    localStorage['night'] = 'false';
  }
  console.log(localStorage['night']);
}

function toggleMusic() {
  playMusic = !playMusic;
  btnMusic.classList.toggle('music-off');
  if (localStorage['music'] == 'true') {
    localStorage['music'] = 'false';
  }else {
    localStorage['music'] = 'true';
  }
  if (playMusic) {
    worldMusic.play();
  }else {
    worldMusic.pause();
  }

}




init();
animate();

if (localStorage['score'] != "NaN") {
  $('.score span').text(localStorage['score'])
}else {
  localStorage['score'] = 0;
  $('.score span').text('0');
}

if (localStorage['night'] == 'true') {
  console.log(localStorage['night']);
  toggleBtn.classList.add('toggle-night');
  world.classList.add('world-night');
}else {
  console.log(localStorage['night']);
  toggleBtn.classList.remove('toggle-night');
  world.classList.remove('world-night');
}
