var forward = true,
    imageNum = 0;
    isBusy = false;

var canvas         = document.getElementById('g');
    canvas.width   = $(document).width();
    canvas.height  = $(document).height();
var ctx            = canvas.getContext('2d');

var birds = [];

var GameState = {
  STOPPED : 0,
  RUNNING : 1
};

var currentGameState = GameState.RUNNING;
var DEG_TO_RADIANS = Math.PI/180;
var neighborhoodRadius = 50;

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

var count = 10;
var image = new Image();
var image2 = new Image();
var image3 = new Image();
var image4 = new Image();
var image5 = new Image();
var image6 = new Image();
var image7 = new Image();
var image8 = new Image();
var image9 = new Image();
var image10 = new Image();

image.onload = image2.onload = image3.onload = image4.onload = image5.onload = image6.onload = image7.onload = image8.onload = image9.onload = image10.onload = handleLoad;
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

var circle = new Path2D();
var circlePointer = circle;
var img = images[0];
var opacity = 1;

function handleLoad() {
    count--;
    if (count === 0) {
		ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
};

window.onload = function() {
	circle.arc(Math.floor(100 + (Math.random() * (ctx.canvas.width - 300))), 100 + (Math.floor(Math.random() * (ctx.canvas.height - 200))), 25, 0, 2 * Math.PI);
	ctx.lineWidth = 8;
	ctx.stroke(circle);
	ctx.fillStyle = "white";
	ctx.fill(circle);

	document.getElementById("g").onmousemove = mouseMove;
    //Creating birds
    for (var i = 0; i < 10; i++) {
      var bird = new Bird(30*i,30*i+200);
      bird.rotation = 90 * DEG_TO_RADIANS;
      if (i % 2 == 0) {
        bird.color = "#ef2864";
      } else {
        bird.color = "#56d2ff";
      }
      var velocity = new Vector2();
      velocity.x = 1;
      bird.velocity = velocity;
      birds.push(bird);
    }
}

window.requestAnimationFrame(loop);

/*
$('#wrapper').click(function (e) {

	var r = this.getBoundingClientRect(),
		 x = e.clientX - r.left,
		 y = e.clientY - r.top;

	if (ctx.isPointInPath(circlePointer, x, y)) {
		opacity = 0;

		if (isBusy) return;
		isBusy = true;

		sounds[imageNum].fade(1.0, 0.0, 3000);

		img = forward? images[++imageNum] : images[--imageNum];

		setTimeout(function () {
			sounds[imageNum].play();
			sounds[imageNum].fade(0.0, 1.0, 3000);
		}, 2500);

		(function fadeIn() {
			ctx.globalAlpha = opacity;
			ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
			opacity += 0.003; // Changes how fast/slow the images and circle fade in and out
			if (opacity < 1)
				requestAnimationFrame(fadeIn);
			else {
				isBusy = false;
				var newCircle = new Path2D();
				newCircle.arc(Math.floor(100 + (Math.random() * (ctx.canvas.width - 300))), 100 + (Math.floor(Math.random() * (ctx.canvas.height - 200))), 25, 0, 2 * Math.PI);
				ctx.stroke(newCircle);
				ctx.fill(newCircle);
				circlePointer = newCircle;
				opacity = 1;
			}
		})();

		if (imageNum === 0) {
			forward = true
		}
		if (imageNum === 9) {
			forward = false;
		}
	}
});
*/
var ballX = 400;
var ballY = 400;
var mouseX = 0;
var mouseY = 0;

function loop() {

    updateBirds();

    requestAnimationFrame(loop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBirds();

}

function mouseMove(evt) {
	mouseX = evt.clientX;
	mouseY = evt.clientY;
}

function moveBall() {
	//get the distance between the mouse and the ball on both axes
	//walk only the an eight of the distance to create a smooth fadeout
	var dx = (mouseX - ballX) * .125;
	var dy = (mouseY - ballY) * .125;
	//calculate the distance this would move ...
	var distance = Math.sqrt(dx * dx + dy * dy);
	//... and cap it at 5px
	if (distance > 5) {
		dx *= 5 / distance;
		dy *= 5 / distance;
	}

	//now move
	ballX += dx;
	ballY += dy;
	if (opacity === 1) {
		ctx.strokeStyle = "black";
		ctx.stroke(circlePointer);
		ctx.fillStyle = "white";
		ctx.fill(circlePointer);
	}


	ctx.beginPath();
	ctx.arc(ballX, ballY, 40, 0, 2 * Math.PI);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.lineWidth = 5;
	ctx.strokeStyle = "red";
    ctx.stroke();
}

function updateBirds() {
  for (var i = 0; i < birds.length; i++) {
    var b = birds[i];
    tagNeighbors(b);
    b.update();
  }
}

function drawBirds () {
  //Draw birds
  for (var i = 0; i < birds.length; i++) {
    var b = birds[i];
    b.draw();
  }
}

//Tags all neighbors of a bird
function tagNeighbors(bird) {
  for (var i = 0; i < birds.length; i++) {
    var other = birds[i];
    var sqrDist = Math.pow(bird.position.x - other.position.x,2) + Math.pow(bird.position.y - other.position.y, 2);
    if (birds != other && sqrDist <= neighborhoodRadius * neighborhoodRadius) {
      other.tag = true;
    }
  }
}

var Vector2 = function() {
  this.x = 0;
  this.y = 0;
  this.GetMagnitude = function () {return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y,2));};
};

Vector2.prototype.Add = function(other) {
  this.x += other.x;
  this.y += other.y;
};

Vector2.prototype.Normalize = function() {
  var mag = this.GetMagnitude();
  this.x = this.x/mag;
  this.y = this.y/mag;
};

var Bird = function(x, y) {
  this.color = "#56d2ff";
  this.position = new Vector2();
  this.position.x = x;
  this.position.y = y;
  this.velocity = new Vector2();
  this.rotation = 0;
  this.tag = false;
};

Bird.prototype.update = function() {
  var steeringForce = new Vector2();
  for (var i=0; i < birds.length; i++) {
    if (birds[i].tag == true) {
      //Bird is within neighborhood
      var toAgent = new Vector2();
      toAgent.x = this.position.x - birds[i].position.x;
      toAgent.y = this.position.y - birds[i].position.y;
      toAgent.Normalize();
      var temp = new Vector2();
      temp.x = toAgent.x / toAgent.GetMagnitude();
      temp.y = toAgent.y / toAgent.GetMagnitude();
      steeringForce.Add(temp);
    }
  }

  //translate steeringForce into world space for velocity
  //this.velocity.Add(steeringForce);

  this.position.Add(this.velocity);
};

Bird.prototype.draw = function() {
  ctx.save();
  //Move to location
  ctx.translate(this.position.x, this.position.y);
  //Rotate to rotation
  ctx.rotate(this.rotation);
  //Draw bird shape
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(15, 40);
  ctx.lineTo(0, 35);
  ctx.lineTo(-15, 40);
  ctx.lineTo(0, 0);
  //Fill with bird color
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.stroke();
  //Restore coordinate system
  ctx.restore();
};

// document.getElementById("g").addEventListener("click", function() {
// 	document.getElementById("picture").setAttribute("src", images[++imageNum].src.toString());
// })

$("#g").click(function() {
	
	sounds[imageNum].fade(1.0, 0.0, 2000);
	$("*").css("cursor", "url('images/bird-flying-icon.png'), default");

	$("#picture").fadeOut(1500, function() {
		img = forward ? images[++imageNum] : images[--imageNum];
		$("#picture").attr("src", img.src.toString());
		$("#picture").fadeIn(1500, function() {
			$("*").css("cursor", "pointer");
		});
		sounds[imageNum].play();
		sounds[imageNum].fade(0.0, 1.0, 2000);
		setTimeout(function() {
			if (forward) { sounds[imageNum - 1].stop(); }
			else { sounds[imageNum + 1].stop(); }
		}, 500);
	});

	if (imageNum === 9) forward = false;
	if (imageNum === 0) forward = true;
})

$(document).ready(function() {
	$("#wrapper").fadeIn(2000, function() {
		sounds[0].play();
		sounds[0].fade(0.0, 1.0, 2000);
	});
	
	$("*").css("cursor", "pointer");
});
