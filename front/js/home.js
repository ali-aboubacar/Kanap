// recuperation des donnee dans l'api

fetch("http://localhost:3000/api/products")
  .then((data) => data.json())
  //recupere tout le data et le transforme a une liste
  .then((jsonListProduct) => {
    //loop pour afficher le tableau jsonlistProduct
    for (let jsonProduct of jsonListProduct) {
      let product = new Product(jsonProduct); //cree une instance de la class product
      document.getElementById("items").innerHTML += `
      <a href="./product.html?id=${product._id}">
            <article>
              <img src=${product.imageUrl} alt=${product.altTxt}>
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
    }
  });
