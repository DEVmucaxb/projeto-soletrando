//document.querySelector().focus; //usar depois

//Intial Data
let current_word = '';
let current_id = 0;
show_word();


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
        document.addEventListener('keyup', lp);
    };


    function write_letter_turn(e) {
        //remover o event listener imediatamente após o usuário digitar
        document.removeEventListener('keyup', lp);

        //substituir o '-' da div pela letra digitada
        console.log('O índice da letra clicada foi: ', letter_index)
        document.querySelector(`div[data-index="${letter_index}"]`).innerHTML = e;

        toggle_letter();
    };

    function toggle_letter() {
        //pular para a próxima div para continuar escrevendo
        if (letter_index < word_turn.word.length - 1) {
            console.log(`Pulou a letra de ${letter_index} para ${letter_index + 1}`)
            letter_index++;

            within();
        } else if (letter_index = word_turn.word.length) {
            console.log(`A letra não pode ser pulada pois é a ultima`);
        };
    };

};
