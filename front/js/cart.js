/* on va gere la le panier  */
async function getAllProducts() {
  //loop pour parcourire le tableau dans le localStorage
  const url = await loadConfig();
  const res = await fetch(url.host + `/api/products`);
  const allProducts = await res.json();

  return allProducts;
}
async function displayBasket() {
  const basket = getBasket();
  const allProducts = await getAllProducts();
  const cartItem = document.getElementById("cart__items");
  let htmlString = "";
  for (let item of basket) {
    // loop pour recuperer les id dans les localStorage
    let { id, color, quantity } = item;
    const singleProduct = allProducts.find((p) => p._id == id);
    htmlString += `<article class="cart__item" data-id=${id} data-color=${color}>
                <div class="cart__item__img">
                  <img src="${singleProduct.imageUrl}" alt="${singleProduct.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${singleProduct.name}</h2>
                    <p>${color}</p>
                    <p>${singleProduct.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  }
  cartItem.innerHTML = htmlString;
  removeFromBasket();
}

//on fait un fetch pour recupere les donner dans l'api par id
document.getElementById("totalQuantity").innerHTML += getNumberProduct();
document.getElementById("totalPrice").innerHTML += getTotalPrice();

displayBasket();

function cartForm() {
  document
    .querySelector('form input[type="submit"]')
    .addEventListener("click", function () {
      let valid = true;
      for (let input of document.querySelectorAll("form input")) {
        valid &= input.reportValidity();
        if (!valid) {
          break;
        }
      }
      if (valid) {
        alert("votre message a ete envoyer");
        document.location.href = "./confirmation.html";
      }
    });
}
cartForm();
