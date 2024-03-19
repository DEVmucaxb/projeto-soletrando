function createWordDivs(word) {
    const wordContainer = document.getElementById('wordContainer');
    wordContainer.innerHTML = ''; // Limpa o conteúdo anterior, se houver

    // Cria uma div para cada letra da palavra
    for (let i = 0; i < word.length; i++) {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');
        letterDiv.textContent = '-';
        letterDiv.dataset.index = i; // Adiciona um atributo 'data-index' para identificar a posição da letra na palavra
        wordContainer.appendChild(letterDiv);
    }

    // Adiciona um evento de escuta de entrada para revelar as letras conforme o usuário digita
    document.addEventListener('keypress', function (event) {
        const key = event.key.toLowerCase();
        const letterDivs = wordContainer.querySelectorAll('.letter');
        letterDivs.forEach(div => {
            const index = parseInt(div.dataset.index);
            //parseInt(div.getAttribute('data-index'));

            if (word[index] === key && div.textContent === '-') {
                div.textContent = key;
                div.classList.add('revealed');
                setTimeout(() => {
                    div.classList.remove('revealed');
                }, 500);
            }
        });
    });
}

// Exemplo de uso
createWordDivs('ansioso');