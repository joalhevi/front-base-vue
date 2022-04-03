<template>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
        <v-row no-gutters class="px-4" justify="space-around">
            <v-col cols="12" md="5">
                <ValidationProvider name="nombre" rules="required|min:3|alpha_dash" v-slot="{ errors }">
                    <v-text-field
                        v-model="data.nombre"
                        type="text"
                        name="nombre"
                        label="Nombre del Rol"
                        hint="Indica el nombre  en el sistema para el rol"
                        outlined
                        required
                        :error-messages="errors">
                    </v-text-field>
                </ValidationProvider>
            </v-col>
            <v-col cols="12" md="5">
                <ValidationProvider name="titulo" rules="required|min:3" v-slot="{ errors }">
                    <v-text-field
                        v-model="data.titulo"
                        type="text"
                        name="titulo"
                        label="Titulo del Rol"
                        hint="Indica el nombre identificador del rol"
                        required
                        outlined
                        :error-messages="errors"
                        >
                    </v-text-field>
                </ValidationProvider>
            </v-col>
            <v-col cols="12">

                <h3>Habilidades del rol</h3>
                <v-container fluid>
                    <v-row>
                        <template v-for="item in roles.abilities">

                            <v-col cols="12" md="3" :key="item.id" class="pa-0">
                                <ValidationProvider :name="'habilidades'+item.titulo" rules="required"
                                                    v-slot="{ errors, valid }">
                                    <v-checkbox
                                        v-model="data.habilidades"
                                        :label="item.titulo"
                                        :value="item.id"
                                        :name="'habilidades'+item.titulo"
                                        :error-messages="errors"
                                    ></v-checkbox>
                                </ValidationProvider>
                            </v-col>
                        </template>

                    </v-row>
                </v-container>

            </v-col>
            <v-col cols="12" key="3">

                <v-dialog
                    v-model="dialog"
                    max-width="320"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn
                            color="warning"
                            block
                            tile
                            depressed
                            v-on="on"
                            class="my-4"
                        >
                            <v-icon>mdi-pencil</v-icon>
                            Editar Rol
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title
                            primary-title
                        >
                            Confirmar la edición
                        </v-card-title>

                        <v-card-text>
                            ¿Estás seguro que deseas editar esta información?
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text tile depressed @click="dialog = false">Descartar</v-btn>
                            <v-btn
                                text
                                tile
                                depressed
                                @click="passes(_updateRoles)"
                                :loading="loading"
                                :disabled="loading"
                                @submit.prevent="passes(_updateRoles)">
                                Editar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </ValidationObserver>

</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
    data: () => ({
        data: {
            id:null,
            nombre: null,
            titulo: null,
            habilidades: []
        },
        loading: false,
        dialog: false,
        errorMessage: [],
        mode: ''
    }),
    computed: {
        ...mapState(['roles', ['abilities']])
    },
    mounted() {
        this._getAbilities();
    },
    methods: {
        ...mapActions(['loader']),
        ...mapActions(['dSuccess']),

        ...mapActions('roles', ['getAbilities']),
        ...mapActions('roles', ['showRole']),
        ...mapActions('roles', ['updateRoles']),

        _getAbilities() {
            this.loader()
            this.getAbilities().then(response => {
                this.showRole(this.$route.params.id).then(response => {
                    this.data = {
                        nombre: response.data.data.nombre,
                        titulo: response.data.data.titulo,
                        id: response.data.data.id,
                        habilidades: response.data.data.relaciones.habilidades.map(obj => obj.id)
                    }
                }).catch(e => {
                    this.loader();

                })
                this.loader();
            }).catch(e => {
                this.loader();
            })
        },

        _updateRoles() {
            this.loading = true;

            this.updateRoles(this.data).then(response => {
                this.loading = false;
                this.dialog = false;
                this.dSuccess('Rol actualizado con éxito');
                this.$router.push({name: 'roles-index'})
            }).catch(e => {
                this.loading = false;
                this.dialog = false;
                console.log(e.response)
                if (e.response.status == 422) {
                    this.errorMessage = e.response.data;
                    this.$refs.obs.setErrors(e.response.data)
                }
            })
        }


    }
}
</script>
