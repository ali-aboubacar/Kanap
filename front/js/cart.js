/* on va gere la le panier  */
function local(basket) {
  basket = getBasket();
  //loop pour parcourire le tableau dans le localStorage
  for (let item of basket) {
    //on recupere l'id dans les localstorage
    let { id, color, quantity } = item;
    loadConfig().then((data) => {
      config = data;
      products = fetch(config.host + `/api/products`)
        .then((res) => res.json())
        .then((allProducts) => {
          for (let singleProduct of allProducts) {
            return singleProduct._id;
          }
        });
      //on fait un fetch pour recupere les donner dans l'api par id
    });
  }
  document.getElementById("totalQuantity").innerHTML += getNumberProduct();
  document.getElementById("totalPrice").innerHTML += getTotalPrice();
}

local();
