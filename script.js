const botonesAgregar = document.querySelectorAll(".btn-agregar");
const carritoItems = document.getElementById("carrito-items");
const totalElemento = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciar-carrito");
const finalizarBtn = document.getElementById("finalizar-compra");
const cantidadCarrito = document.getElementById("cantidad-carrito");

let carrito = [];

botonesAgregar.forEach(boton => {
  boton.addEventListener("click", (e) => {
    // ✅ Buscar el contenedor correcto del producto
    const productoDiv = e.target.closest(".producto");

    if (!productoDiv) {
      console.error("No se encontró el contenedor del producto.");
      return;
    }

    // ✅ Leer los datos desde data attributes
    const id = productoDiv.dataset.id;
    const nombre = productoDiv.dataset.nombre;
    const precio = parseFloat(productoDiv.dataset.precio.replace('.', '').replace(',', '.')); // Para manejar precio tipo 9.900

    if (!id || !nombre || isNaN(precio)) {
      console.error("Datos del producto inválidos:", { id, nombre, precio });
      return;
    }

    // ✅ Agregar al carrito
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

vaciarBtn.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

finalizarBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
  } else {
    alert("Gracias por tu compra!");
    carrito = [];
    actualizarCarrito();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  
  const formulario = document.getElementById('formulario-contacto');
  const mensajeEnviado = document.getElementById('mensaje-enviado');

  if (formulario && mensajeEnviado) {
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();

      
      mensajeEnviado.classList.remove('oculto');

      formulario.reset();

      
      setTimeout(() => {
        mensajeEnviado.classList.add('oculto');
      }, 4000);
    });
  }

  
  const botonContacto = document.getElementById('btn-contacto');

  if (botonContacto) {
    botonContacto.addEventListener('click', function () {
