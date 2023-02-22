let formSection = document.getElementById('formSection');
let tempRegForm = document.getElementById('tempRegForm');
let tempAuthForm = document.getElementById('tempAuthForm');
function regForm(){
    formSection.innerHTML = " " + tempRegForm.innerHTML;
}
function authForm(){
    formSection.innerHTML = " " + tempAuthForm.innerHTML;
}

function regsubmit(){
    let pass2 = document.getElementById('pass2').value;
    let pass = document.getElementById('pass1').value;
    let login = document.getElementById('regLogin').value;
    let email = document.getElementById('regEmail').value;

    if(pass1 == '' || pass2 == '' || login == '' || email == ''){
        return
        //написать что бы выводилось что не ввели
    }

    if(pass == pass2){
        let reqData = 'username=' + login + '&password=' + pass + '&usermail=' + email;
        let address = 'reg/index.php';
        sendReq(reqData,address,'registration')
    }else{
        let responseToUser = document.getElementById('responseToUser');
        responseToUser.classList.toggle('hidden');
        responseToUser.classList.toggle('errorcolor');
        return
    }
}

function sendReq(reqData, address, reqtype){
    let url = '//localhost/auth/' + address;

    xhr = new XMLHttpRequest();
    xhr.open('POST', url, false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(reqData)
    let response = xhr.responseText
    switch (reqtype) {
        case 'registration':
            responseforuser(response)
            break;
        case 'login':
            tokensave(response)
            break;
        
        default:
            break;
    }
    
}
function responseforuser(statusResponse){
    let response = JSON.parse(statusResponse)
    let responseToUser = document.getElementById('responseToUser');
    if(response.success == false){

        responseToUser.innerHTML = response.message;
        responseToUser.classList.toggle('hidden');
        responseToUser.classList.toggle('errorcolor');

    }else if (response.success == true){
        responseToUser.innerHTML = response.message;
        if(responseToUser.classList.contains('errorcolor')){
            responseToUser.classList.toggle('errorcolor');
        }else if(responseToUser.classList.contains('hidden')){
            responseToUser.classList.toggle('hidden');
        }
        responseToUser.classList.toggle('successcolor');
        
        setTimeout(function() {
            window.location.reload();
        }, 2000);
    }
}
function loginSubmit(){
    let userlogin = document.getElementById('userlogin').value;
    let userpassword = document.getElementById('userpass').value;
    if(userlogin == '' || userpassword == ''){
        console.log('пароль или логин пустой');
        return;
    }
    let reqData = 'username=' + userlogin + '&password=' + userpassword;
    let target = 'login/index.php'
    sendReq(reqData,target,'login');
}
function tokensave(statusResponse){
    let response = JSON.parse(statusResponse);
    let userMessage = document.getElementById('loginMessageToUser');
    if (response.success == true) {
        console.log('logok');
        setCookie('token',response.token, 1)
        if(userMessage.classList.contains('hidden')){
            userMessage.classList.toggle('hidden')
        }
        if(userMessage.classList.contains('errorcolor')){
            userMessage.classList.toggle('errorcolor')
        }
        if(!userMessage.classList.contains('successcolor')){
            userMessage.classList.toggle('successcolor')
        }
        userMessage.innerHTML = 'Успешный вход'
        setTimeout(function() {
            window.location.reload();
        }, 2000);
    }else if (response.success == false){
        //вывести ошибку о том что не удалось зайти
        console.log('logfalse');
        if(userMessage.classList.contains('hidden')){
            userMessage.classList.toggle('hidden')
        }
        if(!userMessage.classList.contains('errorcolor')){
            userMessage.classList.toggle('errorcolor')
        }
        if(userMessage.classList.contains('successcolor')){
            userMessage.classList.toggle('successcolor')
        }
        userMessage.innerHTML = response.error
    }
}