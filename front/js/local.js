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

function removeFromBasket() {
  let removeItemBtn = document.getElementsByClassName("deleteItem");
  for (let i = 0; i < removeItemBtn.length; i++) {
    let button = removeItemBtn[i];
    button.addEventListener("click", function (event) {
      let btnClicked = event.target;
      const article =
        btnClicked.parentElement.parentElement.parentElement.parentElement;
      const id = article.dataset.id;
      const color = article.dataset.color;
      const basket = getBasket();
      const index = basket.findIndex((p) => p.id == id && p.color == color);
      basket.splice(index, 1);
      saveBasket(basket);
      article.remove();
    });
  }
}
function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    //parcourire le localStorage pour avoir le nombre de produit ajouter
    number += product.quantity;
  }
  return number;
}

function getTotalPrice() {
  let basket = getBasket();
  let total = 0;
  for (let product of basket) {
    //parcourire le localStorage pour calculer le prix total
    total += product.quantity * product.price;
  }
  return total;
}
