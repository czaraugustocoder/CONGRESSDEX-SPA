async function home() {
    window.location = anchorHome;
    pagina.innerHTML = " ";
    const result = await getData();
    for (let a = 0; a < result.length; a++) {
        let img = document.createElement("img");
        let div = document.createElement("div");
        let name = document.createElement("h5");
        let partido = document.createElement("h6")
        img.src = result[a].urlFoto;
        name.innerHTML = result[a].nome;
        partido.innerHTML = result[a].siglaPartido;
        img.className = "foto_deputado";
        div.className = "card_deputado";
        div.setAttribute("id",result[a].id);
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(partido);
        console.log(div)
        pagina.insertAdjacentElement('afterbegin', div);
    }
    // adição de eventlistenner nos cards
    let cards = document.querySelectorAll(".card_deputado");
    console.log(cards);
    for (let c = 0; c < cards.length; c++){
        let element = cards[c];
        element.addEventListener("click", () => {
            let elementId = element.id;
            console.log(elementId);
            linkDep = "https://dadosabertos.camara.leg.br/api/v2/deputados/"+elementId;
            getDepData(linkDep);
        })
    }
}

async function getDepData(urlDep){
    window.location = anchorDep;
    pagina.innerHTML = " ";
    let depData = await fetch(urlDep);
    depDataJson = await depData.json();
    console.log(depDataJson.dados);

    let imagem_dep = document.createElement("img");
    imagem_dep.src = depDataJson.dados.ultimoStatus.urlFoto;

    pagina.appendChild(imagem_dep);

    let name_dep_card = document.createElement("h3");
    name_dep_card.innerHTML = depDataJson.dados.ultimoStatus.nomeEleitoral;

    pagina.appendChild(name_dep_card);

    let name_partido = document.createElement("h3");
    name_partido.innerHTML = `Partido: ${depDataJson.dados.ultimoStatus.siglaPartido}`;

    pagina.appendChild(name_partido);

    let name_civil = document.createElement("h3");
    name_civil.innerHTML = `Nome Civil: ${depDataJson.dados.nomeCivil}`;

    pagina.appendChild(name_civil);

    let email = document.createElement("h3");
    email.innerHTML = `E-mail: ${depDataJson.dados.ultimoStatus.email}`;

    pagina.appendChild(email);
   
}