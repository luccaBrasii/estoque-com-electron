var produtos = []

fetch('http://localhost:3000/apitrans', {
    method: 'GET'
})
    .then(response => response.json())
    .then(function (json) {

        json.map(e => {
            produtos.push(e)
        })


        produtos.map(e => {
            output(e, '.table-content')
        })
    })

function output(val, onde) {

    const container = document.querySelector(onde)

    container.innerHTML +=
        `

    <div class="table-row">
        <div class="table-data">`+ val.cod + `</div>
        <div class="table-data">`+ val.produto + `</div>
        <div class="table-data">`+ val.operacao + `</div>
        <div class="table-data">`+ val.quantidade + `</div>
        <div class="table-data">`+ regexData(val.data) + `</div>
        <div class="table-data">R$`+ val.valor + `</div>
    </div>
    `

}


function regexData(x) {
    let valor = x
    let regex = /^(\d{4}-\d{2}-\d{2}).*/g;
    const novoValor = valor.replace(regex, "$1");
    const parts = novoValor.split("-");
    const reordered = parts[2] + "-" + parts[1] + "-" + parts[0];


    return reordered;

}