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
        targetPlace.innerHTML += tmpl.innerHTML.replace('--title',db[count].title)
        .replace('--taste',db[count].taste)
        .replace('--size',db[count].size)
        .replace('--pgvg',db[count].pgvg)
        .replace('--price',db[count].price)
        .replace('--article',db[count].id)
        .replace('--article',db[count].id)
    }

}

function getdb() {
    let url = 'http://localhost:8090/api/get/?getdb';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send()
    let response = xhr.responseText;
    var dblist = JSON.parse(response);
    return dblist;
}

function cartadd(goodId){
    console.log(goodId);
}

window.onload = renderList()