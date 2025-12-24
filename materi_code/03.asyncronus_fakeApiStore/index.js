BASE_URL = "https://fakestoreapi.com/products";

async function getData() {
  const data = await fetch(BASE_URL);
  const listProduct = await data.json();
  //   console.log(listProduct);
  return listProduct;
}

async function selectData() {
  const selectProduct = await getData();
  const elementProduct = document.getElementById("productContainer");

  selectProduct.forEach((detail) => {
    // console.log(detail.title);
    // console.log(detail.price);
    const listProduct = document.createElement("li");
    listProduct.textContent = `${detail.title} and the Price is ${detail.price}`;

    elementProduct.appendChild(listProduct);
  });
}
selectData();
