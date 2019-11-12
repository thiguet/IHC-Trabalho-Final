var backgroundColors = {
    "#calc-agua": "#4BD7FA",
    "#calc-energia": "#F0D838"
};
var fontColors = {
    "#calc-agua": "white",
    "#calc-energia": "rgb(119, 67, 67)"
};

$(document).ready(() => {
    $(".container > section").hide();
    $("#calc-agua").fadeIn();
    $(".menu > li > a").on("click", (evt) => {
        $(".container > section").hide();
        $(evt.currentTarget.hash).fadeIn();
        $('body').css('background-color', backgroundColors[evt.currentTarget.hash]);
        $('body').css('color', fontColors[evt.currentTarget.hash]);
    });
});