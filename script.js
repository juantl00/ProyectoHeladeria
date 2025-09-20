const botonesAgregar = document.querySelectorAll(".btn-agregar");
const carritoItems = document.getElementById("carrito-items");
const totalElemento = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciar-carrito");
const finalizarBtn = document.getElementById("finalizar-compra");
const cantidadCarrito = document.getElementById("cantidad-carrito"); // Si tenés el ícono arriba

let carrito = [];

botonesAgregar.forEach(boton => {
  boton.addEventListener("click", () => {
    const productoDiv = boton.parentElement;
    const id = productoDiv.getAttribute("data-id");
    const nombre = productoDiv.getAttribute("data-nombre");
    const precio = parseFloat(productoDiv.getAttribute("data-precio"));

    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
  });
});

function actualizarCarrito() {
  carritoItems.innerHTML = "";
  let total = 0;
  let totalCantidad = 0;

  carrito.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <p><strong>${producto.nombre}</strong> x${producto.cantidad}</p>
      <p>$${(producto.precio * producto.cantidad).toFixed(2)}</p>
    `;

    carritoItems.appendChild(div);

    total += producto.precio * producto.cantidad;
    totalCantidad += producto.cantidad;
  });

  totalElemento.textContent = total.toFixed(2);
  if (cantidadCarrito) {
    cantidadCarrito.textContent = totalCantidad;
  }
}

// Vaciar carrito
vaciarBtn.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

// Finalizar compra
finalizarBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
  } else {
    alert("Gracias por tu compra!");
    carrito = [];
    actualizarCarrito();
  }
});
