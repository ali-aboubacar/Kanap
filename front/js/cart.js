/* on va gere la le panier  */
function local(listItems) {
  listItems = getProducts();
  //loop pour parcourire le tableau dans le localStorage
  for (let item of listItems) {
    //on recupere l'id dans les localstorage
    let id = item[0];
    let color = item[3];
    let quantity = item[4];
    loadConfig().then((data) => {
      config = data;
      //on fait un fetch pour recupere les donner dans l'api par id
      fetch(config.host + `/api/products/${id}`)
        .then((data) => data.json())
        .then((singleProduct) => {
          //si l'id qui se trouve dans le localStorage est egale a l'id du produit
          if (id === singleProduct._id) {
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
  }
}

local();
