<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Clientes
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Ultimo pago</th>
                            <th>Fecha creacion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cliente in clientes" :key="cliente.id">
                            <td>{{cliente.Id}}</td>
                            <td><a :href="'/Cliente/'+cliente.Id">{{cliente.Nombre}}</a></td>
                            <td>{{cliente.Telefono}}</td>
                            <td>{{cliente.Ultimo_pago}}</td>
                            <td>{{cliente.Fecha_creacion}}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="">
                                    <router-link :to="{name:'EditarCliente',params:{id:cliente.Id}}" class="btn btn-success">Editar</router-link>
                                    <button type="button" class="btn btn-danger" v-on:click="borrarCliente(cliente.Id)">Borrar</button>
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>            
    </div>
</template>

<script>
export default {
    data(){
        return{
            clientes:[]
        }
    },
    created:function(){
        this.consultarClientes()
    },
    methods:{
        consultarClientes(){
            fetch('http://localhost:3050/clientes',{
                method:'GET',
                headers: new Headers({ 'Content-type': 'application/json'}),
                mode:'cors'
            })
            .then(resul=>resul.json())
            .then((datosRespuesta)=>{
                //console.log(datosRespuesta)
                this.clientes=[]
                if(typeof datosRespuesta[0].success==="undefined"){
                    this.clientes=datosRespuesta;
                }
            })
            .catch(console.log)
        },
        borrarCliente(id){
            fetch('http://localhost:3050/deletecliente/'+id)
            .then(resul=>{
                resul.json()
                window.location.href='ListaClientes'
            })
        }
    }
}
</script>