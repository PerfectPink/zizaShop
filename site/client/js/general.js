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
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }