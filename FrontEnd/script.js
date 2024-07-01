import { switchPanel } from "./modale.js"

// const app = require("../Backend/app")

let works = []

function getWorks(){
    fetch("http://localhost:5678/api/works/")
    .then((response)=>{
        // console.log(response)
        return response.json()
    })
    .then((data)=>{
        // console.log(data)
        works = data

        afficherWork()
        afficherWorkModal()
    })
    .catch(()=> {
        alert("Une erreur dans le chargement des images est survenue")
    })

}
getWorks()

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
    afficherOption()
})
.catch(()=> {
    alert("une erreur dans le chargement des catégories est survenue")
})




function afficherCategories(){
    let mes_btn_tri = document.getElementById("mes_btn_tri")
    let btn = document.createElement("button")
    btn.innerText = "Tous"
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

function afficherOption(){
    let select = document.getElementById("modal_select")
    let option_vide = document.createElement("option")
    select.appendChild(option_vide)
    for(let i=0 ; i < categories.length ; i++){
        let option = document.createElement("option")
        option.innerText = categories[i].name
        option.setAttribute("value", `${categories[i].id}`)
        select.appendChild(option)
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




function afficherWorkModal(id = null){
    const galerieElement = document.querySelector(".gallery_modal")
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

        const btnTrashCanElement = document.createElement("button")
        btnTrashCanElement.setAttribute("class", "btn_trash_can")

        ArticleElement.appendChild(btnTrashCanElement)


        const trashCanElement = document.createElement("i")
        trashCanElement.setAttribute("class", "fa-regular fa-trash-can")
        btnTrashCanElement.appendChild(trashCanElement)
        
        galerieElement.appendChild(ArticleElement)
    }
    deletePic()
}



function deletePic(){
    const token = window.localStorage.getItem("token")
    const btn_trash_can = document.querySelectorAll(".btn_trash_can")
    for(let i=0; i < btn_trash_can.length; i++){
        btn_trash_can[i].addEventListener("click", (e)=>{
            e.preventDefault
            let chargeUtile = works[i].id
            fetch(`http://localhost:5678/api/works/${chargeUtile}`, {
                method:"DELETE",
                headers:{
                    "accept": "text/html",
                    "authorization": `bearer ${token}`
                }
            })
            .then(()=>{
                getWorks()
            })
            .catch(()=>{
                alert("Une erreur dans la délétion d'image est survenue")
            })
            
        })
    }
}
deletePic()



function addPic(){
    const token = window.localStorage.getItem("token")
    const form_apply_button = document.querySelector(".form_add_pic")

    form_apply_button.addEventListener("submit", (e)=>{
        e.preventDefault()

        const titre = document.querySelector("input[name='titre']").value
        const categorie = document.querySelector("select[name='categorie']").value
        const photo = document.getElementById("btn_add_pic").files[0]
        

        if(!titre || !categorie || !photo){
            // mon message d'erreur
            return 
        }
    
        let formData = new FormData()
        formData.append("image", photo)
        formData.append("title", titre)
        formData.append("category", categorie)

        let new_pic =[]
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers:{
                "accept": "application/json",
                "authorization": `bearer ${token}`
            },
            body: formData
        })
        .then(()=>{
            getWorks()
            switchPanel(e)

        })
        .catch(()=> {
            alert("Une erreur dans l'ajout d'image est survenue")
        })
    })
}
addPic()



function preview() {
    const input = document.getElementById('btn_add_pic')
    let logo = document.getElementById("logo_preview")
    let preview = document.getElementById("form-image-preview")

    input.addEventListener('change', ()=>{
        logo.style.display = "none"
        preview.setAttribute('style', 'null')
        preview.src = URL.createObjectURL(input.files[0])
    })
}
preview()