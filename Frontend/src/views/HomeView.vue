<template>
  <div class="home">
    
     </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    
  },
  created:function(){
        this.listaClientes()
    },
  methods:{
    listaClientes(){
      window.location.href='ListaClientes'
    }
  }
}
</script>
