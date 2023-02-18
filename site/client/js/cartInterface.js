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
                if (goodsData[i].id == element.id){
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
            if(amount == 'single'){
                if (lsCart[i].amount - 1 == 0) {
                    lsCart.splice(i, 1)
                } else {
                    lsCart[i].amount -= 1
                }
            }else if(amount == 'all'){
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
function sendRequest(reqTarget, data){
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
function makeOrder(){
    let userOrderItems = localStorage.getItem('cartStorage') //локал сторадж
    let useradress = document.getElementById('adressInput').value // адрес
    let username = 'admin'
    if(useradress == null || useradress == "" || totalPrice == 0){
        console.log('adress is empty or cart is empty');
        return
    }
    let senderInfo = [userOrderItems,useradress, username]
    sendRequest(1,senderInfo)
    lsCart = []
    saveLs()
    renderCart()
}
window.onload = renderCart()