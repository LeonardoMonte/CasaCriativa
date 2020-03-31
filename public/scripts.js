function onOff(){
    document
    .querySelector("#modal")
        .classList
        .toggle("hide")

    document.querySelector("body")
            .classList
            .toggle("hideScroll")

    document.querySelector("#modal")
            .classList
            .toggle("addScroll")
}

function onSave()
{
    document.querySelector("#modal")
    .classList.toggle("hide")
}

function checkFields(event)
{
     const valuesToCheck = [
         "title",
         "image",
         "category",
         "description",
         "link",
     ]

     const isEmpty = valuesToCheck.find(function(value)
     {
         const checkIfIsString = typeof event.target[value].value === "string"
         const checkIfIsEmpty = !event.target[value].value.trim()

         if(checkIfIsString  && checkIfIsEmpty)
         {
              return true 
         }
     })

     if(isEmpty)
     {
         event.preventDefault()
         alert("Por favor, preencha todos os campos")
     }

}

let ideaid = 0

function openForm(id) {
    document.getElementById("myForm").style.display = "block";
    ideaid = parseInt(id)

}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    ideadid = null
}

const user = 'brmonte'
const password = 'Leonardo321'

function checkLogin(event)
{
    let usuario = event.target['user'].value
    let senha = event.target['senha'].value
    event.target['idtosend'].value = ideaid

    console.log(ideaid)
    
    console.log(event.target['idtosend'].value)

    if(usuario != user || senha != password)
    {
        event.preventDefault()
        alert("Login ou senha invalidos")
    }
    
}
