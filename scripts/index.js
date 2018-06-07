var fadeSpeed = 200;

// Change bird image in button
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

// Fade out and load narrative page
function loadNarrative() {
    $("#container").fadeOut(1000, function() {
        location.href = "visual-narrative.html";
    });
}

// Fade in
$(document).ready(function() {
    $("#container").fadeIn(2000);
});
