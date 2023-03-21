const { createApp } = Vue;

const app = createApp({
    data(){
        return {
            // Inicializamos las variables
            datos: [],
            datosJuguetes: [],
            datosJuguetesFiltrados: [{}, {}],
            isAsideInactive: true,
            valorBusqueda: "",
            favoritos:[],
            valorModal: {},
            valorContador: 0,
            arrayCarrito:[]
        }
    },
    created() {
      fetch("https://mindhub-xj03.onrender.com/api/petshop")
          .then(response => response.json())
          .then(data => {
              this.datos = data;
              for (producto of this.datos){
                producto.contador = 0
              }
              this.datosJuguetes = this.datos.filter(producto => producto.categoria == "jugueteria");
              this.datosJuguetesFiltrados = this.datos.filter(producto => producto.categoria == "jugueteria");
              this.favoritos= JSON.parse(localStorage.getItem("favoritos"))||[];
          })
          .catch(error => console.log(error))
  },
  methods: {
      filtroBusqueda() {
          this.datosJuguetesFiltrados = this.datosJuguetes.filter(producto =>
              producto.producto.toLowerCase().includes(this.valorBusqueda.toLowerCase())
          )
      },

      aparecerCarrito() {
          this.isAsideInactive = !this.isAsideInactive;
      },

      restarValor(){
        if(this.valorContador == 0){
          this.valorContador = 0
        } else {
          this.valorContador = this.valorContador - 1;
        }
      },

      borrarFavoritos(){
          this.favoritos=[]
      },

      evento(evento){
          this.valorModal = this.datosJuguetesFiltrados.find(e => e.producto == evento.target.alt)
      },

      handleFav(){
          localStorage.setItem("favoritos", JSON.stringify(this.favoritos))
      },
      
      sumarValor(evento){
        this.valorContador = this.valorContador + 1;
      },

      añadirCarrito(evento){
        this.arrayCarrito.push(this.datosJuguetesFiltrados.find(e => e.producto == evento.target.alt))
      },

      borrarRegistro(evento){
        let indice = this.arrayCarrito.indexOf(this.datosJuguetesFiltrados.find(e => e.producto == evento.target.alt));
        this.arrayCarrito.splice(indice , 1)
      }
  },
})

app.mount("#app");

//boton
const btnScrollTop = document.querySelector('#btn-scroll-top');

btnScrollTop.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 200) {
    btnScrollTop.style.display = 'block';
  } else {
    btnScrollTop.style.display = 'none';
  }
});