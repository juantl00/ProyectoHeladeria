let carrito = [];

// Cargar carrito desde localStorage si existe
if (localStorage.getItem('carrito')) {
  carrito = JSON.parse(localStorage.getItem('carrito'));
  mostrarCarrito();
}

document.addEventListener('DOMContentLoaded', function () {
  const botones = document.querySelectorAll('.btn-agregar');

  botones.forEach(boton => {
    boton.addEventListener('click', function () {
      const producto = this.parentElement;
      const nombre = producto.querySelector('h3').textContent;
      const descripcion = producto.querySelector('p').textContent;
      const imagen = producto.querySelector('img').getAttribute('src');

      const item = {
        nombre,
        descripcion,
        imagen
      };

      carrito.push(item);
      localStorage.setItem('carrito', JSON.stringify(carrito));

      mostrarCarrito();
    });
  });
});

// Función para mostrar el carrito en pantalla
function mostrarCarrito() {
  const contenedor = document.getElementById('carrito-contenedor');
  contenedor.innerHTML = ''; // Limpia antes de volver a mostrar

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  carrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('item-carrito');
    div.innerHTML = `
      <img src="${item.imagen}" width="50">
      <strong>${item.nombre}</strong> - ${item.descripcion}
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    contenedor.appendChild(div);
  });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}
