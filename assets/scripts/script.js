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

    //criar as div's filhas que armazenarão cada letra
    for (let i = 0; i < spell[current_id].word.length; i++) {
        const letter_div = document.createElement('div');
        letter_div.classList.add('letter');
        letter_div.textContent = '-';
        letter_div.dataset.index = i; //Adiciona um atributo
        word_container.appendChild(letter_div);
    };

    document.querySelectorAll('.letter').forEach((item) => {
        item.addEventListener('click', () => {
            console.log('Clicou em ', item)
            within();
        });
    });

    function within() {
        document.addEventListener('keyup', (e) => {
            console.log(e.key)
            write_letter_turn(e);
        });
    };


    function write_letter_turn() {
        //remover o event listener imediatamente após o usuário digitar
        document.removeEventListener('keyup', within);
    };

};
