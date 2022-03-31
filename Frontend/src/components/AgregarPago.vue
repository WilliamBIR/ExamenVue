<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Agregar nuevo PAGO al cliente {{this.$route.params.id}}
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="agregarPago">
                    <div class="form-group">
                      <label for="monto">Monto</label>
                      <input type="float"
                        class="form-control" required name="monto" v-model="pago.monto" id="monto" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Monto a registrar</small>
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
            pago:{

            }
        }
    },
    methods:{
        agregarPago(){
            console.log(this.pago)
            console.log(this.$route.params.id)
            var datosEnviar={monto:this.pago.monto,
            cliente:this.$route.params.id}
            console.log('fetch')
            fetch('http://localhost:3050/addpago/?insertar=1',{
                method:'POST',
                body:JSON.stringify(datosEnviar),
                headers: new Headers({ 'Content-type': 'application/json'}),
                mode:'cors'
            })
            .then((resul)=>{resul.json()
                fetch('http://localhost:3050/updatecliente2/'+this.$route.params.id,{
                method:'POST',
                headers: new Headers({ 'Content-type': 'application/json'}),
                mode:'cors'
            })
            }).then(()=>{
                
                window.location.href='../Cliente/'+this.$route.params.id         
            })

        }
    }
}
</script>