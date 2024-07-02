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
        

        // if(!titre || !categorie || !photo){
        //     // mon message d'erreur
        //     return 
        // }

        if(!photo || !titre || !categorie){
            console.log("addpic : l'un des 3 champs est vide")
            const mdp_oublie = document.querySelector(".mdp_oublie")

            let erreur_element = document.createElement("p")
            mdp_oublie.innerHTML = ""
                
            erreur_element.innerText = `Vous n'avez pas rempli tous les champs`
            mdp_oublie.appendChild(erreur_element)


            empty()

            return

        }
        console.log("add : après le if")
    
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
            switchPanel(e)
            // if(!photo || !titre || !categorie){
            //     console.log("addpic : l'un des 3 champs est vide")
            //     empty()

            // }else{
            //     console.log("addpic : toute mes champs sont remplis")
            //     apply_button.setAttribute("style", "background-color: #1D6154;")
            //     console.log(apply_button)
            //     switchPanel(e)

        
            // }

        })
        
        .catch(()=> {
            // alert("Une erreur dans l'ajout d'image est survenue")
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


function empty(){
    let form = document.querySelector(".form_add_pic")
    const apply_button = document.querySelector(".apply_button")
    let image = document.querySelector(".btn_add_pic")
    let titre = document.querySelector(".input_titre")
    let categorie = document.querySelector(".input_categorie").value

    const mdp_oublie = document.querySelector(".mdp_oublie")


    // console.log(form)

    // console.log(apply_button)

    // console.log(image)
    // console.log(titre.value)
    // console.log(categorie)

    // apply_button.addEventListener("click", ()=>{
    //     if(!image || !titre.value || !categorie){
    //         console.log("apply : l'un des 3 champs est vide")
    //         // const mdp_oublie = document.querySelector(".mdp_oublie")
    //         console.log(image)
    //         console.log(titre.value)
    //         console.log(categorie)

    //         let erreur_element = document.createElement("p")
    //         mdp_oublie.innerHTML = ""
        
    //         erreur_element.innerText = `Vous n'avez pas rempli tous les champs`
    //         mdp_oublie.appendChild(erreur_element)
    //     }
    // })

    form.addEventListener("change", ()=>{
        console.log("qqchose dans mon form a changé")
        if(!image || !titre.value || !categorie){
            console.log("form : l'un des 3 champs est vide")
            // console.log(image)
            // console.log(titre.value)
            // console.log(categorie)

            // let erreur_element = document.createElement("p")
            // mdp_oublie.innerHTML = ""
        
            // erreur_element.innerText = `Vous n'avez pas rempli tous les champs`
            // mdp_oublie.appendChild(erreur_element)

            // apply_button.addEventListener("click", ()=>{
            //     if(!image || !titre.value || !categorie){
            //         console.log("apply : l'un des 3 champs est vide")
            //         // const mdp_oublie = document.querySelector(".mdp_oublie")
            //         console.log(image)
            //         console.log(titre.value)
            //         console.log(categorie)
        
            //         let erreur_element = document.createElement("p")
            //         mdp_oublie.innerHTML = ""
                
            //         erreur_element.innerText = `Vous n'avez pas rempli tous les champs`
            //         mdp_oublie.appendChild(erreur_element)
            //     }
            // })





            empty()
        }
        else{
            console.log("form : toute mes champs sont remplis")
            // console.log(image)
            // console.log(titre.value)
            // console.log(categorie)
            apply_button.setAttribute("style", "background-color: #1D6154;")
            mdp_oublie.innerHTML = ""
            // switchPanel(e)

            // console.log(apply_button)
    
        }
    })

    // if(!image || !titre || !categorie){
    //     console.log("hors du listener : l'un des 3 champs est vide")
    // }
    // else{
    //     console.log("hors du listener : toute mes champs sont remplis")
    //     // apply_button.setAttribute("style", "background-color: #1D6154;")
    //     // console.log(apply_button)

    // }
    

    


}
empty()

function testempty(){
    let form = document.querySelector(".form_add_pic")
    const apply_button = document.querySelector(".apply_button")
    let image = document.querySelector(".btn_add_pic")
    let titre = document.querySelector(".input_titre")
    let categorie = document.querySelector(".input_categorie").value

    const mdp_oublie = document.querySelector(".mdp_oublie")


    // console.log(form)

    // console.log(apply_button)

    // console.log(image)
    // console.log(titre.value)
    console.log(categorie)
}

window.addEventListener("keydown", function(e){
    if (e.key === "i"){
        empty()
        testempty()
    }
})

// function empty (){
//     const apply_button = document.querySelector(".apply_button")
//     const input_titre = document.querySelector("input[name='titre']")
//     const titre = document.querySelector("input[name='titre']").value
//     const categorie = document.querySelector("select[name='categorie']").value
//     const photo = document.getElementById("btn_add_pic").files[0]

//     input_titre.addEventListener("change", ()=>{
//         if(!titre || !categorie || !photo){
//             apply_button.setAttribute("background_color", "#1D6154")
    
//             return 
//         }
//     })
    

//     apply_button.addEventListener("click", ()=>{
//         if(!titre || !categorie || !photo){
//             const mdp_oublie = document.querySelector(".mdp_oublie")

//             let erreur_element = document.createElement("p")
//             mdp_oublie.innerHTML = ""
        
//             erreur_element.innerText = `Vous n'avez pas rempli tous les champs`
//             apply_button.appendChild(erreur_element)
     
//         }else{
//             switchPanel(e)
//         }
//     })

    
// }
// empty()


// function empty (){
//     const form_apply_button = document.querySelector(".form_add_pic")
//     const apply_button = document.querySelector(".apply_button")
//     // console.log(apply_button)
//     const input_titre = document.querySelector("input[name='titre']")
//     const titre = document.querySelector("input[name='titre']").value

//     const input_categorie = document.querySelector("select[name='categorie']")
//     const categorie = document.querySelector("select[name='categorie']").value


//     const input_photo = document.getElementById("btn_add_pic")
//     const photo = document.getElementById("btn_add_pic").files[0]

//     // input_titre.addEventListener("click", ()=>{
//     //     if(!titre || !categorie || !photo){
//     //         console.log("euh")
//     //         // apply_button.setAttribute("style", "background-color = #1D6154;")

//     //         return 

//     //     }else{
//     //         console.log("euh2")
//     //         apply_button.setAttribute("style", "background-color = #1D6154;")


//     //     }
//     // })

//     // input_categorie.addEventListener("click", ()=>{
//     //     if(!titre || !categorie || !photo){
//     //         console.log("euh")
//     //         // apply_button.setAttribute("style", "background-color = #1D6154;")

//     //         return 

//     //     }else{
//     //         console.log("euh2")
//     //         apply_button.setAttribute("style", "background-color = #1D6154;")


//     //     }
//     // })

//     input_photo.addEventListener("click", ()=>{
//         if(!titre || !categorie || !photo){
//             // console.log("euh")
//             // apply_button.setAttribute("style", "background-color = #1D6154;")

//             return 

//         }else{
//             console.log("euh2")
//             apply_button.setAttribute("style", "background-color = #1D6154;")


//         }
//     })


//     apply_button.addEventListener("click", ()=>{
//         if(!titre || !categorie.value || !photo){
//             const mdp_oublie = document.querySelector(".mdp_oublie")

//             let erreur_element = document.createElement("p")
//             mdp_oublie.innerHTML = ""

//             erreur_element.innerText = `Vous n'avez pas rempli tous les champs`
//             mdp_oublie.appendChild(erreur_element)
     
//         }
//     })

//     form_apply_button.addEventListener("change", ()=>{
//         if(!titre || !categorie.value || !photo){
//             // console.log("euh")
//             // apply_button.setAttribute("style", "background-color = #1D6154;")
//             console.log(photo)

//             console.log(titre)
//             console.log(categorie)
//             console.log(input_categorie.value)







//             // return 

//         }else{
//             console.log("normalement rien n'est vide donc c'est le seul message qui doit s'afficher")
//             apply_button.setAttribute("style", "background-color = #1D6154;")


//         }
//     })

    


//     // input_titre.addEventListener("change", ()=>{
//     //     if(!titre || !categorie || !photo){
//     //         apply_button.setAttribute("background_color", "#1D6154")
    
//     //         return 
//     //     }
//     // })
    

    

    
// }
// empty()

