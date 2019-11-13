const WATER_MODE = 'water';
const ENERGY_MODE = 'energy';

// Initializer
const state = {
    "mode": WATER_MODE,
    "water": {
        "answers": {
            "fa-user-plus": 0,
            "fa-toilet": 0,
            "fa-shower": 0,
            "fa-tshirt": 0
        },
        "answersWeight": {
            "fa-user-plus": 0,
            "fa-toilet": 6,
            "fa-shower": 12,
            "fa-tshirt": 19
        },
        "selectedBtnId": ""
    },
    "energy": {
        "answers": {
            "fa-user-plus": 0,
            "fa-toilet": 0,
            "fa-shower": 0,
            "fa-tshirt": 0
        },
        "selectedBtnId": ""
    }
};

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
    "fa-toilet": "Quantas descargas você utiliza por dia ?",
    "fa-shower": "Quantos minutos você gasta no chuveiro ?",
    "fa-tshirt": "Quantas vezes você lava a roupa na semana ?"
};
var modes = {
    "#calc-agua": WATER_MODE,
    "#calc-energia": ENERGY_MODE
};
var resultMessages = {
    "success": "Seu consumo está dentro do limite!!",
    "error"  : "Seu consumo está acima do limite!"
};


$(document).ready(() => {
    $(".container > section").hide();
    $("#calc-agua").fadeIn();
    $("#title").html(headings['#calc-agua']);
    $("#question-container").removeClass('show');

    $(".menu > li").on("click", (evt) => {
        var hash = $(evt.currentTarget).children()[0].hash;
        
        $("#title").fadeIn();
        $("#title").html(headings[hash]);
        $(".container > section").hide();
        $(hash).fadeIn();

        $('body').css('background-color', backgroundColors[hash]);
        $('body').css('color', fontColors[hash]);
        closeMenu();

        setMode(hash);
    });

    $(".water-spent-icons").on("click", (evt) => {
        // CSS Stuff
        const btnId = evt.currentTarget.id;

        //$(evt.currentTarget).hasClass("active") &&
        if($("#question-container").hasClass('show') && btnId === state[state.mode].selectedBtnId) {
            $("#question-text").html('');

            $("#question-container").removeClass('show');
            
            if(getAnswerValue() === 0) 
               $(evt.currentTarget).removeClass("active");

            setSelectedBtn(null);
        } else { 
            $("#question-text").html(messages[btnId]);

            $("#question-container").addClass('show');
            $(evt.currentTarget).addClass("active");
            
                if(getAnswerValue() === 0)
                $('#' + state[state.mode].selectedBtnId).removeClass("active");

            setSelectedBtn(btnId);
            $("#counter").val(getAnswerValue());
        }
    });

    $("#fa-plus").on("click", () => {
        const nextValue = getAnswerValue() + 1;
        updateAnswer(nextValue);
        $("#counter").val(nextValue);
    });

    $("#fa-minus").on("click", () => {
        let nextValue = getAnswerValue() - 1;
        if( nextValue <= 0 || 
            Number.isNaN(nextValue))
            nextValue = 0;
        updateAnswer(nextValue);
        $("#counter").val(nextValue);
    });

    $("#collapse").on("click", () => {
        if($(".menu").hasClass("show"))
            $(".menu").removeClass('show');
        else 
            $(".menu").addClass('show');
    });

    $("article").on("click", closeMenu);

    $("#calcular-gastos-agua").on("click", () => {
        if($('#fa-user-plus').hasClass('active')) {
            if($('#fa-toilet, #fa-shower, #fa-tshirt').hasClass('active')) {
                $("body").css("background", "#ACFA69");
                $(".container > section").hide();
                $("#results").fadeIn();
                
                const spent = calculateWaterSpent();
                $("#resulted-value").html(spent + 'L');
                
                if(spent <= 110) {
                    $("#resultedMessage").html(resultMessages['success']);
                } else {
                    $("#resultedMessage").html(resultMessages['error']); 
                    $("#show-tips").show();      
                }
            } else {
                alert('Favor selecionar pelo menos um item a ser avaliado!');
            }
        } else {
            alert('Favor informar a quantidade de pessoas!');
        }

    });

    $("#show-tips").on("click", () => {
        $(".container > section").hide();
        $("#tips").fadeIn();
        $("#title").fadeOut();

    });


    $("#counter").on("change", (evt) => {
        const value = evt.currentTarget.value;
        updateAnswer(value);
    });  
});

const closeMenu = () => {
    if($(".menu").hasClass("show")) {
        $(".menu").removeClass('show');    
    }
};

const updateAnswer = (value) => {
    let val = parseInt(value);

    if(Number.isNaN(val))     
        val = 0;

    state[state.mode].answers[state[state.mode].selectedBtnId] = val;
};

const setMode = hash => {
    state.mode = modes[hash];
};

const getAnswerValue = () => {
    return state[state.mode].answers[state[state.mode].selectedBtnId]; 
}

const setSelectedBtn = (selectedBtnId) => {
    state[state.mode].selectedBtnId = selectedBtnId; 
}

const calculateWaterSpent = () => {
    const answers       = state[WATER_MODE].answers;
    const answersWeight = state[WATER_MODE].answersWeight;
    let amount = 0;

    Object.keys(answers).forEach(key => {
        amount += answers[key] * answersWeight[key];
    });

    amount *= answers['fa-user-plus'];
    return amount;
};