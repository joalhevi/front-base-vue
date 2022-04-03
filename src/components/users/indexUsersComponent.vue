<template>
    <v-card tile>
        <v-card-title>
            <v-spacer></v-spacer>
            <v-form @submit.prevent="onPageChange()">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                    @keyup.enter="onPageChange()"
                    @click:append="onPageChange()">
                </v-text-field>
            </v-form>

        </v-card-title>
        <v-data-table
            dense
            :headers="headers"
            :items="users.users"
            :sort-desc="[false, true]"
            :search="search"
            :loading="loading"
            loading-text="Cargando... espera un momento"
            multi-sort
            hide-default-footer>
            <template v-slot:item.action="{ item }">
                <v-btn
                    icon
                    text
                    tile
                    depressed
                    v-if="auth.permission(['users-show'])"
                    :to="{name:'users-show', params: {'id':item.id}}">

                    <v-icon >
                        mdi-open-in-new
                    </v-icon>

                </v-btn>
            </template>
            <template v-slot:item.estado="{ item }">
                <span v-if="item.estado == true">
                    <v-chip  small label color="success" class="mx-1 my-1">Activo</v-chip>
                </span>
                <span v-if="item.estado == false">
                    <v-chip  small label color="error" class="mx-1 my-1">Inactivo</v-chip>
                </span>
            </template>
            <template v-slot:no-data>
                <p>No se encontró información</p>
            </template>
        </v-data-table>
        <div class="text-center pt-2">
            <v-pagination
                v-model="users.pagination.current_page"
                :length="users.pagination.last_page"
                @input="onPageChange"
                :total-visible="7">
            </v-pagination>
        </div>
    </v-card>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export  default {
    components:{

    },
    data:()=>({
        search:'',
        loading: false,
        headers: [
            {
                text: 'Nombre',
                align: 'left',
                sortable: true,
                value: 'nombre_completo',
            },
            {
                text: 'Identificación',
                align: 'left',
                sortable: true,
                value: 'identificacion',
            },
            {
                text: 'Estado',
                align: 'left',
                sortable: true,
                value: 'estado',
            },
            {
                text: 'Acciones',
                align: 'right',
                sortable: false,
                value: 'action',
            },

        ],
    }),
    computed:{
        ...mapState(['users'])
    },
    mounted() {
        this._getUsers()
    },

    methods: {
        ...mapActions('users',['getUsers']),
        _getUsers(){
            this.loading = true;
            this.getUsers({search:this.search}).then(response=>{
                this.loading = false;
            }).catch(e=>{
                console.log(e.response)
                this.loading = false;
            });
        },

        onPageChange(){
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            this._getUsers();
        }
    }
}
</script>
