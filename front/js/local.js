/** on va gere le localstorage enregistrer et le reutiliser dans la page cart **/

function addBasket(product) {
  // on ajoute le produit dans le localStorage
  let basket = getBasket();
  //trouver le produit dont le id corespond a l'id du produit
  let foundProduct = basket.find((p) => p.id == product.id);
  if (foundProduct != undefined && foundProduct.color == product.color) {
    //si le produit existe  ajouter la quantite
    foundProduct.quantity++;
  } else {
    // si le produit n'existe pas ajouter le produit avec une quantite initial de 1    //product.quantity = 1;
    product.quantity = 1;
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
function changeQuantity(product, quantity) {
  // changer la quantite deja enregistrer dans le panier
  let basket = getBasket();
  let foundProduct = basket.find((p) => p.id == product.id); // trouver le produit selectionner
  if (foundProduct != undefined) {
    // si le produit existe ajouter la quantiter
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      //si le produit a une quantiter inferieur a 0 effacer le produit du pannier
      removeFromBasket(product);
    } else {
      // si non enregistrer le produit
      saveBasket(basket);
    }
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
