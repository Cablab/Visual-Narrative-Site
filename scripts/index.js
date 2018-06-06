var fadeSpeed = 200;

$("#button").hover(function() {
    $("#bird").fadeOut(fadeSpeed, function () {
        $(this).attr("src", "images/bird-flap.png");
        $(this).fadeIn(fadeSpeed);
    }); 
}, function() {
    $("#bird").fadeOut(fadeSpeed, function () {
        $(this).attr("src", "images/bird-standing.png");
        $(this).fadeIn(fadeSpeed);
    }); 
});

function loadNarrative() {
    $("#container").fadeOut(1000, function() {
        location.href = "visual-narrative.html";
    });
}
