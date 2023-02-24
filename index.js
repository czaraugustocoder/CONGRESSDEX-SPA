const pagina = document.querySelector("#root");

const anchorDep = document.createElement('a');

const anchorHome = document.createElement('a');

anchorHome.href = '#Home';

anchorDep.href = '#Deputado';

function change(){
    window.addEventListener("hashchange", function(){
        if (window.location.hash == "#Home") {
            home();
        }
    })
}

async function getData(){
    const data = await fetch("https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome");
    dataJson = await data.json()
    console.log(dataJson.dados);
    return dataJson.dados;
}

window.addEventListener("load", () => {
    home();
    change();
});