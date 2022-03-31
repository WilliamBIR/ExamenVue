<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Editar el pago numero {{this.$route.params.id}}
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="actualizarPago">
                    <div class="form-group">
                      <label for="monto">Monto</label>
                      <input type="float"
                        class="form-control" required name="monto" v-model="pago.monto" id="monto" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Monto a registrar</small>
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
            pago:{

            }
        }
    },
    created:function(){
            this.obtenerinformacionID();
        },
    methods:{
        obtenerinformacionID(){
            console.log(this.$route.params.id)
            fetch('http://localhost:3050/pago/'+this.$route.params.id)
            .then(resul=>resul.json())
            .then((datosRespuesta)=>{
                console.log(datosRespuesta[0])
                var aux={
                    monto:datosRespuesta[0].Monto,
                }
                console.log(aux)
                this.pago=aux;

            })
            .catch(console.log)
        },
        actualizarPago(){
            console.log(this.pago)
            console.log(this.$route.params.id)
            var datosEnviar={monto:this.pago.monto}
            console.log('fetch')
            fetch('http://localhost:3050/updatepago/'+this.$route.params.id,{
                method:'POST',
                body:JSON.stringify(datosEnviar),
                headers: new Headers({ 'Content-type': 'application/json'}),
                mode:'cors'
            })
            .then((resul)=>{resul.json()
                window.location.href='../ListaClientes'
            })

        }
    }
}
</script>