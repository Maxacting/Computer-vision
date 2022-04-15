var net;
var video;
var currentResult;
var img, img2;
var rotation = 0.0;

function setup() {
  createCanvas(800, 600);

  video = createCapture(VIDEO);
  
  // The line below + the videoLoadedCallback were added 
  // after the video was shot to fix compability issues.
  video.elt.addEventListener('loadeddata', videoLoadedCallback);
  
  video.size(800, 600);
  video.hide();

  img = loadImage("coupe affro.png");
  img2 = loadImage("Moustache mexico.png");
}

function draw() {
  background(255);
  image(video, 0, 0, 800, 600);
  
  if (currentResult) {
    var nose = currentResult.keypoints[0].position;
    var eye1 = currentResult.keypoints[1].position;
    var eye2 = currentResult.keypoints[2].position;

    var scale = (eye1.x - eye2.x) / 250;
    
    var nose = currentResult.keypoints[0].position;
    var ear1 = currentResult.keypoints[3].position;
    var ear2 = currentResult.keypoints[4].position;

    var scale2 = (ear1.x - ear2.x) / 250;

    image(img,
      nose.x - 600 * scale,
      nose.y - 1000 * scale,
      img.width * 1.2 * scale,
      img.height * 1.2 * scale);
    
    image(img2,
      nose.x - 70 * scale2,
      nose.y - 1 * scale2,
      img2.width * 0.2 * scale2,
      img2.height * 0.2 * scale2);
  }
}

// The new callback
function videoLoadedCallback() {
  print("Video Loaded");
  posenet.load().then(loadedCallback);
}

function loadedCallback(model) {
  print("Model loaded!");
  net = model;
  net.estimateSinglePose(video.elt).then(estimateCallback);
}

function estimateCallback(result) {
  currentResult = result;
  net.estimateSinglePose(video.elt).then(estimateCallback);
}
