function IDtoken (){
    const btn_submit = document.getElementById("btn_submit")

    btn_submit.addEventListener("click", (event)=> {
        event.preventDefault()

        let mon_email = document.getElementById("email").value
        let mon_mdp = document.getElementById("mdp").value


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
            return response.json()
        })
        .then((data)=>{
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
    
                erreur_element.innerText = `Votre identifiant ou votre mot de passe est incorect`
                mdp_oublie.appendChild(erreur_element)
                }
        })
        .catch(()=> {
            alert("Une erreur est survenue")
        })
    })
}
IDtoken()