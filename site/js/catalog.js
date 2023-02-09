// function renderList() {
//     let db = getdb()
//     let tmpl = document.getElementById('tmp-contentblock-item');
//     let targetPlace = document.getElementById('goodsPlacement');

//     db.forEach(element => {
//         targetPlace.innerHTML += tmpl.innerHTML.replace('--title',element.title)
//         .replace('--brand',element.brand)
//         .replace('--taste',element.taste)
//         .replace('--size',element.size)
//         .replace('--pgvg',element.pgvg)
//         .replace('--price',element.price)
//         .replace('--article',element.id)
//         .replace('--article',element.id)
//     });


// }

function getdb(filter, filtername) {
    
    if (filter != undefined && filtername != undefined) {
        var url = 'http://localhost:8090/api/get/?getdb' + '&'+ 'filtername=' + filtername +'&' + 'filter=' + filter 
        console.log(url);
    }else{
        var url = 'http://localhost:8090/api/get/?getdb';
        console.log(url);
    }

    console.log(this.specific);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send()
    let response = xhr.responseText;
    var dblist = JSON.parse(response);
    return dblist;
}

function filterRender(filter, filtername){
    let db = getdb(filter, filtername)
    let tmpl = document.getElementById('tmp-contentblock-item');
    let targetPlace = document.getElementById('goodsPlacement');
    targetPlace.innerHTML = "";

    // console.log(db);


    db.forEach(element => {
        targetPlace.innerHTML += tmpl.innerHTML.replace('--title',element.title)
        .replace('--brand',element.brand)
        .replace('--taste',element.taste)
        .replace('--size',element.size)
        .replace('--pgvg',element.pgvg)
        .replace('--price',element.price)
        .replace('--article',element.id)
        .replace('--article',element.id)
    });


}


// dev 

function check(checkdata){
    console.log(checkdata);
}
