/** on va gere le localstorage enregistrer et le reutiliser dans la page cart **/

function addBasket(product) {
  // on ajoute le produit dans le localStorage
  let basket = getBasket();
  //trouver le produit dont le id corespond a l'id du produit
  let foundIndex = basket.findIndex(
    (p) => p.id == product.id && p.color == product.color
  );
  const foundProduct = basket[foundIndex];
  if (foundProduct) {
    //si le produit existe  ajouter la quantite
    foundProduct.quantity += product.quantity;

    basket[foundIndex] = foundProduct;
  } else {
    // si le produit n'existe pas ajouter le produit avec une quantite initial de 1    //product.quantity = 1;
    basket.push(product);
  }
  saveBasket(basket);
}
function saveBasket(basket) {
  // enregistrement du produit
  localStorage.setItem("kanapOpcLocalStorage", JSON.stringify(basket));
}
function getBasket() {
  // recuperation du localStorage
  let basket = localStorage.getItem("kanapOpcLocalStorage");
  if (basket == null) {
    // si le localStorage est vide afficher un tableau
    return [];
  } else {
    // si c'est pas vide recuperer le localStorage en faisant un parse
    return JSON.parse(basket);
  }
}

function quantityChanged() {
  let basket = getBasket();
  let quantityInputChange = document.getElementsByClassName("itemQuantity");
  for (let i = 0; i < quantityInputChange.length; i++) {
    let input = quantityInputChange[i];
    input.addEventListener("change", function (event) {
      let input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      saveBasket(basket);
    });
  }
}

async function getTotalPriceAndQuantity() {
  const allProducts = await getAllProducts();
  let basket = getBasket();
  let total = 0;
  let quantity = 0;
  for (let product of basket) {
    const singleProduct = allProducts.find((p) => p._id == product.id);
    const singlePrice = singleProduct.price;
    console.log(singlePrice);
    //parcourire le localStorage pour calculer le prix total
    total += Number(product.quantity) * Number(singlePrice);
    quantity += Number(product.quantity);
  }
  return [total, quantity];
}
