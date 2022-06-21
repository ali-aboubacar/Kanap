// affichage du produit a l'unite
function getUrlId() {
  //recuperation de l'id dans l'Url
  const queryString_urlId = window.location.search;
  const urlSearchParams = new URLSearchParams(queryString_urlId);
  //on recupere le name= just avant l'id
  const id = urlSearchParams.get("id");
  return id;
}

async function getOneProduct() {
  const id = getUrlId();
  //on recupere tous les produit dans l'api
  const config = await loadConfig();
  const res = await fetch(config.host + `/api/products/${id}`);
  const singleProduct = await res.json();

  return singleProduct;
}
async function DisplayProduct() {
  const id = getUrlId();
  const singleProduct = await getOneProduct();
  const addToCart = document.querySelector("#addToCart");
  const colors = document.querySelector("#colors");
  if (singleProduct._id === id) {
    document.title = singleProduct.name;
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
      const optionHtml = `<option value="${color}">${color}</option>`;
      colors.insertAdjacentHTML("beforeend", optionHtml);
    }
  }
  //ajouter un event listner au boutton addToCart
  addToCart.addEventListener("click", function () {
    //declaration des variable pour recupere le data
    //et le stockee dans le locastorage
    let productQty = document.getElementById("quantity");
    let colorChoiceInput = document.getElementById("colors");
    let color = colorChoiceInput.value;
    let quantity = parseInt(productQty.value);
    //declaration du tableau qui va contenire tout les valeurs
    let choice = { id, color, quantity };
    if (!color || !quantity) {
      alert("la couleur et la quatiter sont obligatoir");
    } else {
      addBasket(choice);
      document.location.href = "./cart.html";
    }
  });
}

DisplayProduct();
