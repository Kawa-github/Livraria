
let frmBusca = document.querySelector("[name=frmBusca]")
frmBusca.addEventListener("submit", function (e) {
  e.preventDefault()
  let filtro = document.querySelector("[name=filtro]")
  filtrarLivros(filtro.value)
  if(filtro.value == ''){
    Swal.fire({
      text: "É necessário digitar o nome do livro para busca.",
      icon: 'warning',
  })
}

})

function filtrarLivros(texto) {
  busca = document.querySelectorAll(`.cardLivros .card-custom`) // no caso de houver mais card-custom em outros lugares
  Array.from(busca).map(function (e) {
    filtroAcento = removerAcentos(e.querySelector(".card-title").innerText)
    if (filtroAcento.toLowerCase().includes(texto.toLowerCase())) return e.classList.remove("d-none")
    return e.classList.add("d-none")
  })
}

removerAcentos = acento => acento.normalize("NFD").replace(/[^a-zA-Zs]/g, "")

function mostrar(categoria) {
  elementos = document.querySelectorAll('.card-custom')
  elementosArray = Array.from(elementos)
  elementosArray.map(function (elemento) {
    if (categoria == "todos") return elemento.classList.remove('d-none')
    if (elemento.classList.contains(`card-${categoria}`)) elemento.classList.remove('d-none')
    else elemento.classList.add('d-none')
  })
}


let elementosCheck = document.querySelectorAll('input[type="checkbox"]')
elementosCheck.forEach(function(e){

  e.addEventListener("click",function(){
    let checked = document.querySelectorAll('input[type="checkbox"]:checked').length
    let botao = document.querySelector('.btn-comprar')
    if(checked == 0 ){
      botao.style.display = "none"
    }else{
      botao.style.display = "block"
    }
  })
})  

function mostrarItems(){
  document.addEventListener("click",function(e){
    if(e.target.classList.contains('btn-comprar')){
      let titulosdoArray = pegarSelecionados()
      let precosLivros = pegarPrecos()
      let titulos = titulosdoArray.join(", ")
        Swal.fire({
        text: "Você selecionou os livros: " + titulos + " e o preço total é: " + precosLivros,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar compra'
      })
   }  
  })
}

mostrarItems()  

// function removerPontoeCifrao(){
//   let precos = document.querySelectorAll(".card-preco")
//   precos.replace("R$","").replace(",",".")
//   // return precos
// }

function pegarPrecos(){
  let card = document.querySelectorAll('.card-custom')
  let precosArray = Array.from(card).map(e => 
    e.querySelector('.chkLivro').checked &&
      e.querySelector('.card-preco').innerHTML
  )

  let total = precosArray.reduce((acumulador,livro) => acumulador + Number(livro) ,0)
  return total
}

function pegarSelecionados(){
  let elementos = document.querySelectorAll('.card-custom')
  let titulosArray = []
  let precosArray = []
  Array.from(elementos).map((elemento,preco) => {
    if(elemento.querySelector('.chkLivro').checked){
        titulosArray.push(elemento.querySelector('.card-title').innerHTML)
      }
  })
  return titulosArray 
}   

function carrinhoCompras(){
let elementos = document.querySelectorAll('.card-custom')
let card = []
Array.from(elementos).map((elemento,preco) => {
    if(elemento.querySelector('.chkLivro').checked){
        card.push(elemento.querySelector('.card-custom').add.classList('card-minified'))
      }
  })
  return card 
}   


function paginar(){
let livros = document.querySelectorAll('.cardLivros')
let paginacao = document.querySelector('.paginacao')
paginacao.addEventListener("click",function(e){
  e.preventDefault()
  alert('ola')
})
}


/* ideias 
-  Inserir preço total, que está com problemas.
- Fazer um carrinho de compras de acordo com oque foi marcado. Card dos livros em forma de thumbnail.
- Implementar paginação nos livros com o Bootstrap e JavaScript.
*/
