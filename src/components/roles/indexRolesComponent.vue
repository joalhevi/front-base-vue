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
            :items="roles.roles"
            :sort-desc="[false, true]"
            :search="search"
            :loading="loading"
            loading-text="Cargando... espera un momento"
            multi-sort>
            <template v-slot:item.action="{ item }">
                <v-btn
                    icon
                    text
                    tile
                    depressed
                    v-if="auth.permission(['roles-update'])"
                    :to="{name:'roles-update', params: {'id':item.id}}">

                    <v-icon text color="warning">
                        mdi-pencil
                    </v-icon>

                </v-btn>
            </template>
            <template v-slot:item.relaciones="{ item }">
                <template v-for="a in item.relaciones.habilidades">
                    <v-chip  small label class="mx-1 my-1">{{ a.titulo }}</v-chip>
                </template>
            </template>
            <template v-slot:no-data>
                <p>No se encontró información</p>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
    components: {

    },
    data: () => ({
        search: '',
        loading: false,
        headers: [
            {
                text: 'Nombre',
                align: 'left',
                sortable: true,
                value: 'nombre',
            },
            {
                text: 'Habilidades',
                align: 'right',
                sortable: true,
                value: 'relaciones',
            },
            {
                text: 'Acciones',
                align: 'right',
                sortable: false,
                value: 'action',
            },
        ],
    }),
    computed: {
        ...mapState(['roles'])
    },
    mounted() {
        this._getRoles()
    },

    methods: {
        ...mapActions('roles', ['getRoles']),
        _getRoles() {
            this.loading = true;
            this.getRoles().then(response => {
                this.loading = false;
            }).catch(e => {
                console.log(e.response)
                this.loading = false;
            });
        },

        onPageChange() {
            this._getRoles();
        }
    }
}
</script>

