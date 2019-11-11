$(document).ready(() => {
    $(".container > section").css('display', 'none');
    $("#calc-agua").css('display', 'flex');
    $(".menu > li > a").on("click", (evt) => {
        $(".container > section").css('display', 'none');
        $(evt.currentTarget.hash).css('display', 'flex');
    });
});