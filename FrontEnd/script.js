

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
})
.catch(()=> {
    alert("une erreur est survenue")
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







const btn_submit = document.getElementById("btn_submit")



let values_input = document.querySelectorAll(".input_log").value
let value_test = document.getElementById("btn_test")


