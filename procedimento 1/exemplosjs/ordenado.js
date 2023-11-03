const swap = (vetor, posicao1, posicao2) => {
    const novaPosicao = vetor[posicao1];
    vetor[posicao1] = vetor[posicao2];
    vetor[posicao2] = novaPosicao;
};

const shuffle = (vetor, quantidadeDeTrocas) => {
    const tamanhoDoVetor = vetor.length;
    for (let s = 0; s < quantidadeDeTrocas; s++) {
        const posicao1 = Math.floor(Math.random() * tamanhoDoVetor);
        const posicao2 = Math.floor(Math.random() * tamanhoDoVetor);
        const embaralhado = vetor[posicao1];
        vetor[posicao1] = vetor[posicao2];
        vetor[posicao2] = embaralhado
    }
};

const bubble_sort = (vetor) => {
    const tamanho = vetor.length;
    let ordena;
    do {
        ordena = false;
        for (let b = 0; b < tamanho - 1; b++) {
            if (vetor[b] > vetor[b + 1]) {
                [vetor[b], vetor[b + 1]] = 
                [vetor[b + 1], vetor[b]];
                ordena = true;
            }
        }
    } while (ordena);
    return vetor;
};

const selection_sort = (vetor) => {
    const tamanho = vetor.length;
    for (let i = 0; i < tamanho - 1; i++) {
        let indiceMenor = i;
        for (let j = i + 1; j < tamanho; j++) {
            if (vetor[j] < vetor[indiceMenor]) {
                indiceMenor = j;
            }
        }
        if (indiceMenor !== i) {
            [vetor[i], vetor[indiceMenor]] = 
            [vetor[indiceMenor], vetor[i]];
        }
    }
    return vetor;
};

const quick_sort = (vetor, inicio = 0, fim = vetor.length - 1) => {
    if (inicio < fim) {
        const indicePivo = particionamento(vetor, inicio, fim);
        quick_sort(vetor, inicio, indicePivo - 1);
        quick_sort(vetor, indicePivo + 1, fim);
    }
    return vetor;
};

const particionamento = (vetor, inicio, fim) => {
    const pivo = vetor[fim];
    let indicePivo = inicio;
    for (let i = inicio; i < fim; i++) {
        if (vetor[i] < pivo) {
            [vetor[i], vetor[indicePivo]] = [vetor[indicePivo], vetor[i]];
            indicePivo++;
        }
    }
    [vetor[indicePivo], vetor[fim]] = [vetor[fim], vetor[indicePivo]];
    
    return indicePivo;
};

function add() {
    const input = document.getElementById("valor");
    const lista = document.getElementById("valores");
    
    const node = document.createElement("li");
    const valor = document.createTextNode(input.value);
    node.appendChild(valor);
    lista.appendChild(node);
};

function ordenar() {
    const listaDeValores = document.getElementById("valores")
    const listaDeSelecao = document.getElementById("algoritmo");
    const vetor = Array.from(listaDeValores.children).map(item => parseInt(eval(item.innerHTML)));

    const selectedIndex = listaDeSelecao.selectedIndex;
    let algoritmo;

    switch (selectedIndex) {
        case 0:
            algoritmo = bubble_sort;
            break;
        case 1:
            algoritmo = selection_sort;
            break;
        case 2:
            algoritmo = quick_sort;
            break;
        default:
            algoritmo = bubble_sort;
    }

    algoritmo(vetor);

    const itensDaLista = vetor.map(item => `<li>${item}</li>`).reduce((acumulador, item) => acumulador + item);

    listaDeValores.innerHTML = itensDaLista;
};

function misturar() {
    const listaDeValores = document.getElementById("valores");
    const vetor = Array.from(listaDeValores.children).map(item => parseInt(eval(item.innerHTML)));

    shuffle(vetor, vetor.length * 2);

    const itensDaLista = vetor.map(item => `<li>${item}</li>`).reduce((acumulador, item) => acumulador + item);

    listaDeValores.innerHTML = itensDaLista;
};