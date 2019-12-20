let mesh;
let camera;
let scene;
let renderer;
let effect;
let helper;
let context;
let source;
let controls;
let marker;
let audio;
let ready = false;
let clock = new THREE.Clock();

init();
// renderScene();

function init() {
  //three.jsの設定

  //シーンの新規作成
  scene = new THREE.Scene();
  //レンダーの設定
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = "absolute";
  document.body.appendChild(renderer.domElement);
  effect = new THREE.OutlineEffect(renderer);

  //cameraの作成
  camera = new THREE.Camera();
  scene.add(camera);

  //Lightの作成
  let light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 1, 0);
  scene.add(light);

  //リサイズ関数
  function onResize() {
    source.onResizeElement();
    source.copyElementSizeTo(renderer.domElement);

    if (context.arController !== null) {
      source.copyElementSizeTo(context.arController.canvas);
    }
  }

  //マーカートラッキングの設定
  source = new THREEx.ArToolkitSource({
    sourceType: "webcam"
  });
  source.init(function onReady() {
    onResize();
  });

  //arToolkitContext(カメラparametaer,マーカー検出設定)
  context = new THREEx.ArToolkitContext({
    debug: false,
    cameraParametersUrl:
      THREEx.ArToolkitContext.baseURL + "../data/data/camera_para.dat",
    detectionMode: "mono",
    imageSmoothingEnabled: true,
    maxDetectionRate: 60,
    canvasWidth: source.parameters.sourceWidth
  });

  context.init(function onCompleted() {
    camera.projectionMatrix.copy(context.getProjectionMatrix());
  });

  //リサイズ処理
  window.addEventListener("resize", function() {
    onResize();
  });

  //マーカーの設定
  marker = new THREE.Group();
  controls = new THREEx.ArMarkerControls(context, marker, {
    type: "pattern",
    patternUrl: "./marker/pattern-marker.patt"
  });
  scene.add(marker);

  // mmd
  function onProgress(xhr) {
    if (xhr.lengthComputable) {
      let percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(Math.round(percentComplete, 2) + "% downloaded");
    }
  }

  // pmd, vmd ファイル
  const modelFile = "./mmd/pmd/輝夜月.pmx";
  const vmdFiles = ["./mmd/vmd/シャルルモーション.vmd"];

  // Music ファイル
  const audioFile = "./music/シャルル　歌ってみたのはメガテラ･ゼロ.mp3";
  let audioParams = { delayTime: 0 };

  helper = new THREE.MMDAnimationHelper({
    afterglow: 2.0
  });

  new THREE.MMDLoader().loadWithAnimation(
    modelFile,
    vmdFiles,
    function(mmd) {
      mesh = mmd.mesh;

      let model = new THREE.Object3D();
      // Scaleの変換
      model.scale.x = 0.1;
      model.scale.y = 0.1;
      model.scale.z = 0.1;
      model.add(mesh);
      helper.add(mesh, {
        animation: mmd.animation,
        physics: true
      });

      //add マーカー
      marker.add(model);

      //音楽
      new THREE.AudioLoader().load(audioFile, function(buffer) {
        let listener = new THREE.AudioListener();
        let audio = new THREE.Audio(listener).setBuffer(buffer);

        listener.position.z = 1;

        helper.add(audio, audioParams);
        marker.add(listener);

        ready = true;
      });
    },
    onProgress
  );
}

//レンダリング
setInterval(function() {
  if (source.ready === false) {
    return;
  }

  if (ready) {
    helper.update(clock.getDelta());
  }

  renderer.render(scene, camera);
  context.update(source.domElement);
}, 1000 / 60);
