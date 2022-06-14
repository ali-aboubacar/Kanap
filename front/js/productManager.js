// Recupere la chaine de charactere dans l'url
const queryString_urlId = window.location.search;

//methode 1 pour extriare juste l'id
//const id = queryString_urlId.slice(4);
const urlSearchParams = new URLSearchParams(queryString_urlId);
//on recupere le name= just avant l'id
const id = urlSearchParams.get("id");
//on fait reference au config.json pour le developpement ou production
loadConfig().then((data) => {
  config = data;

  fetch(config.host + `/api/products/${id}`) //grace au accent grave on integre le const declarer juste avant
    .then((res) => res.json())
    //on recupere le produit dans un tableau
    .then((singleProduct) => {
      //si la variable enregistre par le urlSearchParams = id du tableau effectue le code suivant
      if (id === singleProduct._id) {
        document.getElementsByTagName(
          "title"
        ).innerText += `${singleProduct.name}`;
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
          ).innerHTML += `<option value="${color}">${color}</option>`;
        }
      }
      //boutton ajouter au panier
      document
        .querySelector("#addToCart")
        .addEventListener("click", function () {
          //declaration des variable pour recupere le data
          //et le stockee dans le locastorage
          let productQty = document.getElementById("quantity");
          let colorChoiceInput = document.getElementById("colors");
          let color = colorChoiceInput.value;
          let price = singleProduct.price;
          let quantity = parseInt(productQty.value);
          //declaration du tableau qui va contenire tout les valeurs
          let choice = { id, color, price, quantity };
          if (!color || !quantity) {
            alert("la couleur et la quatiter sont obligatoir");
          } else {
            addBasket(choice);
            document.location.href = "./cart.html";
          }
        });
    });
});
