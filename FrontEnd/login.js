// const jwt = require("jsonwebtoken")
// console.log(jwt)

// Access-Control-Allow-Origin: http://localhost:3000/


function login2 (){
    const btn_submit = document.getElementById("btn_submit")

    btn_submit.addEventListener("click", (event)=> {
        event.preventDefault()

        let mon_email = document.getElementById("email").value
        // console.log(mon_email)
        let mon_mdp = document.getElementById("mdp").value
        // console.log(mon_mdp)

        // let les_log = {
        //     email: event.target.querySelector("input[name=email]").value,
        //     password: event.target.querySelector("input[name=password]").value,
        // }
        let token = []
        let les_log = {
            email: mon_email,
            password: mon_mdp,
        }
        let chargeUtile = JSON.stringify(les_log)

        fetch("http://localhost:5678/api/users/login", {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: chargeUtile
        })
        .then((response)=>{
            console.log(response)
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            token = data
        })
        .catch(()=> {
            alert("Une erreur est survenue")
        })

        
    })
}

login2()












//     // console.log(form_login)
//     const email = document.getElementById("email").value
//     const mdp = document.getElementById("mdp").value
//     let erreur_element = document.createElement("p")
//     erreur_element.innerHTML = ""
//     console.log(erreur_element)

//     if (email === "sophie.bluel@test.tld" && mdp ==="S0phie"){
//         console.log("vos id sont bon")
//         // window.location.href="index.html"
//         // token: jwt.sign(
//         //     { email: user.}
//         // )
        
    
//     }
//     if(email != "sophie.bluel@test.tld" && mdp != "S0phie"){
//         // console.log("Votre identifiant et votre mot de passe sont incorect")
//         // let erreur_element = document.createElement("p")
//         // erreur_element.innerHTML = ""

//         erreur_element.innerText = `Votre identifiant et votre mot de passe sont incorect`
//         console.log()
//         form_login.appendChild(erreur_element)
//     }
// })


