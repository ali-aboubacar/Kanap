// Recupere la chaine de charactere dans l'url
const queryString_urlId = window.location.search;

//methode 1 pour extriare juste l'id
//const id = queryString_urlId.slice(4);
const urlSearchParams = new URLSearchParams(queryString_urlId);
//on recupere le name= just avant l'id
const id = urlSearchParams.get("id");

fetch(`http://localhost:3000/api/products/${id}`) //grace au accent grave on integre le const declarer juste avant
  .then((data) => data.json())
  //on recupere le produit dans un tableau
  .then((singleProduct) => {
    //si la variable enregistre par le urlSearchParams = id du tableau effectue le code suivant
    if (id == singleProduct._id) {
      document.querySelector("#title").innerText += `${singleProduct.name}`;
      document.querySelector(
        ".item__img"
      ).innerHTML += `<img src="${singleProduct.imageUrl}" alt="${singleProduct.altTxt}">`;
      document.querySelector("#price").innerText += `${singleProduct.price}`;
      document.querySelector(
        "#description"
      ).innerText += `${singleProduct.description}`;
      // vue que colors est un tableau on va faire un loop pour le parcourire
      for (let color of singleProduct.colors) {
        document.querySelector(
          "#colors"
        ).innerHTML += `<option value="">${color}</option>`;
      }
    }
  });
