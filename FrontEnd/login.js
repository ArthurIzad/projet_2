function IDtoken (){
    const btn_submit = document.getElementById("btn_submit")

    btn_submit.addEventListener("click", (event)=> {
        event.preventDefault()

        let mon_email = document.getElementById("email").value
        let mon_mdp = document.getElementById("mdp").value

        // let les_log = {
        //     email: event.target.querySelector("input[name=email]").value,
        //     password: event.target.querySelector("input[name=password]").value,
        // }

        let les_log = {
            email: mon_email,
            password: mon_mdp,
        }
        let chargeUtile = JSON.stringify(les_log)


        let valeurToken = []
        fetch("http://localhost:5678/api/users/login", {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: chargeUtile
        })
        .then((response)=>{
            // console.log(response)
            return response.json()
        })
        .then((data)=>{
            // console.log(data)
            valeurToken = data
            mon_token = valeurToken.token
            window.localStorage.setItem("token", mon_token)
        })
        .then(()=>{
            const token = window.localStorage.getItem("token")
            if(token === valeurToken.token){
                window.location.href="index.html"

            }else{
                const mdp_oublie = document.querySelector(".mdp_oublie")
                let erreur_element = document.createElement("p")
                mdp_oublie.innerHTML = ""
    
                erreur_element.innerText = `Votre identifiant ou votre mot de passse est incorect`
                mdp_oublie.appendChild(erreur_element)
                }
        })
        .catch(()=> {
            alert("Une erreur est survenue")
        })
        
    })
}

IDtoken()


// function login(){
//     console.log("je suis rentré dans la fonction login")

//     const token = window.localStorage.getItem("token")
//     // console.log(token)

//     console.log(valeurToken.token)


//     if (token === valeurToken.token){
//         console.log("vos id sont bon")
    
//         // const ma_valeur_token = window.localStorage.getItem("token")
//         // console.log(ma_valeur_token)
    
        
        
//         // window.location.href="index.html"
//     }
    
//     if(email != "sophie.bluel@test.tld" && mdp != "S0phie"){
//         console.log("Votre identifiant ou votre mot de passe sont incorrect")
//         const mdp_oublie = document.querySelector(".mdp_oublie")
//         let erreur_element = document.createElement("p")
//         mdp_oublie.innerHTML = ""
    
//         erreur_element.innerText = `Votre identifiant est incorect`
//         mdp_oublie.appendChild(erreur_element)
//     }
    
//     if(mdp != "S0phie"){
//         console.log("Votre identifiant ou votre mot de passe sont incorrect")
//         const mdp_oublie = document.querySelector(".mdp_oublie")
//         let erreur_element = document.createElement("p")
//         mdp_oublie.innerHTML = ""
    
//         erreur_element.innerText = `Votre mot de passe est incorect`
//         mdp_oublie.appendChild(erreur_element)
//     }

// }

