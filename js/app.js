var backgroundColors = {
    "#calc-agua": "#4BD7FA",
    "#calc-energia": "#F0D838"
};
var fontColors = {
    "#calc-agua": "white",
    "#calc-energia": "rgb(119, 67, 67)"
};
var messages = {
    "fa-user-plus": "Quantas pessoas vivem na mesma casa que você ?",
    "fa-toilet": "Quantas descargas você utiliza em média por dia ?",
    "fa-shower": "Quantos minutos você gasta no chuveiro por vez ?",
    "fa-tshirt": "Quantas vezes você lava a roupa na semana ?"
};

$(document).ready(() => {
    $(".container > section").hide();
    $("#calc-agua").fadeIn();
    $("#question-container").hide();

    $(".menu > li").on("click", (evt) => {
        var hash = $(evt.currentTarget).children()[0].hash;
        $(".container > section").hide();
        $(hash).fadeIn();
        $('body').css('background-color', backgroundColors[hash]);
        $('body').css('color', fontColors[hash]);
    });

    $(".water-spent-icons").on("click", (evt) => {
        // CSS Stuff
        $(".water-spent-icons").removeClass("active");
        $(evt.currentTarget).addClass("active");
        
        // JS Actions
        $("#question-text").html(messages[evt.currentTarget.id]);
        $("#counter").val(0);
        $("#question-container").fadeIn();
    });

    $("#fa-plus").on("click", () => {
        $("#counter").val(parseInt($("#counter").val()) + 1);
    });

    $("#fa-minus").on("click", () => {
        const value = parseInt($("#counter").val());
        $("#counter").val( value === 0 ? 0 : value - 1);
    });
});