<template>
<div class="container">
        <div class="card">
            <div class="card-header">
                Información Cliente
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id {{cliente.Id}}</th>
                            <th colspan="3">Nombre: {{cliente.Nombre}} Télefono: {{cliente.Telefono}} ultimo pago: {{cliente.Ultimo_pago}}</th>
                            <th>
                            <router-link :to="{name:'AgregarPago',params:{id:cliente.Id}}" class="btn btn-success">Agregar Pago</router-link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Id</td>
                            <td>Monto</td>
                            <td>Fecha y hora</td>
                            <td colspan="2">Acciones</td>
                        </tr>
                        <tr v-for="pago in pagos" :key="pago.Id">
                            <td>{{pago.Id}}</td>
                            <td>{{pago.Monto}}</td>
                            <td>{{pago.Fecha_creacion}}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="">
                                    <button type="button" class="btn btn-danger" v-on:click="borrarPago(pago.Id)">Borrar</button>
                                    </div>                      
                            </td>
                            <td>
                                <div>
                                    <router-link :to="{name:'EditarPago',params:{id:pago.Id}}" class="btn btn-success">Editar Pago</router-link>
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
            cliente:{},
            pagos:{}
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

                //console.log(aux)
                this.cliente=datosRespuesta[0];

            })
            .catch(console.log)

            fetch('http://localhost:3050/pagos/'+this.$route.params.id)
            .then(resul=>resul.json())
            .then((datosRespuesta)=>{
                console.log(datosRespuesta)

                if(typeof datosRespuesta[0].success==="undefined"){
                    this.pagos=datosRespuesta;
                }

            })
            .catch(console.log)


        },
        borrarPago(id){
            console.log(id)
            fetch('http://localhost:3050/deletepago/'+id)
            .then(resul=>{
                resul.json()
                window.location.href='/Cliente/'+this.$route.params.id
            })
        }

        
    }
}
</script>