var produtos = []

//procura produtos
document.querySelector('#cod').addEventListener('keyup', () => {
    if (document.querySelector('#cod').value.length > 0) {
        const cod = document.querySelector('#cod').value

        find(cod, '.mostra-produto')
    } else
        document.querySelector('.mostra-produto').textContent = ''
})

//add ao carrinho
document.querySelector('#adicionar').addEventListener('click', () => {
    pegaProduto()
})

//procura produtos
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
        })
}

//saida produtos
function outputProdutos(val, onde, x = '0') {
    const container = document.querySelector(onde)
    if (x === '=') {
        container.innerHTML = `
    <table class="produto-only">
        <ul>
            <li>
                <h1 id='codigoProduto'>`+ val.codigo + `</h1>
            </li>
            <li>
                <img src=`+ val.srcProduto + ` style="width: 50px;">
            </li>
            <li>
                <h1 id='nomeProduto'>`+ val.produto + `</h1>
            </li>
        </ul>
    </table>
    `
    } else {
        container.innerHTML += `
    <table class="produto-only">
        <ul>
            <li>
                <h1>`+ val.codigo + `</h1>
            </li>
            <li>
                <img src=`+ val.srcProduto + ` style="width: 50px;">
            </li>
            <li>
                <h1>`+ val.produto + `</h1>
            </li>
        </ul>
    </table>
    `
    }

}

//verifica a quantidade no estoque e add ao carrinho
function pegaProduto() {
    var codProd = document.querySelector('#codigoProduto').textContent
    var nomeProd = document.querySelector('#nomeProduto').textContent
    var quantidade = document.querySelector('#qntd').value

    let quantidadeBD = buscaUm(codProd)

    quantidadeBD.then((quantidadeBD) => {

        if (quantidade <= quantidadeBD.quantidade && quantidade > 0) {

            let value = soma(Number(quantidadeBD.valor), Number(quantidade))

            let produtoOnly = {
                cod: codProd,
                nome: nomeProd,
                qtd: quantidade,
                valor: value,
                qtdAntiga: quantidadeBD.quantidade
            }

            produtos.push(produtoOnly)
            addCarrinho(produtoOnly)
        } else {
            alert('Quantidade em estoque insuficiente, ou valor abaixo de 0')
        }
    }).catch((error) => {
        console.log('Ocorreu um erro:', error.message);
    });

}

//atualiza as transacoes
document.querySelector('#vender').addEventListener('click', () => {
    console.log(produtos);

    produtos.map(e => {
        let newQTD = Number(e.qtdAntiga) - Number(e.qtd)

        attEstoque(e.cod, newQTD)
        registraTransacao(e)
    })
})

//add carrinho no front
function addCarrinho(val) {
    let carrinho = document.querySelector('.carrinho')

    carrinho.innerHTML += `
    
    <table>
        <ul>
            <li>Código: `+ val.cod + `</li>
            <li>Nome:`+ val.nome + `</li>
            <li>Quantidade: `+ val.qtd + `</li>
            <li>Valor: R$:`+ val.valor + `</li>
        </ul>
    </table>

    `

}

//requisição para buscar a quantidade
async function buscaUm(cod) {
    try {
        const response = await fetch(`http://localhost:3000/api/${cod}`, {
            method: 'GET'
        });
        const json = await response.json();

        if (json == undefined) {
            console.log('Produto não encontrado');
        } else {
            console.log(json);
            return { quantidade: json.quantidade, valor: json.valor }
        }
    } catch (error) {
        console.log('Ocorreu um erro:', error.message);
    }
}

//registra transacoes

function registraTransacao(val) {
    fetch('http://localhost:3000/apiTrans', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cod: val.cod,
            produto: val.nome,
            quantidade: val.qtd,
            data: new Date(),
            operacao: 'venda',
            valor: val.valor,
            createdAt: new Date(),
            updatedAt: new Date()
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

//att estoque

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
                console.log('ATT COM SUCESSO');
            } else {
                alert('erro ao atualizar registo');
            }
        })
        .catch(error => console.error('Erro ao atualizar:', error));
}

function soma(x, y) {
    return Number(x) * Number(y)
}