import { closeModal } from "./modale.js"

// const app = require("../Backend/app")

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
    afficherWorkModal()
})
.catch(()=> {
    alert("Une erreur dans le chargement des images est survenue")
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
            // console.log(chargeUtile)
            // console.log(works[i])
            // let urlDel = document.querySelector(`.gallery figure img[src='${works[i].imageUrl}']`)
            // console.log(urlDel)
            // console.log(urlDel.parentElement)

            fetch(`http://localhost:5678/api/works/${chargeUtile}`, {
                method:"DELETE",
                headers:{
                    "accept": "text/html",
                    "authorization": `bearer ${token}`
                }
            })
            .then(()=>{
                let urlDel = document.querySelector(`.gallery figure img[src='${works[i].imageUrl}']`)
                console.log(urlDel)
                let parent_urlDel = urlDel.parentElement
                console.log(parent_urlDel)
                parent_urlDel.setAttribute("style", "display: none;")
                console.log("none")
            })
            .then(()=>{
                let urlDelModal = document.querySelector(`.gallery_modal img[src='${works[i].imageUrl}']`)
                console.log(urlDelModal)
                let parent_urlDel_Modal = urlDelModal.parentElement
                console.log(parent_urlDel_Modal)
                parent_urlDel_Modal.setAttribute("style", "display: none;")
                console.log("none")

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
    // const apply_button = document.querySelector(".apply_button")
    const form_apply_button = document.querySelector(".form_add_pic")
    // e.preventDefault()

    form_apply_button.addEventListener("submit", (e)=>{
        e.preventDefault()

        const titre = document.querySelector("input[name='titre']").value
        const categorie = document.querySelector("select[name='categorie']").value
        const photo = document.getElementById("btn_add_pic").files[0]
    
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
        .then((response)=>{
            // console.log(response)
            return response.json()

        })
        .then((data)=>{
            // console.log(data)
            new_pic = data
            // add_new_pic()
        })
        .then(()=>{
            const galerieElement = document.querySelector(".gallery")
            const ArticleElement = document.createElement("figure")

            const imageElement = document.createElement("img")
            imageElement.src = new_pic.imageUrl
            ArticleElement.appendChild(imageElement)

            const titleElement = document.createElement("figcaption")
            titleElement.innerText = new_pic.title
            ArticleElement.appendChild(titleElement)

            galerieElement.appendChild(ArticleElement)

            closeModal(e)

        })
        .then(()=>{
            const galerieElementModale = document.querySelector(".gallery_modal")
            const ArticleElementModale = document.createElement("figure")

            const imageElementModale = document.createElement("img")
            imageElementModale.src = new_pic.imageUrl
            ArticleElementModale.appendChild(imageElementModale)

            const btnTrashCanElementModale = document.createElement("button")
            btnTrashCanElementModale.setAttribute("class", "btn_trash_can")

            ArticleElementModale.appendChild(btnTrashCanElementModale)


            const trashCanElementModale = document.createElement("i")
            trashCanElementModale.setAttribute("class", "fa-regular fa-trash-can")
            btnTrashCanElementModale.appendChild(trashCanElementModale)
            
            galerieElementModale.appendChild(ArticleElementModale)

        })
        .catch(()=> {
            alert("Une erreur dans l'ajout d'image est survenue")
        })
    })
}
addPic()

// fonction qui ne marche pas car new_pic n'est pas défini dedans
// function add_new_pic(){
//     // const image_temporaire = workstoshow[i]
//     console.log("1")
//     // console.log(new_pic)
//     const galerieElement = document.querySelector(".gallery")
//     const ArticleElement = document.createElement("figure")
//     console.log("2")


//     const imageElement = document.createElement("img")
//     imageElement.src = new_pic.imageUrl
//     ArticleElement.appendChild(imageElement)

//     const titleElement = document.createElement("figcaption")
//     titleElement.innerText = new_pic.title
//     ArticleElement.appendChild(titleElement)

//     galerieElement.appendChild(ArticleElement)

// }

