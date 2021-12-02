let userNameInput = document.getElementById("userName");
let userEmailInput = document.getElementById("userEmail");
let userPasswordInput = document.getElementById("userPassword");
let signupBtn = document.getElementById("signupBtn");
let userNameAlert = document.getElementById("userNameAlert");
let userEmailAlert = document.getElementById("userEmailAlert");
let userPasswordAlert = document.getElementById("userPasswordAlert");
let welcomeUser = document.getElementById("welcomeUser");
let logoutBtn = document.getElementById("logoutBtn");



let userInfo;

if (localStorage.getItem("userStorage") == null) {
    userInfo = [];
}
else {
    userInfo = JSON.parse(localStorage.getItem("userStorage"));
}

//** For SignUp */

function signUp(){

    userInputsValidation();
    isExist();
    if (userInputsValidation() == true && isExist() == false) {

        let user =
        {
            name: userNameInput.value,
            email: userEmailInput.value,
            password: userPasswordInput.value,
        }

        userInfo.push(user);
        localStorage.setItem("userStorage", JSON.stringify(userInfo));

        let success = document.getElementById("success");
        success.classList.replace("d-none", "d-block");
    }

};

// signupBtn.addEventListener("click" , function(){
//     signUp();
// });

// ** For Validation
function userNameValidate() {

    let regex = /^[A-Z]{1,}([A-Za-z0-9]{3,10})$/;

    if (regex.test(userNameInput.value) == true && userNameInput.value !== "") {
        userNameInput.classList.add("is-valid");
        userNameInput.classList.remove("is-invalid");
        userNameAlert.classList.replace("d-block", "d-none");

        return true;
    }
    else {
        userNameInput.classList.remove("is-valid");
        userNameInput.classList.add("is-invalid");
        userNameAlert.classList.replace("d-none", "d-block");

        return false;
    }

};

function userEmailValidate() {

    let regex = /@[a-z]{5,15}(\.com)$/;
    if (regex.test(userEmailInput.value) == true && userEmailInput.value !== "") {
        userEmailInput.classList.add("is-valid");
        userEmailInput.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block", "d-none");

        return true;
    }
    else {
        userEmailInput.classList.remove("is-valid");
        userEmailInput.classList.add("is-invalid");
        userEmailAlert.classList.replace("d-none", "d-block");

        return false;
    }

};

function userPasswordValidate() {

    let regex = /^.{5,15}$/;

    if (regex.test(userPasswordInput.value) == true && userPasswordInput.value !== "") {
        userPasswordInput.classList.add("is-valid");
        userPasswordInput.classList.remove("is-invalid");
        userPasswordAlert.classList.replace("d-block", "d-none");

        return true;
    }
    else {
        userPasswordInput.classList.add("is-invalid");
        userPasswordInput.classList.remove("is-valid");
        userPasswordAlert.classList.replace("d-none", "d-block");

        return false;
    }

};

function userInputsValidation() {

    userNameValidate();
    userEmailValidate();
    userPasswordValidate();

    if (userNameValidate() == true && userEmailValidate() == true && userPasswordValidate() == true) {
        return true;
    }
    else {
        return false;
    }
};

//** For Exist */
function isExist() {

    let accountExist = document.getElementById("accountExist");

    for (let i = 0; i < userInfo.length; i++) {

        if (userInfo[i].name.toLowerCase() == userNameInput.value.toLowerCase() ||
            userInfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase()) {

            userNameInput.classList.remove("is-valid");
            userEmailInput.classList.remove("is-valid");
            accountExist.classList.replace("d-none", "d-block");

            return true;
        }
    }
    return false;
};

//** For Login */
let userWelcomeName = localStorage.getItem("nameStorage");

function login() {

    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");
    let loginBtn = document.getElementById("loginBtn");
    let wrongAlert = document.getElementById("wrongAlert");

    if (loginEmail.value == "" || loginPassword.value == "") {
        let fillAlert = document.getElementById("fillAlert");
        fillAlert.classList.replace("d-none", "d-block");

        return false;
    }
    for (let i = 0; i < userInfo.length; i++) {

        if (userInfo[i].email.toLowerCase() == loginEmail.value.toLowerCase() &&
            userInfo[i].password.toLowerCase() == loginPassword.value.toLowerCase()) {
            localStorage.setItem("nameStorage", userInfo[i].name);
            loginBtn.setAttribute("href", "welcome.html");
        }
        else {
            wrongAlert.classList.replace("d-none", "d-block");
        }
    }
};

//**For Displany User Welcome Name */
welcomeUser.onload = function displayWelcomeUser(){
    document.getElementById("userName").innerHTML = `Welcome ${userWelcomeName}`
};

//** For Logout */
function logout(){
    localStorage.removeItem("storageName");
};

logoutBtn.addEventListener("click" ,  function(){
    logout();
});









