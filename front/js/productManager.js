// Recupere la chaine de caractere dan l'url
const queryString_urlId = window.location.search;
//console.log(queryString_urlId);

//methode 1 pour extriare juste l'id
//const id = queryString_urlId.slice(4);
//console.log(id);
const urlSearchParams = new URLSearchParams(queryString_urlId);
//console.log(urlSearchParams);

const id = urlSearchParams.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then((data) => data.json())
  .then((singleProduct) => {
    if (id == singleProduct._id) {
      document.querySelector("#title").innerText += `${singleProduct.name}`;
      document.querySelector(
        ".item__img"
      ).innerHTML += `<img src="${singleProduct.imageUrl}" alt="${singleProduct.altTxt}">`;
      document.querySelector("#price").innerText += `${singleProduct.price}`;
      document.querySelector(
        "#description"
      ).innerText += `${singleProduct.description}`;
      for (let color of singleProduct.colors) {
        document.querySelector(
          "#colors"
        ).innerHTML += `<option value="">${color}</option>`;
      }
    }
  });

function colors(color) {}
