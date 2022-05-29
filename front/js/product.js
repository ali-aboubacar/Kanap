class Product {
  constructor(jsonProduct) {
    // on cree le produit en utilisant la methode assign
    // on aurait puis avoir le meme resultat en utilisant
    // this.id = id ;
    jsonProduct && Object.assign(this, jsonProduct);
  }
}
