var produtos = []

fetch('http://localhost:3000/api', {
    method: 'GET'
})
    .then(response => response.json())
    .then(function (json) {

        json.map(e => {
            produtos.push(e)
        })


        produtos.map(e => {
            outputProdutos(e, '.table-content')
        })
    })


function outputProdutos(val, onde, x = '0') {
    const container = document.querySelector(onde)

    if (x === '=') {
        container.innerHTML = `
        
                <div class="table-row">
                    <div class="table-data"><img src=`+ val.srcProduto + `></div>
                    <div class="table-data" id='codigoProduto'>`+ val.codigo + `</div>
                    <div class="table-data" id='nomeProduto'>`+ val.produto + `</div>
                    <div class="table-data">`+ val.quantidade + `</div>
                    <div class="table-data">`+ regexData(val.dataEntrada) + `</div>
                    <div class="table-data" id='valorProd'>R$`+ Number(val.valor) + `</div>
                </div>
            

    `
    } else {
        container.innerHTML += `
    <div class="table-row">
        <div class="table-data"><img src=`+ val.srcProduto + `></div>
        <div class="table-data">`+ val.codigo + `</div>
        <div class="table-data">`+ val.produto + `</div>
        <div class="table-data">`+ val.quantidade + `</div>
        <div class="table-data">`+ regexData(val.dataEntrada) + `</div>
        <div class="table-data">R$`+ val.valor + `</div>
    </div>
    `
    }

}

function regexData(x) {
    let valor = x
    let regex = /^(\d{4}-\d{2}-\d{2}).*/g;
    const novoValor = valor.replace(regex, "$1");
    const parts = novoValor.split("-");
    const reordered = parts[2] + "-" + parts[1] + "-" + parts[0];


    return reordered;

}

//
// ADD - ATT
//

function regex(x) {
    const valor = x;

    if (x.includes('R$')) {
        let regex = /^R\$(\d*)(,?)(\d+)/g;
        const novoValor = valor.replace(regex, "$1$3");
        return novoValor
    }
    else {
        return valor
    }

}

document.querySelector('#adicionar').addEventListener('click', () => {
    let codigo = document.querySelector('#cod').value
    let qntd = document.querySelector('#qntd').value
    let valor = regex(document.querySelector('#valorProd').textContent)


    let novaQntd = Number(quantidadeReal) + Number(qntd)
    let newValor = Number(valor) * Number(qntd)


    attEstoque(codigo, novaQntd)
    attTransacoes(qntd, 'adicionar', newValor)

})

document.querySelector('#atualizar').addEventListener('click', () => {
    let codigo = document.querySelector('#cod').value
    let qntd = document.querySelector('#qntd').value



    attEstoque(codigo, qntd)
    attTransacoes(qntd, 'atualizar', '-')
})



function attEstoque(id, qntd) {
    fetch('/api/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantidade: qntd,
            dataEntrada: new Date()
        }),
    })
        .then(response => {
            if (response.ok) {
                find(codigo.value)
                location.reload()
            } else {
                alert('erro ao atualizar registo');
            }
        })
        .catch(error => console.error('Erro ao atualizar:', error));
}

//
//BUSCA PRODUTO NA HR Q COLOCA O COD

const codigo = document.querySelector('#cod')
codigo.addEventListener('keyup', () => {
    if (codigo.value.length > 0) {
        find(codigo.value, '.output')
    } else
        document.querySelector('.output').textContent = ''
})

function find(cod, onde) {
    fetch(`http://localhost:3000/api/` + cod, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(function (json) {
            if (json == undefined) {
                document.querySelector(onde).innerHTML = '<h1>PRODUTO NAO ENCONTRADO</h1>'
            }
            outputProdutos(json, onde, '=')
            quantidadeReal = json.quantidade
        })
}

//
/* FUNÇÃO PARA ATUALIZAR A TABLE TRANSACOES */
//

function attTransacoes(qntd, op, valor) {
    fetch('/apiTrans', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod: document.querySelector('#codigoProduto').textContent,
            produto: document.querySelector('#nomeProduto').textContent,
            quantidade: qntd,
            data: new Date(),
            operacao: op,
            createdAt: new Date(),
            updatedAt: new Date(),
            valor: valor
        }),
    })
        .then(response => {
            if (response.ok) {
                console.log('ok');
            } else {
                alert('erro ao atualizar registo');
            }
        })
        .catch(error => console.error('Erro ao atualizar:', error));
}

/*
//POSTAR
//

document.querySelector('#postar').addEventListener('click', () => {
    let codigo = document.querySelector('#cod').value
    let produto = document.querySelector('#produto').value
    let qntd = document.querySelector('#qntd').value

    postar(codigo, produto, qntd)
})

function postar(codigo, produto, qntd) {

    fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            "codigo": codigo,
            "produto": produto,
            "quantidade": qntd,
            "dataEntrada": new Date(),
            "createdAt": new Date(),
            "updatedAt": new Date()

        })
    })
        .then(response => {
            if (response.ok) {
                console.log('postado com sucesso');
            } else {
                throw new Error('Erro ao processar a solicitação');
            }
        })

}

*/

