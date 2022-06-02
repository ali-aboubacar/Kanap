/** on va gere le localstorage enregistrer et le reutiliser dans la page cart **/

function addProduct(product) {
  let kanapOpcLocalStorage = getProducts();
  kanapOpcLocalStorage.push(product);
  //declarer la fonction save pour enregistre la list dans le localstorage
  saveProducts(kanapOpcLocalStorage);
}

function getProducts() {
  //on recupere la list de donner
  let kanapOpcLocalStorage = localStorage.getItem("kanapOpcLocalStorage");
  if (!kanapOpcLocalStorage) {
    return [];
  } else {
    // on retourne la list en le deserialisant avec parse
    return JSON.parse(kanapOpcLocalStorage);
  }
}

function saveProducts(kanapOpcLocalStorage) {
  //on enregistre le data dans la list en le serialisant avec strigify
  localStorage.setItem(
    "kanapOpcLocalStorage",
    JSON.stringify(kanapOpcLocalStorage)
  );
}
