function toCart(addItemid) {
    checkCartStorage()
    cartarr = JSON.parse(localStorage.getItem("cartStorage"));
    let validate = false
    for (let i = 0; i < cartarr.length; i++) {

        if (cartarr[i]['id'] == addItemid) {
            cartarr[i]['amount']++
            localStorage.setItem("cartStorage", JSON.stringify(cartarr))
            validate = true
            cartAmountCounter()
            return
        }
    }
    if (validate == false) {
        cartarr.push({ 'id': addItemid, 'amount': 1 })
        localStorage.setItem("cartStorage", JSON.stringify(cartarr))
        console.log(localStorage.getItem("cartStorage"));
    }
    cartAmountCounter()

}