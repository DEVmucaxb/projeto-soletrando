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
        write_letter_turn(e);
    }

    function within() {
        document.addEventListener('keyup', lp);
    };


    function write_letter_turn(e) {
        //remover o event listener imediatamente após o usuário digitar
        document.removeEventListener('keyup', lp);

        //substituir o '-' da div pela letra digitada
        document.querySelector(`div[data-index="${letter_index}"]`).innerHTML = e.key;
        console.log('O índice da letra clicada foi: ', letter_index)
    };

};
