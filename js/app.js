var backgroundColors = {
    "#calc-agua": "#4BD7FA",
    "#calc-energia": "#F0D838",
    "#about": "#ACFA69"
};
var fontColors = {
    "#calc-agua": "white",
    "#calc-energia": "rgb(119, 67, 67)",
    "#about": "white"
};
var headings = {
    "#calc-agua": "Calculadora de Água",
    "#calc-energia": "Calculadora de Energia",
    "#about": "EcoMoney"
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
    $("#title").html(headings['#calc-agua']);
    $("#question-container").removeClass('show');

    $(".menu > li").on("click", (evt) => {
        var hash = $(evt.currentTarget).children()[0].hash;
        
        $("#title").html(headings[hash]);
        $(".container > section").hide();
        $(hash).fadeIn();
        $('body').css('background-color', backgroundColors[hash]);
        $('body').css('color', fontColors[hash]);
    });

    $(".water-spent-icons").on("click", (evt) => {
        // CSS Stuff
        if($(evt.currentTarget).hasClass("active")) {
            $("#question-text").html('');
            $("#question-container").removeClass('show');
            $(evt.currentTarget).removeClass("active");
        } else { 
            $("#question-text").html(messages[evt.currentTarget.id]);
            $("#question-container").addClass('show');
            $(evt.currentTarget).addClass("active");
        }
        
        // JS Actions
        if($("#question-container").hasClass("show") && !$(".water-spent-icons").hasClass('active')) {
        } else {
        }

        $("#counter").val(0);
    });

    $("#fa-plus").on("click", () => {
        $("#counter").val(parseInt($("#counter").val()) + 1);
    });

    $("#fa-minus").on("click", () => {
        const value = parseInt($("#counter").val());
        $("#counter").val( value === 0 ? 0 : value - 1);
    });

    $("#collapse").on("click", () => {
        if($(".menu").hasClass("show"))
            $(".menu").removeClass('show');
        else 
            $(".menu").addClass('show');
    });
});