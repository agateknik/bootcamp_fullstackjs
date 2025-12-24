BASE_URL = "https://fakestoreapi.com/products";
const elementProduct = document.getElementById("productContainer");

async function getData() {
  const data = await fetch(BASE_URL);
  const listProduct = await data.json();
  //   console.log(listProduct);
  return listProduct;
}

async function selectData() {
  const selectProduct = await getData();

  selectProduct.forEach((detail) => {
    // console.log(detail.title);
    // console.log(detail.price);
    const listProduct = document.createElement("li");
    listProduct.textContent = `${detail.title} and the Price is ${detail.price}`;

    elementProduct.appendChild(listProduct);
  });
}
selectData();

const productName = document.getElementById("inputProduct");
const productPrice = document.getElementById("inputPrice");
const btnAddProduct = document.getElementById("buttonAddProduct");

btnAddProduct.addEventListener("click", async () => {
  const name = productName.value;
  const price = productPrice.value;

  const listProduct = document.createElement("li");
  listProduct.textContent = `${name} and the Price is ${price}`;
  elementProduct.appendChild(listProduct);

  productName.value = "";
  productPrice.value = "";
});
