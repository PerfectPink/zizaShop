let token = getCookie('token');

function sendReq(target, Data, type){
    let sendData
    xhr = new XMLHttpRequest();
    let url = "//localhost/" + target
    xhr.open('POST', url, false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    switch (type) {
        case 'validation':
            sendData = 'token=' + Data;
            xhr.send(sendData)
            break
        case 'getInfo':
            sendData = 'token=' + Data;
            xhr.send(sendData)
            console.log('send getinfo');
            break
        case 'getInfoShort':
            sendData = 'token=' + Data + '&shortinfo=' + true;
            xhr.send(sendData)
            console.log('send getinfo');
            break
        default:
            console.log("ошибка в switch sendReq");
            break;
    }
    
    return xhr.responseText
}

function checkUserValid(){
    if (token == ''){
        renderAuthForm()
    }else{
        renderAccountPage()
    }
}



function renderAuthForm(){
    let tmpl = document.getElementById('authForm-tmpl').innerHTML;
    let targetPlace = document.getElementById('accountPageContent');
    targetPlace.innerHTML = tmpl;
}
function renderAccountPage(){
    let tmpl = document.getElementById('userAccount-tmpl')
    let targetPlace = document.getElementById('accountPageContent');
    let validation = sendReq('auth/validation/index.php',token, 'validation')
    validation = JSON.parse(validation)
    if (validation.success == true) {
        targetPlace.innerHTML += tmpl.innerHTML;
        renderMyAccount();
    }else{
        //вывод об ошибке прохода проверки валидации
    }
}

function renderMyOrders(){
    let ordertmpl = document.getElementById('singleOrder-tmpl');
    let targetPlace = document.getElementById('renderAccTask');
    let userdata = sendReq('handler/getUserInfo.php',token, 'getInfo')
    userdata = JSON.parse(userdata);
    targetPlace.innerHTML = '';
    console.log(userdata);

    //переменные для отрисовки заказов
    let userorders = userdata.userorders;
    let orderstatus
    let arraylist
    let singleOrderPlace
    let orderListing

    userorders.forEach(element => {
        if(element.status == null){
            orderstatus = 'не обработано'
        }
        targetPlace.innerHTML += ordertmpl.innerHTML.replace('--address',element.address)
        .replace('--date', element.date)
        .replace('--status',orderstatus)
        .replace('--id',element.id)
        .replace('--id',element.id)
        arraylist = element.orderlist
        arraylist = JSON.parse(arraylist)
        console.log(arraylist);
        arraylist.forEach(singleorder => {
            singleOrderPlace = document.getElementById('hiddenOrder' + element.id)
            orderListing = document.getElementById('orderListing-tmpl');
            singleOrderPlace.innerHTML += orderListing.innerHTML.replace('++id',singleorder.id)
            .replace('++amount', singleorder.amount)
        });
    });


}
function rebderChangePassword(){

}
function renderDeleteAccount(){

}
function renderMyAccount(){
    let tmpl = document.getElementById('accInfo-tmpl');
    let targetPlace = document.getElementById('renderAccTask');
    let userdata = sendReq('handler/getUserInfo.php',token, 'getInfoShort')
    userdata = JSON.parse(userdata);
    let useraddress
    if (userdata.address == null){
        useraddress = 'Вы не добавили адрес';
    }else{
        useraddress = userdata.address;
    }
    targetPlace.innerHTML = tmpl.innerHTML.replace('--username', userdata.username)
        .replace('--usermail', userdata.usermail)
        .replace('--useraddress', useraddress)
    console.log(userdata);
}
window.onload = checkUserValid();

function fullOrderList(id){
    let orderlist = document.getElementById('hiddenOrder' + id)
    orderlist.classList.toggle('hidden')
}
//dev

// let userdata = sendReq('handler/getUserInfo.php',token, 'getInfo')
//         userdata = JSON.parse(userdata)
//         console.log(userdata);