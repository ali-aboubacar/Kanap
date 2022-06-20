// recuperer l'order Id dans l'url
function displayOrderId() {
  const orderIdString = window.location.search;
  const searchParams = new URLSearchParams(orderIdString);
  const orderId = searchParams.get("orderId");
  const order = document.getElementById("orderId");
  order.innerText = orderId;
}
displayOrderId();
