let works = []
fetch("http://localhost:5678/api/works/")
.then((response)=>{
    console.log(response)
    return response.json()
})
.then((data)=>{
    console.log(data)
    works = data
    afficherWork()
})



function afficherWork(){
    const galerieElement = document.querySelector(".gallery")

    for(let i=0; i < works.length; i++){

        const image_temporaire = works[i]
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

function afficherWork2(works){
    const galerieElement = document.querySelector(".gallery")

    for(let i=0; i < works.length; i++){

        const image_temporaire = works[i]
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


let btn_tri = document.querySelectorALL(".mes_btn_tri input")
console.log(btn_tri)


btn_tri.addEventListener("click", ()=>{
    console.log("j'ai cliqué")
    console.log(btn_tri)

})

// btn_tri.addEventListener("click", ()=>{
//     const images_filtrees = works.map((works)=> works.category.name)
//     let nvlle_liste_img = []
//     console.log(images_filtrees)
//     console.log(btn_tri.name)

//     for(let i = 0 ; i < images_filtrees.length ; i++){
//         if(images_filtrees[i] === btn_tri.name){
//             nvlle_liste_img.push(works[i])
//             console.log(nvlle_liste_img)
//         }
//     }
//     document.querySelector(".gallery").innerHTML=""
//     afficherWork2(nvlle_liste_img)
// })


