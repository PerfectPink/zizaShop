function renderList() {
    let db = getdb()
    let tmpl = document.getElementById('tmp-contentblock-item');
    let targetPlace = document.getElementById('targetPlace');

    // db.forEach(element => {
    //     targetPlace.innerHTML += tmpl.innerHTML.replace('--title',element.title)
    //     .replace('--taste',element.taste)
    //     .replace('--size',element.size)
    //     .replace('--pgvg',element.pgvg)
    //     .replace('--price',element.price)
    //     .replace('--article',element.id)
    //     .replace('--article',element.id)
    // });

    for (let count = 0; count < 8; count++) {
        targetPlace.innerHTML += tmpl.innerHTML.replace('--title', db[count].title)
            .replace('--taste', db[count].taste)
            .replace('--size', db[count].size)
            .replace('--pgvg', db[count].pgvg)
            .replace('--price', db[count].price)
            .replace('--article', db[count].id)
            .replace('--article', db[count].id)
    }

}

function getdb() {
    let url = 'http://localhost:80/api/get/?getdb';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send()
    let response = xhr.responseText;
    var dblist = JSON.parse(response);
    return dblist;
}



window.onload = renderList()
window.onload = checkCartStorage()
window.onload = cartAmountCounter()
//dev 
function clearLs() {
    window.localStorage.clear()
}