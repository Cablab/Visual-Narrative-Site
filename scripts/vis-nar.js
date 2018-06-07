const canvas = document.getElementById('g');
const c = canvas.getContext('2d');

var size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}

var mouse = {
  position: new Victor( innerWidth / 2, innerHeight / 2 )
};

canvas.width = size.width;
canvas.height = size.height;
var center = new Victor( size.width / 2 ,size.height / 2 );

var birdImg = document.getElementById('bird');

function getDistance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt( Math.pow(xDist, 2) + Math.pow(yDist, 2) );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Victor.prototype.limitMagnitude = function (max) {

  if (this.length() > max) {
    this.normalize();
    this.multiply({x:max,y:max});
  }

};

var maxBoids = 2;
var radius = 10;
var speedIndex = 2;
var mouseSeek = true;
var walls = false;
var collisions = false;
var mobile = false;

var boids = [];

function createBoids() {
  for (var i = 0; i < maxBoids; i++) {

    var x = Math.ceil(Math.random()* ( size.width - ( radius * 2 ) ) ) + ( radius );
    var y = Math.ceil(Math.random()* ( size.height - ( radius * 2 ) ) ) + ( radius );

    boids.push( new Boid( {
      id: i,
      x: x,
      y: y,
      speedIndex: speedIndex,
      radius: radius,
    } ) );
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Calc elapsed time since last loop
  now = Date.now();
  elapsed = now - then;

  // FPS Reporting
  fpsReport++;
  if (fpsReport > 60) {
    fpsReport = 0;
  }

  // If enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
      // Drawing Code
      c.clearRect(0, 0, canvas.width, canvas.height);
      // Update all boids
      for (var i = 0; i < boids.length; i++ ) {
        boids[i].update();
      }
  }
}

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;
var fpsReport = 58;

function startAnimating() {
  if(fps == null) { var fps = 60; }
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

createBoids();
startAnimating();

addEventListener('mousemove', function(event){
  mouse.position.x = event.clientX;
  mouse.position.y = event.clientY;
});

addEventListener('resize', function(){
  size.width = innerWidth;
  size.height = innerHeight;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  center.x = size.width/ 2;
  center.y = size.height / 2;
});

addEventListener('mousedown', function(event){
	if (!$("#g").parent().children().is(':animated')) {
		boids.push( new Boid( {
			id: boids.length,
			x: event.clientX,
			y: event.clientY,
			speedIndex: speedIndex,
			radius: radius,
		}));
	}
	return false;
});

// Create images
var count = 10;
var image = new Image();
var image2 = new Image();
var	image3 = new Image();
var	image4 = new Image();
var	image5 = new Image();
var	image6 = new Image();
var	image7 = new Image();
var	image8 = new Image();
var	image9 = new Image();
var image10 = new Image();

 // Display first image on load
image.onload = handleLoad;

// Store images and define sources
var images = [image, image2, image3, image4, image5, image6, image7, image8, image9, image10];
images[0].src = 'https://i.pinimg.com/originals/a2/c7/b2/a2c7b2bdf9c2c33b42e45e5bf7a8bbcd.jpg';
images[1].src = 'https://upload.wikimedia.org/wikipedia/commons/3/34/Monument_de_la_r%C3%A9unification_Yaound%C3%A9_03.JPG';
images[2].src = 'https://www.presidential-aviation.com/wp-content/uploads/page/Lagos-Island.jpg';
images[3].src = 'https://artwolfe.com/wp-content/uploads/2014/11/MALI0711020021.jpg';
images[4].src = 'http://www.hotelroomsearch.net/im/city/marrakech-morocco-0.jpg';
images[5].src = 'https://d15gqlu8dfiqiu.cloudfront.net/s3fs-public/styles/banner/public/images/chapters/Barcelona_travel_massive.jpg';
images[6].src = 'https://www.secretflying.com/wp-content/uploads/2015/07/paris-1.jpg';
images[7].src = 'https://api.services.trvl.com/backgrounds/images/italy_1.jpg';
images[8].src = 'https://i.ytimg.com/vi/pCc1OQLxgpc/maxresdefault.jpg';
images[9].src = 'http://www.inventiveleads.com/wp-content/uploads/2017/07/69303659-sweden-wallpapers.jpg';

// Define sounds
var sounds = {
	0: new Howl({
		src: ['sounds/congo.mp3'],
		loop: true,
		volume: 0.0
	}),
	1: new Howl({
		src: ['sounds/cameroon.mp3'],
		loop: true,
		volume: 0.5
	}),
	2: new Howl({
		src: ['sounds/nigeria.mp3'],
		loop: true,
		volume: 0.0
	}),
	3: new Howl({
		src: ['sounds/mali.mp3'],
		loop: true,
		volume: 0.0
	}),
	4: new Howl({
		src: ['sounds/morocco.mp3'],
		loop: true,
		volume: 0.0
	}),
	5: new Howl({
		src: ['sounds/spain.mp3'],
		loop: true,
		volume: 0.0
	}),
	6: new Howl({
		src: ['sounds/france.mp3'],
		loop: true,
		volume: 0.0
	}),
	7: new Howl({
		src: ['sounds/italy.mp3'],
		loop: true,
		volume: 0.0
	}),
	8: new Howl({
		src: ['sounds/czech-republic.mp3'],
		loop: true,
		volume: 0.0
	}),
	9: new Howl({
		src: ['sounds/sweden.mp3'],
		loop: true,
		volume: 0.0
	})
};

// Draw the first image
function handleLoad() {
    count--;
    if (count === 0) {
		c.drawImage(image, 0, 0, c.canvas.width, c.canvas.height);
    }
};

// Globals
var forward = true;
var imageNum = 0;
var img = images[0];

/**
 * Change background image and song - Go to new "destination"
 */
$("#g").click(function() {
	// Disallow clicks during transition
	if (!$(this).parent().children().is(':animated')) {

		// If on return trip, go back to index page
		if (!forward && imageNum === 0) {
			$("#wrapper").fadeOut(1000, function () {
				location.href = "index.html";
			});
		}

		// Fade current song and change cursor to blend into boids
		sounds[imageNum].fade(1.0, 0.0, 2000);
		$("*").css("cursor", "url('images/bird-flying-icon.png'), default");

		// Fade current image/song into next image/song
		$("#picture").fadeOut(1500, function() {
			
			img = forward ? images[++imageNum] : images[--imageNum];
			$("#picture").attr("src", img.src.toString());

			$("#picture").fadeIn(1500, function() {
				$("*").css("cursor", "pointer");
			});

			sounds[imageNum].play();
			sounds[imageNum].fade(0.0, 1.0, 2000);

			// Stop last song
			setTimeout(function() {
				if (forward) { sounds[imageNum - 1].stop(); }
				else { sounds[imageNum + 1].stop(); }
			}, 500);
		});

		// Trip direction
		if (imageNum === 9) forward = false;
		if (imageNum === 0) forward = true;
	}
	return false; // Do nothing if transition is still going
});

/**
 * Handle page load
 */
$(document).ready(function() {
	$("#wrapper").fadeIn(2000, function() {
		sounds[0].play();
		sounds[0].fade(0.0, 1.0, 2000);
	});

	$("*").css("cursor", "pointer");
});
