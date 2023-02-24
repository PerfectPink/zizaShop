// function sendRequest(sendData, adress) {
//     let path = '//localhost/classes/' + adress + '.php';
//     fetch(path, {
//         method: 'POST',
//         body: sendData
//     }).then(function (response) { return response }).catch(function (error) { console.log(error); })
// }



function checkCartStorage() {
    if (localStorage.getItem("cartStorage") === null) {
        let cartStorageBlank = []
        localStorage.setItem("cartStorage", JSON.stringify(cartStorageBlank))
    } else {
        return
    }
}
function cartAmountCounter() {
    let lsCart = JSON.parse(localStorage.getItem('cartStorage'))
    let counter = 0
    let counterOnPage = document.getElementById('cartCount')
    if (lsCart == undefined) {
        counter = "пуста"
    } else {
        lsCart.forEach(element => {
            counter += element['amount']
        });
    }
    counterOnPage.innerHTML = counter
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function renderUsername() {
    let usernameBlock = document.getElementById('usernameSpace');

    console.log(usernameBlock);
    if (usernameBlock == null) {
        return
    } else {
        if (!getCookie('token') == '') {

            let username = getUsername(getCookie('token'))
            usernameBlock.innerHTML = '<span>' + username + '</span><a onclick="userLogout()" class="cursourhover authlink">выйти</a>'
        } else {
            usernameBlock.innerHTML = '<a href="http://localhost/client/html/auth.html" class="authlink cursourhover">Войти/Регистрация</a>'
        }


    }
}
function getUsername(token) {
    let usernameLs = localStorage.getItem('username')
    if (usernameLs === null || usernameLs === 'null') {
        let url = '//localhost/auth/username/index.php';
        xhr = new XMLHttpRequest();
        xhr.open('POST', url, false)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('token=' + token)
        console.log(xhr.responseText);
        let responseUsername = xhr.responseText;
        responseUsername = JSON.parse(responseUsername)
        console.log(responseUsername.username);
        localStorage.setItem('username',responseUsername.username)
        return responseUsername.username;
    } else {
        console.log('ретёрн вот это');
        return localStorage.getItem('username')
    }
}
function userLogout() {
    let url = '//localhost/auth/logout/index.php';
    let token = getCookie('token')
    console.log(token);
    xhr = new XMLHttpRequest();
    xhr.open('POST', url, false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('token=' + token)

    //проверка на успех logout
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.setItem('username', null)
    window.location.reload()
}
window.onload = renderUsername()