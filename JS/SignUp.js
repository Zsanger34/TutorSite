var Users = []
function rightPass(name, pass){
    var ret=false
    for(let x=0; x<Users.length; x++){
        if(x["name"]==name && x["password"]==pass){
            ret= true
        }
    }
    return ret
}
function userExists(users, adding){
    var inList=false
    for(let i=0; i<Users.length;i++){
        if(i["name"]==adding["name"]){
            inList==true
        }
    }
    return inList
}
function emailExists(users, adding){
    var inList=false
    for(let i=0; i<Users.length;i++){
        if(i["email"]==adding["email"]){
            inList==true
        }
    }
    return inList
}

function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add("form__message--${type}")
}

function setInputError(inputElement, message){
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent=message;
}
function clearInputError(inputElement){
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent="";

}
document.addEventListener("DOMContentLoaded", () =>{
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const resetPassForm = document.querySelector("#resetPassword");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");

        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#passReset").addEventListener("click", e=>{
        e.preventDefault()
        loginForm.classList.add("form--hidden")
        resetPassForm.classList.remove("form--hidden")
    });

    document.querySelector("#linkSignIn").addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    document.querySelector("#linkResetEmail").addEventListener("click", e=>{
        e.preventDefault()
        resetPassForm.classList.remove("form--hidden");
        loginForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submitL", e=>{
        var name = document.getElementById("nameL")
        var password =document.getElementById("passL")
        if(emailExists(name) || userExists(name)){
            if(rightPass(name,password)){
            }
            else{
                setInputError("form__input-error-message","Incorrect username or password")
            }
        }
    })
    loginForm.addEventListener("submitS", e=> {
        e.preventDefault()
        //Process new account info
        var name=document.getElementById("signupUsername")
        var email=document.getElementById("email")
        var pass1=document.getElementById("pass1")
        var pass2=document.getElementById("pass2")
        if(pass1==pass2){
            var adding = {"name": name, "email": email, "password": pass2}
            if(userExists(Users, adding) && emailExists(Users, adding)){
                Users.push(adding)
            }
        }
        else{
            setInputError("signupUsername","Username or email already in use")

        }
        //
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement =>{
        inputElement.addEventListener("blur", e =>{
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10){
                setInputError(inputElement, "Username must be at least 10 characters in length")
            }
        });
        inputElement.addEventListener("input", e =>{
            clearInputError(inputElement)
        });
    });

    document.querySelectorAll(".form__input").forEach(inputElement =>{
        inputElement.addEventListener("blur", e =>{
            if (e.target.id === "pass1" && e.target.value.length > 0 && e.target.value.length < 10){
                setInputError(inputElement, "Password must be at least 10 characters in length")
            }
        });
        inputElement.addEventListener("input", e =>{
            clearInputError(inputElement)
        });
    });

    document.querySelectorAll(".form__input").forEach(inputElement =>{
        inputElement.addEventListener("blur", e =>{
            if (e.target.id === "pass2" && e.target.value.length > 0 && e.target.value.length < 10){
                setInputError(inputElement, "Password must be at least 10 characters in length")
            }
        });
        inputElement.addEventListener("input", e =>{
            clearInputError(inputElement)
        });
    });
});