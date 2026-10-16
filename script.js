let catequizandos =
JSON.parse(
localStorage.getItem("catequizandos")
) || [];

function salvar(){

    localStorage.setItem(
        "catequizandos",
        JSON.stringify(catequizandos)
    );
}

function adicionarCatequizando(){

    const nome =
    document.getElementById("nome")
    .value
    .trim();

    if(!nome){

        alert("Digite o nome.");
        return;
    }

    catequizandos.push({

        nome,
        presencas:0,
        faltas:0

    });

    document.getElementById("nome")
    .value = "";

    salvar();

    renderizar();
}

function calcularFrequencia(aluno){

    const total =
    aluno.presencas +
    aluno.faltas;

    if(total === 0){

        return 0;
    }

    return (
        aluno.presencas /
        total
    ) * 100;
}

function registrarPresenca(index){

    catequizandos[index]
    .presencas++;

    salvar();

    renderizar();
}

function registrarFalta(index){

    catequizandos[index]
    .faltas++;

    salvar();

    renderizar();
}

function excluirCatequizando(index){

    if(confirm("Deseja excluir?")){

        catequizandos.splice(index,1);

        salvar();

        renderizar();
    }
}

function renderizar(){

    const lista =
    document.getElementById(
    "listaCatequizandos"
    );

    lista.innerHTML = "";

    catequizandos.forEach(
    (aluno,index)=>{

        const frequencia =
        calcularFrequencia(aluno);

        lista.innerHTML += `
        <tr>

            <td>${aluno.nome}</td>

            <td>${aluno.presencas}</td>

            <td>${aluno.faltas}</td>

            <td class="${
                frequencia >= 75
                ? "frequencia-boa"
                : "frequencia-baixa"
            }">
                ${frequencia.toFixed(1)}%
            </td>

            <td>

                <button
                class="btn presente"
                onclick="registrarPresenca(${index})">
                ✅
                </button>

                <button
                class="btn falta"
                onclick="registrarFalta(${index})">
                ❌
                </button>

                <button
                class="btn excluir"
                onclick="excluirCatequizando(${index})">
                🗑️
                </button>

            </td>

        </tr>
        `;
    });

    atualizarDashboard();
}

function atualizarDashboard(){

    let presencas = 0;
    let faltas = 0;
    let frequenciaTotal = 0;

    catequizandos.forEach(aluno=>{

        presencas += aluno.presencas;

        faltas += aluno.faltas;

        frequenciaTotal +=
        calcularFrequencia(aluno);
    });

    document.getElementById(
    "totalCatequizandos"
    ).textContent =
    catequizandos.length;

    document.getElementById(
    "totalPresencas"
    ).textContent =
    presencas;

    document.getElementById(
    "totalFaltas"
    ).textContent =
    faltas;

    document.getElementById(
    "frequenciaMedia"
    ).textContent =

    catequizandos.length > 0

    ?

    (
        frequenciaTotal /
        catequizandos.length
    ).toFixed(1) + "%"

    :

    "0%";
}

document
.getElementById("pesquisa")
.addEventListener(
"input",
function(){

    const termo =
    this.value.toLowerCase();

    document
    .querySelectorAll(
    "#listaCatequizandos tr"
    )
    .forEach(linha=>{

        linha.style.display =

        linha.innerText
        .toLowerCase()
        .includes(termo)

        ? ""

        : "none";
    });
});

renderizar();