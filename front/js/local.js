/** on va gere le localstorage enregistrer et le reutiliser dans la page cart **/

function addBasket(product) {
  // on ajoute le produit dans le localStorage
  let basket = getBasket();
  //trouver le produit dont le id corespond a l'id du produit
  let foundIndex = basket.findIndex((p) => p.id == product.id);
  const foundProduct = basket[foundIndex];
  if (foundProduct && foundProduct.color == product.color) {
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
function removeFromBasket(product) {
  // suprimer un produit par id
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product.id); // on utilise != pour supprimer que le produit slectionner. == va supprimer tous les produit sauf celle selectionner
  saveBasket(basket);
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
