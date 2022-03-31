<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Agregar nuevo clientes
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="agregarCliente">
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
                        <button type="submit" class="btn btn-success">Agregar</button>
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
            cliente:{

            }
        }
    },
    methods:{
        agregarCliente(){
            console.log(this.cliente)
            var datosEnviar={nombre:this.cliente.nombre,telefono:this.cliente.telefono}
            console.log('fetch')
            fetch('http://localhost:3050/addcliente/?insertar=1',{
                method:'POST',
                body:JSON.stringify(datosEnviar),
                headers: new Headers({ 'Content-type': 'application/json'}),
                mode:'cors'
            })
            .then(resul=>{resul.json()
            window.location.href='ListaClientes'
            })

        }
    }
}
</script>