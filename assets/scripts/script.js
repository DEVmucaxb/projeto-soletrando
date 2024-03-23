//Intial Data
let current_word = '';
let current_id = 0;
let special_letters = ['arrowleft', 'arrowright', 'backspace', 'dead'];
let banned_letters = [
    'enter', 'alt', 'shift', 'control', 'capslock',
    '*', '+', '-', '.', '=', '-', '_', ':', ';', '/',
    '|', 'arrowup', 'arrowdown', 'insert', 'delete',
    'home', 'end', 'pageup', 'pagedown', 'numlock',
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
    'f9', 'f10', 'f11', 'f12', 'altgraph', 'contextmenu',
    'dead'
];

let changed_id = () => {
    let id = Number(document.querySelector('#input_id').value);

    if (id >= spell.length) {
        alert(`palavra não encontrada.`);
        id = null; //essa linha n funciona, consertar!
        return;

    } else {
        current_id = id;
        document.querySelector('section').style.display = 'block';
        document.body.style.backgroundColor = 'blue';

        console.log(spell[current_id].word)
        show_word();
    };
};

//Events
document.querySelector('#input_id').addEventListener('change', changed_id);

document.querySelector('#finish').addEventListener('click', finish);


//Functions
function show_word() {

    let word_turn = spell[current_id];
    const word_container = document.querySelector('#word-section');
    word_container.innerHTML = '';
    let letter_index; //<- armazenará o índice da div clicada

    //criar as div's filhas que armazenarão cada letra
    for (let i = 0; i < spell[current_id].word.length; i++) {
        const letter_div = document.createElement('div');
        letter_div.classList.add('letter');
        letter_div.textContent = '-';
        letter_div.dataset.index = i; //Adiciona um atributo "index"
        word_container.appendChild(letter_div);
    };

    document.querySelectorAll('.letter').forEach((item) => {
        item.addEventListener('click', (letter_i) => {
            console.log('Clicou em ', item)
            within();

            //pegar o indice da letra clicada
            letter_index = Number(letter_i.currentTarget.getAttribute('data-index'));
        });
    });

    const lp = (e) => {
        console.log(e.key)
        write_letter_turn(e.key.toLowerCase());
    }

    function within() {
        document.addEventListener('keydown', lp);
    };


    function write_letter_turn(e) {
        document.querySelector(`div.letter[data-index="${letter_index}"]`).classList.add('revealed');

        console.log(e)
        //remover o event listener imediatamente após o usuário digitar
        document.removeEventListener('keydown', lp);

        //substituir o '-' da div pela letra digitada
        console.log('O índice da letra clicada foi: ', letter_index)

        if (!banned_letters.includes(e) && isNaN(e)) {
            if (!special_letters.includes(e)) {
                document.querySelector(`div[data-index="${letter_index}"]`).innerHTML = e;

                toggle_letter();
            } else { //avançar, retroceder ou apagar a letra digitada
                console.log('seta clicada')

                if (e === 'arrowleft') {
                    if (letter_index !== 0) {
                        letter_index -= 2;
                        toggle_letter();
                    };
                } else if (e === 'arrowright') {
                    if (letter_index < word_turn.word.length - 1) {
                        toggle_letter();
                    };
                } else if (e === 'backspace') {
                    console.log('jjjj')
                    if (letter_index !== 0) {
                        document.querySelector(`div[data-index="${letter_index}"]`).innerHTML = '-';
                        letter_index--;
                    } else {
                        document.querySelector(`div[data-index="${letter_index}"]`).innerHTML = '-';
                    };
                } else if (e === 'dead') {
                    //letras com acentos...

                    // Mapear as teclas de atalho para as letras acentuadas correspondentes
                    const accentedLetters = {
                        'a': 'á', 'e': 'é', 'i': 'í', 'o': 'ó', 'u': 'ú',
                        'A': 'Á', 'E': 'É', 'I': 'Í', 'O': 'Ó', 'U': 'Ú'
                    };

                    const lastTypedLetter = letterDiv.textContent;

                    if (lastTypedLetter in accentedLetters) {
                        letterDiv.textContent = accentedLetters[lastTypedLetter];
                        toggle_letter();
                    }
                };
            };
        };

        //Para caso o usuário digitar uma letra inválida, pois o programa deve continuar sem dar erros.
        letter_index--;
        toggle_letter();
    };

    function toggle_letter() {
        //pular para a próxima div para continuar escrevendo
        if (letter_index < word_turn.word.length - 1) {
            console.log(`Pulou a letra de ${letter_index} para ${letter_index + 1}`)
            letter_index++;

            within();
        } else if (letter_index === word_turn.word.length - 1) {
            console.log(`A letra não pode ser pulada pois é a ultima`);
        };
    };

    function letter_animation(x) { //não consegui fazer
        x.classList.add('within');
        setTimeout(() => x.classList.remove('within'), 1000);
    };

};

function finish() {
    let word_turn = spell[current_id];
    let fin = document.querySelector('#finish').innerHTML;

    if (fin === 'checar') {

        //checar se a palavra digitada é a correta
        if (check_word() === true) {
            console.log('Acertou a palavra!');
            document.body.style.backgroundColor = 'green';
            document.querySelector('#s_correct').currrentTime = 0;
            document.querySelector('#s_correct').play();
            document.querySelector('section').style.display = 'none';
            document.querySelector('#finish').innerHTML = 'resetar';
        } else if (!check_word()) {
            console.log('errou a palavra');
            document.body.style.backgroundColor = 'red';
            document.querySelector('#s_wrong').currrentTime = 0;
            document.querySelector('#s_wrong').play();
            document.querySelector('section').style.display = 'none';
            document.querySelector('#finish').innerHTML = 'resetar';
        } else if (check_word() === 'incompleta') {
            alert('Digite em todos os espaços');
        };

    } else if (fin === 'resetar') {
        document.querySelector('section').style.display = 'block';
        document.body.style.backgroundColor = 'blue';
        current_id = document.querySelector('#input_id').value = null;

        document.querySelector('#word-section').innerHTML = '';
        document.querySelector('#finish').innerHTML = 'checar';
    };

    function check_word() {
        let letters = [];
        let l = document.querySelectorAll('.letter').forEach((item) => {
            letters.push(item.textContent);
        }); //Ok

        console.log('checou', letters)

        for (let i in letters) {

            if (letters[i] === '-') {
                return 'incompleta';
            };
        };

        for (let i in letters) {
            console.log('checagem: ', letters[i], word_turn.word[i])

            if (letters[i] !== word_turn.word[i]) {
                return false; //errou a palavra
            };
        };

        return true; //acertou a palavra
    };

};
