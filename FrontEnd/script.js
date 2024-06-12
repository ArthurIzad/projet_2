const jwt = require("jsonwebtoken")

let works = []
fetch("http://localhost:5678/api/works/")
.then((response)=>{
    // console.log(response)
    return response.json()
})
.then((data)=>{
    // console.log(data)
    works = data
    afficherWork()
})
.catch(()=> {
    alert("Une erreur est survenue")
})

let categories = []
fetch("http://localhost:5678/api/categories/")
.then((response)=>{
    // console.log(response)
    return response.json()
})
.then((data)=>{
    // console.log(data)
    categories = data
    afficherCategories()
    console.log(categories)
})
.catch(()=> {
    alert("une erreur est survenue")
})

function afficherCategories(){
    let mes_btn_tri = document.getElementById("mes_btn_tri")
    let btn = document.createElement("button")
    btn.innerText = "tous"
    mes_btn_tri.appendChild(btn)
    btn.addEventListener("click", () => {
        afficherWork()
    })
    for(let i=0 ; i < categories.length ; i++){
        let btn = document.createElement("button")
        btn.innerText = categories[i].name
        mes_btn_tri.appendChild(btn)
        btn.addEventListener("click", () => {
            afficherWork(categories[i].id)
        })

        
    }

}


function afficherWork(id = null){
    const galerieElement = document.querySelector(".gallery")
    let workstoshow = works
    galerieElement.innerHTML = ""
    if(id != null){
        workstoshow = works.filter((works) => {
            return works.categoryId == id

        })
    }
    for(let i=0; i < workstoshow.length; i++){
        
        const image_temporaire = workstoshow[i]
        const ArticleElement = document.createElement("figure")

        const imageElement = document.createElement("img")
        imageElement.src = image_temporaire.imageUrl
        ArticleElement.appendChild(imageElement)

        const titleElement = document.createElement("figcaption")
        titleElement.innerText = image_temporaire.title
        ArticleElement.appendChild(titleElement)

        galerieElement.appendChild(ArticleElement)

        

    }
}


let values_input = document.querySelectorAll(".input_log").value
let value_test = document.getElementById("btn_test")
// let values_input = document.querySelectorAll(".input_log").value

// function login (){
//     event.preventDefault()

//     const btn_submit = document.getElementById("btn_submit")
//     btn_submit.addEventListener("submit", (event)=> {
//         event.preventDefault()
//         const email = document.getElementById("email").value
//         const mdp = document.getElementById("mdp").value

//         if (email === "sophie.bluel@test.tld" && mdp ==="S0phie"){
//             console.log("vos id sont bon")
//             window.location.href="index.html"
        
//             // let message_erreur = document.create
//         }
//         if(email != "sophie.bluel@test.tld" && mdp != "S0phie"){
//             console.log("Votre identifiant et votre mot de passe sont incorect")
//             let erreur_element = document.createElement("p")
//             erreur_element.innerText = "Votre identifiant et votre mot de passe sont incorect"
//             btn_submit.appendChild(erreur_element)
//         }   
//     })
// }


const btn_submit = document.getElementById("btn_submit")
const form_login = document.querySelector(".form_login")

    btn_submit.addEventListener("click", (event)=> {
        event.preventDefault()
        console.log(form_login)
        const email = document.getElementById("email").value
        const mdp = document.getElementById("mdp").value

        if (email === "sophie.bluel@test.tld" && mdp ==="S0phie"){
            console.log("vos id sont bon")
            window.location.href="index.html"
        
            // let message_erreur = document.create
        }
        if(email != "sophie.bluel@test.tld" && mdp != "S0phie"){
            console.log("Votre identifiant et votre mot de passe sont incorect")
            let erreur_element = document.createElement("p")
            erreur_element.innerText = `Votre identifiant et votre mot de passe sont incorect`
            form_login.appendChild(erreur_element)
        }   
    })