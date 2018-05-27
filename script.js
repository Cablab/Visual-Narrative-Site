var forward = true,
    imageNum = 0;
    isBusy = false;

var canvas         = document.getElementById('g');
    canvas.width   = $(document).width();
    canvas.height  = $(document).height();
var ctx            = canvas.getContext('2d');

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
images[0].src = 'http://golem-images.com/site/wp-content/uploads/2016/02/MALL-OF-MARKET-Ctre-ccl-Brazzaville-VUE-MAIL-CONTAINER-Mdf_FULL.jpg';
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

	loop();
}


$('#wrapper').click(function (e) {

	var r = this.getBoundingClientRect(),
		 x = e.clientX - r.left,
		 y = e.clientY - r.top;

	if (ctx.isPointInPath(circlePointer, x, y)) {
		opacity = 0;

		if (isBusy) return;
		isBusy = true;

		if (forward) {
			img = images[++imageNum];
		}
		else {
			img = images[--imageNum];
		}

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

var ballX = 400;
var ballY = 400;
var mouseX = 0;
var mouseY = 0;

//use `requestAnimationFrame` for the game loop
//so you stay sync with the browsers rendering
//makes it a smoother animation
function loop() {
	moveBall();
	requestAnimationFrame(loop);
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

	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
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