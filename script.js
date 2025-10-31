// --- Carrito de Compras ---
const botonesAgregar = document.querySelectorAll(".btn-agregar");
const carritoItems = document.getElementById("carrito-items");
const totalElemento = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciar-carrito");
const finalizarBtn = document.getElementById("finalizar-compra");
const cantidadCarrito = document.getElementById("cantidad-carrito");

let carrito = [];

botonesAgregar.forEach(boton => {
  boton.addEventListener("click", (e) => {
    const productoDiv = e.target.closest(".producto");

    if (!productoDiv) {
      console.error("No se encontró el contenedor del producto.");
      return;
    }

    const id = productoDiv.dataset.id;
    const nombre = productoDiv.dataset.nombre;
    const precio = parseFloat(productoDiv.dataset.precio.replace('.', '').replace(',', '.'));

    if (!id || !nombre || isNaN(precio)) {
      console.error("Datos del producto inválidos:", { id, nombre, precio });
      return;
    }

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
  if (!carritoItems) return;

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

  if (totalElemento) {
    totalElemento.textContent = total.toFixed(2);
  }

  if (cantidadCarrito) {
    cantidadCarrito.textContent = totalCantidad;
  }
}

if (vaciarBtn) {
  vaciarBtn.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
  });
}

if (finalizarBtn) {
  finalizarBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
    } else {
      alert("Gracias por tu compra!");
      carrito = [];
      actualizarCarrito();
    }
  });
}

// --- Formulario de contacto ---
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

  // --- Botón de Contacto que hace scroll y no recarga ---
  const botonContacto = document.getElementById('btn-contacto');

  if (botonContacto) {
    botonContacto.addEventListener('click', function (e) {
      e.preventDefault();
      const seccionContacto = document.getElementById("contacto");
      if (seccionContacto) {
        seccionContacto.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
