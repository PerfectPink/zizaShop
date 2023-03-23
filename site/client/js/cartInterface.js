let cartPlacement = document.getElementById('goodsPlacement');
let emptytmpl = document.getElementById('tmpl-empty-cart');
let lsCart = JSON.parse(localStorage.getItem('cartStorage'));
let cartCard = document.getElementById('itemCard')
let pricePlace = document.getElementById('priceTotal')
let totalPrice = 0

function renderCart() {
    if (lsCart == undefined || lsCart.length == 0) {
        console.log('asdssa');
        cartPlacement.innerHTML = 'Корзина пуста' //emptytmpl
        totalPrice = 0
        priceCounter()
        return
    }
    cartPlacement.innerHTML = '';
    let userItems = []
    for (let i = 0; i < lsCart.length; i++) {
        userItems.push(lsCart[i]['id'])
    }
    userItems = JSON.stringify(userItems)
    $.ajax({
        url: '//localhost/classes/getcart.php',
        method: 'get',
        dataType: 'text',
        data: { text: userItems },
        success: function (data) {
            userCartRender(data);
        }
    });
    function userCartRender(data) {
        let goodsData = JSON.parse(data)
        let goodAmount = 0;
        totalPrice = 0;
        for (let i = 0; i < goodsData.length; i++) {
            lsCart.forEach(element => {
                if (goodsData[i].id == element.id) {
                    goodAmount = element.amount
                }
            });
            cartPlacement.innerHTML += cartCard.innerHTML.replace('--title', goodsData[i].title)
                .replace('--price', goodsData[i]['price'])
                .replace('--amount', goodAmount)
                .replace('--article', goodsData[i]['id'])
            totalPrice += goodsData[i].price * goodAmount


        }

        priceCounter()
    }
    function priceCounter() {
        pricePlace.innerHTML = totalPrice
        //totalPrice += goodsData[i].price * lsCart[i].amount
    }
}

function deleteItem(element, amount) {
    let deletingId = $(element).parent().data('article');
    for (let i = 0; i < lsCart.length; i++) {
        if (lsCart[i].id == deletingId) {
            if (amount == 'single') {
                if (lsCart[i].amount - 1 == 0) {
                    lsCart.splice(i, 1)
                } else {
                    lsCart[i].amount -= 1
                }
            } else if (amount == 'all') {
                lsCart.splice(i, 1)
            }
            saveLs()
            renderCart()
        }

    }

    //сделать удаление всего товара // функция сейва
}
function addItem(element) {
    let addId = $(element).parent().data('article');
    lsCart.forEach(element => {
        if (element.id == addId) {
            element.amount += 1
            renderCart()
            saveLs()
        }
    });

}
function saveLs() {
    localStorage.setItem('cartStorage', JSON.stringify(lsCart))
}
function sendRequest(reqTarget, data) {
    $.ajax({
        url: '//localhost/classes/Order.php',
        method: 'post',
        dataType: 'text',
        data: { text: data },
        success: function (responseData) {
            console.log(responseData);
        }

    });
}
function makeOrder() {
    let userOrderItems = localStorage.getItem('cartStorage') //локал сторадж
    userOrderItems = JSON.stringify(userOrderItems)
    let useradress = document.getElementById('adressInput').value // адрес
    // let username = 'admin'
    if (useradress == null || useradress == "" || totalPrice == 0) {
        console.log('adress is empty or cart is empty');
        return
    }
    let usertoken = getCookie('token')

    if (usertoken == '') { // проверка валидности печеньки
        console.log('провалена проверка куки');
        return
    }

    // let senderInfo = [userOrderItems,useradress, username]
    // sendRequest(1,senderInfo)
    let orderData = "userhash=" + usertoken + '&address=' + useradress + '&orderlist=' + userOrderItems;
    //Отправка
    xhr = new XMLHttpRequest();
    xhr.open('POST', '//localhost/handler/Order.php', false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(orderData)
    // lsCart = []
    // saveLs()
    // renderCart()
}

function saveUserAddress() {
    let useradress = document.getElementById('adressInput').value
    let usertoken = getCookie('token');
    if (useradress == null || useradress.trim() == "") {
        alert('нельзя сохранить пустой адрес');
        return;
    } else {
        if (usertoken != '') {
            let addressData = "type=" + "saveaddress" + '&address=' + useradress + '&token=' + usertoken;
            xhr = new XMLHttpRequest();
            xhr.open('POST', '//localhost/handler/UserAdress.php', false)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(addressData)
        } else {
            return
        }
    }
}
function renderSavedAddress() {
    let useradress = document.getElementById('adressInput');
    let usertoken = getCookie('token');
    if (usertoken != '') {
        let addressData = "type=" + "getaddress" + '&token=' + usertoken;
        xhr = new XMLHttpRequest();
        xhr.open('POST', '//localhost/handler/UserAdress.php', false)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(addressData)
        let response = xhr.responseText
        useradress.value = response;
        return;
    } else {
        return
    }


}

window.onload = renderCart()
window.onload = renderSavedAddress()