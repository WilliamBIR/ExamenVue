<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Editar Cliente
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="actualizarCliente">
                    <div class="form-group">
                      <label for="nombre">Nombre</label>
                      <input type="text"
                        class="form-control" required name="nombre" v-model="cliente.nombre" id="nombre" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Nombre del clientet</small>
                    </div>
                    <div class="form-group">
                      <label for="telefono">Telefono</label>
                      <input type="text"
                        class="form-control" required name="telefono" v-model="cliente.telefono" id="telefono" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Telefono</small>
                    </div>

                    <div class="btn-group" role="group" aria-label="">
                        <button type="submit" class="btn btn-success">Modificar</button>
                        <router-link :to="{name:'ListaClientes'}" class="btn btn-danger">Cancelar</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            cliente:{}
        }
    },

    created:function(){
        this.obtenerinformacionID();
    },
    methods:{
        obtenerinformacionID(){
            fetch('http://localhost:3050/clientes/'+this.$route.params.id)
            .then(resul=>resul.json())
            .then((datosRespuesta)=>{
                //console.log(datosRespuesta[0])
                var aux={
                    nombre:datosRespuesta[0].Nombre,
                    telefono:datosRespuesta[0].Telefono,
                }
                //console.log(aux)
                this.cliente=aux;

            })
            .catch(console.log)
        },
        actualizarCliente(){
            console.log(this.cliente)
            var datosEnviar={nombre:this.cliente.nombre,telefono:this.cliente.telefono}
            console.log('fetch')
            console.log(this.$route.params.id)
            fetch('http://localhost:3050/updatecliente/'+this.$route.params.id,{
                method:'POST',
                body:JSON.stringify(datosEnviar),
                headers: new Headers({ 'Content-type': 'application/json'}),
                mode:'cors'
            })
             .then(resul=>{
                resul.json()
                window.location.href='../ListaClientes'
             }).catch(console.log)

        }
    }
}
</script>