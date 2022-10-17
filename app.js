const searchProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => showProducts(data));
};
searchProducts();

const showProducts = (products) => {
  const details = document.getElementById("display-card");
  products.forEach((product) => {
    const { title, price, description, category, image, rating } = product;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `

    <div class="card w-72 bg-base-100 shadow-xl mx-auto flex-col">
    <figure class="">
      <img src="${image}" class="object-contain h-48 w-96" alt="title" />
    </figure>
    <div class="card-body px-2">
      <h2 class="card-title text-lg">
        ${title.length > 25 ? title.slice(0, 25) : title}
      </h2>
      <p class="text-sm">
        ${description.length > 50 ? description.slice(0, 50) : description}...
      </p>
      <p class="text-sm">Price: $${price}</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">${category}</div>
        <div class="badge badge-outline">⭐ ${rating.rate}</div>
      </div>
      <button onclick="addToCart(${price})" class=" my-4 btn btn-outline">
        Add to cart
      </button>
    </div>
  </div>
        `;
    details.appendChild(div);
  });
};

let productCount = 0;
let currentTotalPrice = 0;
function addToCart(price) {
  productCount++;
  setTotalProducts(productCount);
  const totalProductsPrice = parseFloat(setTotalPrice(price));
  const delivaryCharge = setDelivaryCharge(currentTotalPrice);
  const shippingCharge = setShippingCharge(currentTotalPrice);

  const subTotal = totalProductsPrice + delivaryCharge + shippingCharge;
  setSubTotal(subTotal);
  const tax = parseFloat(setTax(subTotal));
  setTotal(subTotal, tax);
}

const setTotalProducts = (product) => {
  let totalProduct = document.getElementById("total-products");
  return (totalProduct.innerText = product);
};
const setTotalPrice = (price) => {
  currentTotalPrice += price;
  const totalPrice = document.getElementById("price");
  return (totalPrice.innerText = currentTotalPrice.toFixed(2));
};
const setDelivaryCharge = (currentTotalPrice) => {
  const delivaryCharge = document.getElementById("delivery-charge");
  return (delivaryCharge.innerText =
    currentTotalPrice > 1000
      ? 200
      : currentTotalPrice > 800
      ? 150
      : currentTotalPrice > 500
      ? 100
      : 0);
};
const setShippingCharge = (currentTotalPrice) => {
  const shippingCharge = document.getElementById("shipping-charge");
  return (shippingCharge.innerText =
    currentTotalPrice > 1000
      ? 200
      : currentTotalPrice > 800
      ? 150
      : currentTotalPrice > 500
      ? 100
      : 0);
};
const setSubTotal = (subTotal) => {
  const subTotalElement = document.getElementById("sub-total");
  subTotalElement.innerText = subTotal.toFixed(2);
  return subTotal;
};
const setTax = (subTotal) => {
  const taxElement = document.getElementById("tax");
  const tax = (subTotal * 0.15).toFixed(2);
  taxElement.innerText = tax;
  return tax;
};
const setTotal = (subTotal, tax) => {
  const totalElement = document.getElementById("total-price");
  const total = subTotal + tax;
  totalElement.innerText = total.toFixed(2);
};
