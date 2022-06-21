/* on va gere la le panier  */
async function getAllProducts() {
  //on recupere tous les produit dans l'api
  const config = await loadConfig();
  const res = await fetch(config.host + `/api/products`);
  const allProducts = await res.json();

  return allProducts;
}
//Affichage des produit enregistrer dans le localStorage
async function displayBasket() {
  const basket = getBasket();
  const allProducts = await getAllProducts(); //recuperation des produits
  const cartItem = document.getElementById("cart__items");
  //on declare un string vide qui va se remplire a chaque passage de boucle
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
  addRemoveListner();
  addQuantityChangeListener();
}
//supprimer les article du pannier
function addRemoveListner() {
  let removeItemBtn = document.getElementsByClassName("deleteItem");
  //parcourire tous les boutton supprimer
  for (let i = 0; i < removeItemBtn.length; i++) {
    let button = removeItemBtn[i];
    button.addEventListener("click", function (event) {
      let btnClicked = event.target;
      const article =
        btnClicked.parentElement.parentElement.parentElement.parentElement; //localiser le parent article
      const id = article.dataset.id; //recuperration des dataset de l'element clicker
      const color = article.dataset.color;
      const basket = getBasket();
      //find index cherche l'id et la couleur declarer avec le dataset
      const index = basket.findIndex((p) => p.id == id && p.color == color);
      basket.splice(index, 1);
      saveBasket(basket);
      article.remove();
      updatePriceAndQuatity();
    });
  }
}
//changer la quatiter dans le panier directement
function addQuantityChangeListener() {
  let basket = getBasket();
  let quantityInputChange = document.getElementsByClassName("itemQuantity");
  for (let i = 0; i < quantityInputChange.length; i++) {
    //parcourire tout les champs des input quantity
    let quantityChange = quantityInputChange[i];
    quantityChange.addEventListener("change", function (event) {
      let newQuantity = event.target;
      // recuperation du dataset
      const article =
        newQuantity.parentElement.parentElement.parentElement.parentElement;
      const id = article.dataset.id;
      //recherche du produit dans le localstorage
      let findIndex = basket.findIndex((p) => p.id == id);
      const foundProduct = basket[findIndex];
      //si foundProduct est true ajouter la quantite
      if (foundProduct) {
        foundProduct.quantity++;
      }
      saveBasket(basket);
      updatePriceAndQuatity();
    });
  }
}

//mettre a jour le prix et la quantiter apres la suppression d'un element
async function updatePriceAndQuatity() {
  const totalQuantity = document.getElementById("totalQuantity");
  const totalPrice = document.getElementById("totalPrice");
  //recuperation de la fonction getTotalPrice And Quantity qui retoune un tableau
  const totalPriceAndQuantity = await getTotalPriceAndQuantity();
  totalQuantity.innerHTML = totalPriceAndQuantity[1];
  totalPrice.innerHTML = totalPriceAndQuantity[0];
}
updatePriceAndQuatity();
displayBasket();
//validation du form
function getValidation() {
  document
    .querySelector('form input[type="submit"]')
    .addEventListener("click", function (e) {
      e.preventDefault();
      let firstName = document.getElementById("firstName");
      let firstNameError = document.getElementById("firstNameErrorMsg");
      let lastName = document.getElementById("lastName");
      let lastNameError = document.getElementById("lastNameErrorMsg");
      let address = document.getElementById("address");
      let addressError = document.getElementById("addressErrorMsg");
      let city = document.getElementById("city");
      let cityError = document.getElementById("cityErrorMsg");
      let email = document.getElementById("email");
      let nameRegex = /^[a-zA-Z-\s]+$/;
      let addressRegex = /^[a-zA-Z',.\s-]{1,25}$/;
      let cityRegex = /^[[:alpha:]]([-' ]?[[:alpha:]])*$/;

      if (firstName.validity.valueMissing) {
        firstNameError.textContent = "veuillez renseigner ce champs";
        firstNameError.style.color = "red";
        return;
      } else if (nameRegex.test(firstName.value) == false) {
        firstNameError.textContent =
          "prenom n'accepte pas les chiffre et les symbole";
        firstNameError.style.color = "orange";
        return;
      } else {
        firstNameError.textContent = "Champ valide";
        firstNameError.style.color = "green";
      }
      if (address.validity.valueMissing) {
        addressError.textContent = "veuillez renseigner ce champs";
        addressError.style.color = "red";
        return;
      } else if (addressRegex.test(address.value) == false) {
        addressError.textContent =
          "prenom n'accepte pas les chiffre et les symbole";
        addressError.style.color = "orange";
        return;
      } else {
        addressError.textContent = "Champ valide";
        addressError.style.color = "green";
      }
      postInfoAndContact();
    });
}
getValidation();

//recupere les donner saisie par l'utilisateur et les produit dans le pannier
function getUserInfoAndProducts() {
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let address = document.getElementById("address");
  let city = document.getElementById("city");
  let email = document.getElementById("email");
  //recuperer les id des produit dans le panier
  const products = getProductsId();
  //recupere les valeur saisie par l'utilisateur
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  return { products, contact };
  //console.log(contact, products);
}
//envoi des donner dans l'api
async function postInfoAndContact() {
  const userInfo = getUserInfoAndProducts();
  //recuperation du load config qui recupere config.json
  const config = await loadConfig();
  const req = await fetch(config.host + `/api/products/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  });
  const content = await req.json();
  //si la reponse et true recuperer l'oderId dans la reponse
  if (content) {
    const orderId = content.orderId;
    //passer l'orderId dans l'Url pour pouvoir le recupere dans la page confirmation
    document.location.href = `./confirmation.html?orderId=${orderId}`;
  }
}
