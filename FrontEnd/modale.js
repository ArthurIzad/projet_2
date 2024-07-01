let modal = null

export function switchPanel(e) {
    e.preventDefault()
    const mes_page_modal = document.querySelectorAll(".page_modal")
    for (let i = 0 ; i < mes_page_modal.length ; i++ ){
        if (mes_page_modal[i].style.display === ""){
            mes_page_modal[i].style.display = "none"
        }else{
            mes_page_modal[i].style.display = null
        }
    }
}


const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelectorAll(".close_button").forEach(button =>{
        button.addEventListener("click", closeModal)
    })
    modal.querySelector(".modal_stop").addEventListener("click", stopPropagation)
    
}

// export const closeModal = function(e) {
//     if (modal === null) return
//     e.preventDefault()
//     modal.style.display = "none"
//     modal.removeEventListener("click", closeModal)
//     modal.querySelectorAll(".close_button").forEach(button =>{
//         button.removeEventListener("click", closeModal)
//     })
//     modal.querySelector(".modal_stop").removeEventListener("click", stopPropagation)
//     modal = null

// }


export function closeModal(e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.removeEventListener("click", closeModal)
    modal.querySelectorAll(".close_button").forEach(button =>{
        button.removeEventListener("click", closeModal)
    })
    modal.querySelector(".modal_stop").removeEventListener("click", stopPropagation)
    modal = null

}

const stopPropagation = function (e) {
    e.stopPropagation()
}


document.querySelectorAll(".js_modal").forEach(a =>{
    a.addEventListener("click", openModal)
})

document.querySelectorAll(".back_button").forEach(button =>{
    button.addEventListener("click", switchPanel)
})

window.addEventListener("keydown", function(e){
    if (e.key === "Escape" || e.key === "Esc"){
        closeModal(e)
    }
})