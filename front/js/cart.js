/* on va gere la le panier  */
function local(basket) {
  basket = getBasket();
  //loop pour parcourire le tableau dans le localStorage
  /*products = loadConfig().then((data) => {
    config = data;
    fetch(config.host + `/api/products`)
      .then((res) => res.json())
      .then((allProducts) => {
        return allProducts;
      });
  });
  console.log(products);*/
  for (let item of basket) {
    // loop pour recuperer les id dans les localStorage
    let { id, color, quantity } = item;
    loadConfig().then((data) => {
      config = data;
      fetch(config.host + `/api/products/${id}`) //on recu
        .then((res) => res.json())
        .then((singleProduct) => {
          if (id == singleProduct._id) {
            document.getElementById(
              "cart__items"
            ).innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
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
        });
    });
    //document.querySelectorAll(".deleteItem").innerHTML += removeFromBasket();
  }
  //on fait un fetch pour recupere les donner dans l'api par id
  document.getElementById("totalQuantity").innerHTML += getNumberProduct();
  document.getElementById("totalPrice").innerHTML += getTotalPrice();
}

local();
