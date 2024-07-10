import { switchPanel } from "./modale.js"


let works = []

function getWorks(){
    fetch("http://localhost:5678/api/works/")
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
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
    return response.json()
})
.then((data)=>{
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
    let select = document.getElementById("input_categorie")
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
        trashCanElement.setAttribute("class", "fa-solid fa-trash-can")
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
    const apply_button = document.querySelector(".apply_button")

    form_apply_button.addEventListener("submit", (e)=>{
        e.preventDefault()

        let titre = document.querySelector("input[name='titre']").value
        let categorie = document.querySelector("select[name='categorie']").value
        let photo = document.getElementById("btn_add_pic").files[0]

        let formData = new FormData()
        formData.append("image", photo)
        formData.append("title", titre)
        formData.append("category", categorie)

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
            empty()
            restore()
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

    let btn = document.querySelector(".btn_add_pic_hidden")
    let label = document.getElementById("label_add_pic")

    input.addEventListener('change', ()=>{
        logo.style.display = "none"
        btn.setAttribute("style", "display: none;")
        label.setAttribute("style", "display: none;")

        preview.setAttribute('style', 'null')
        preview.src = URL.createObjectURL(input.files[0])
    })
}
preview()

function restore (){
    let logo = document.getElementById("logo_preview")
    let preview = document.getElementById("form-image-preview")
    let btn = document.querySelector(".btn_add_pic_hidden")
    let label = document.getElementById("label_add_pic")

    logo.setAttribute("style", "display: null;")
    btn.setAttribute("style", "display: null;")
    label.setAttribute("style", "display: null;")
    preview.setAttribute('style', 'display: none;')
}


function empty(){
    let form = document.querySelector(".form_add_pic")
    const apply_button = document.querySelector(".apply_button")

    const mdp_oublie = document.querySelector(".mdp_oublie")


    form.addEventListener("change", ()=>{
        let image = document.querySelector(".btn_add_pic").value
        let titre = document.querySelector(".input_titre").value
        let categorie = document.getElementById("input_categorie").value

        if(!image || !titre || !categorie){
            apply_button.setAttribute("style", "background-color: #a7a7a7;")

        }else{
            apply_button.setAttribute("style", "background-color: #1D6154;")
            mdp_oublie.innerHTML = ""
        }
    })

    apply_button.addEventListener("click", ()=>{
        let image = document.querySelector(".btn_add_pic").value
        let titre = document.querySelector(".input_titre").value
        let categorie = document.getElementById("input_categorie").value
        if(!image || !titre || !categorie){
            const mdp_oublie = document.querySelector(".mdp_oublie")

            let erreur_element = document.createElement("p")
            mdp_oublie.innerHTML = ""
            
            erreur_element.innerText = `Vous n'avez pas rempli tous les champs`
            mdp_oublie.appendChild(erreur_element)
        }
    })
}
empty()