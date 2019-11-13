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
            "fa-thermometer-empty": 0,
            "fa-shower-energy" : 0,
            "fa-dice-four": 0,
            "fa-tv": 0
        },
        "answersWeight": {
            "fa-thermometer-empty": 42,
            "fa-shower-energy" : 2.2,
            "fa-dice-four": 0.75,
            "fa-tv": 305
        },
        "selectedBtnId": ""
    }
};

var backgroundColors = {
    "#calc-agua": "#4BD7FA",
    "#calc-energia": "#F0D838",
};
var fontColors = {
    "#calc-agua": "white",
    "#calc-energia": "rgb(119, 67, 67)",
};
var headings = {
    "#calc-agua": "Calculadora de Água",
    "#calc-energia": "Calculadora de Energia",
};
var messages = {
    "fa-user-plus": "Quantas pessoas vivem na mesma casa que você ?",
    "fa-toilet": "Quantas descargas você utiliza por dia ?",
    "fa-shower": "Quantos minutos você gasta no chuveiro ?",
    "fa-tshirt": "Quantas vezes você lava a roupa na semana ?",
    "fa-thermometer-empty": "Quantas horas por dia o ar condicionado esta ligado?",
    "fa-shower-energy": "Quantos minutos por dia o chuveiro elétrico esta ligado ?",
    "fa-dice-four" : "Quantos minutos por dia o cooktop elétrico esta ligado?",
    "fa-tv": "Quantos dispositivos se encontram no modo stand-by quando não usados? Ex: Televisão, microondas, geladeira"
};
var suggestion = {
    "fa-toilet": "Diminua o numero de acionamento da descarga",
    "fa-shower": "Diminua o tempo de banho",
    "fa-tshirt": "Tente lavar uma maior quantidade de roupa por vez, para diminuir número de lavagens",
    "fa-thermometer-empty": "Diminua o tempo de uso do ar condicionado",
    "fa-shower-energy": "Diminua o tempo de banho",
    "fa-dice-four" : "Diminua o tempo com o cooktop ligado",
    "fa-tv": "Desligue os aparelhos da tomada, quando não utilizados"
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
        
        $("#title, #calcular-gastos, #title").fadeIn();
        $("#title").html(headings[hash]);
        $(".container > section").hide();
        $(hash).fadeIn();

        $('body').css('background-color', backgroundColors[hash]);
        $('body').css('color', fontColors[hash]);
        closeMenu();

        setMode(hash);
    });

    $(".water-spent-icons, .energy-spent-icons").on("click", (evt) => {
        // CSS Stuff
        const btnId = evt.currentTarget.id;

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

    $("#calcular-gastos").on("click", () => {
        
        if(state.mode === WATER_MODE) {
            if($('#fa-user-plus').hasClass('active')) {
                if($('#fa-toilet, #fa-shower, #fa-tshirt').hasClass('active')) {
                    showResults();
                } else {
                    alert('Favor selecionar pelo menos um item a ser avaliado!');
                }
            }  else {
                alert('Favor informar a quantidade de pessoas!');
            } 
        } else if(state.mode === ENERGY_MODE) {
                if($('#fa-thermometer-empty, #fa-shower-energy, #fa-dice-four, #fa-tv').hasClass('active')) {
                    showResults();
                } else {
                    alert('Favor selecionar pelo menos um item a ser avaliado!');
                } 
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

const showResults = () => {
    $("body").css("background", "#19E36D");
    $("body").css("color", "white");
    $(".container > section, #calcular-gastos, #title").hide();
    $("#question-container").removeClass("show");
    $("#results").fadeIn();
    
    const waterSpent = calculateWaterSpent();
    $("#resulted-water-value").html(waterSpent + ' L');
    
    if(waterSpent <= 110) {
        $("#resultedMessage").html(resultMessages['success']);
    } else {
        $("#resultedMessage").html(resultMessages['error']); 
        $("#show-tips").show();      
    }

    const energySpent = calculateEnergySpent();
    $("#resulted-energy-value").html(energySpent + ' kWh');

    if(energySpent <= 250) {
        $("#resultedMessage").html(resultMessages['success']);
    } else {
        $("#resultedMessage").html(resultMessages['error']); 
        $("#show-tips").show();      
    }
};

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
    let maior = 0;
    let amount = 0;

    Object.keys(answers).forEach(key => {
        amount += answers[key] * answersWeight[key];
        if(maior <= answers[key] * answersWeight[key]){
            $("#suggestion-water-text").html(suggestion[key]);
        }
    });

    amount *= answers['fa-user-plus'];
    return amount;
};

const calculateEnergySpent = () => {
    const answers       = state[ENERGY_MODE].answers;
    const answersWeight = state[ENERGY_MODE].answersWeight;
    let maior = 0;
    let amount = 0; 

    Object.keys(answers).forEach(key => {
        amount += answers[key] * answersWeight[key];
        if(maior <= answers[key] * answersWeight[key]){
            $("#suggestion-energy-text").html(suggestion[key]);
        }
    });

    return amount;
};