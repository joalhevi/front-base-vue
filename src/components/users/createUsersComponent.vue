<template>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
        <v-row no-gutters class="px-4" justify="space-around">
            <v-col cols="12">
                <v-alert
                    dense
                    type="error"
                    dismissible
                    v-if="errorMessage"
                    v-for="(errors,index ) in errorMessage"
                    :key="index"
                >
                    <span v-for="error in errors"> {{ error }}</span>
                </v-alert>
            </v-col>
            <v-col cols="12" md="8">
                <v-row no-gutters>

                    <v-col cols="12">
                        <ValidationProvider name="nombre" rules="required|min:3" v-slot="{ errors }">
                            <v-text-field
                                v-model="data.nombre"
                                type="text"
                                name="nombre"
                                label="Nombres"
                                hint="Indica el nombre completo de la persona"
                                required
                                outlined
                                clearable
                                autocomplete="off"
                                :error-messages="errors">
                            </v-text-field>
                        </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                        <ValidationProvider name="apellido" rules="required|min:3" v-slot="{ errors }">
                            <v-text-field
                                v-model="data.apellido"
                                type="text"
                                name="apellido"
                                label="Apellidos"
                                hint="Indica los apellidos completos de la persona"
                                required
                                outlined
                                clearable
                                autocomplete="off"
                                :error-messages="errors">
                            </v-text-field>
                        </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                        <ValidationProvider name="identificacion" rules="required|min:6" v-slot="{ errors }">
                            <v-text-field
                                v-model="data.identificacion"
                                type="numeric"
                                name="identificacion"
                                label="Número de Identificación"
                                hint="Indica la Identificación (cédula, DNI, etc) de la persona"
                                required
                                outlined
                                clearable
                                autocomplete="off"
                                :error-messages="errors">
                            </v-text-field>
                        </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                        <ValidationProvider name="correo" rules="required|min:6|email" v-slot="{ errors }">
                            <v-text-field
                                v-model="data.correo"
                                type="email"
                                name="correo"
                                label="Correo Electrónico"
                                hint="Indica el correo electrónico personal"
                                required
                                outlined
                                clearable
                                autocomplete="off"
                                :error-messages="errors">
                            </v-text-field>
                        </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                        <ValidationProvider name="estado" rules="required"  v-slot="{ errors }">
                            <v-select
                                v-model="data.estado"
                                :items="items"
                                item-text="nombre"
                                item-value="valor"
                                name="estado"
                                label="Estado de Usuario"
                                :error-messages="errors"
                                persistent-hint
                                outlined
                                required
                            ></v-select>
                        </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                        <ValidationProvider name="password" rules="required|min:6|confirmed:confirmation"
                                            v-slot="{ errors }">
                            <v-text-field
                                v-model="data.password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                name="password"
                                label="Contraseña"
                                hint="Indica la contraseña del usuario"
                                @click:append="show1 = !show1"
                                required
                                outlined
                                clearable
                                :error-messages="errors">
                            </v-text-field>
                        </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                        <ValidationProvider v-slot="{ errors }" vid="confirmation">
                            <v-text-field
                                v-model="data.password_confirmation"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show2 ? 'text' : 'password'"
                                name="password"
                                label="Confirmar Contraseña"
                                hint="Confirma la contraseña del usuario "
                                @click:append="show2 = !show3"
                                required
                                outlined
                                clearable
                                :error-messages="errors">
                            </v-text-field>
                        </ValidationProvider>
                    </v-col>

                    <v-col cols="12">
                        <v-checkbox v-model="data.cambio_password" label="Solicitar Cambio de Contraseña"></v-checkbox>
                    </v-col>

                </v-row>
            </v-col>
            <v-col cols="12" md="4">
                <v-row no-gutters>
                    <v-col cols="12" class="px-6">
                        <h3>Rol</h3>
                        <v-radio-group v-model="data.rol" :mandatory="false">
                            <v-radio v-for="item in roles" :label="item.nombre" :value="item.id"
                                     :key="item.id"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" md="6">
                <v-dialog
                    v-model="dialog"
                    max-width="360">
                    <template v-slot:activator="{ on }">
                        <v-btn
                            color="primary"
                            block
                            tile
                            :disabled="invalid"
                            depressed
                            v-on="on"
                            class="my-4"
                        >
                            <v-icon>
                                mdi-plus
                            </v-icon>
                            Crear usuario
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title
                            primary-title>
                            Confirmación
                        </v-card-title>

                        <v-card-text>
                            ¿Estás seguro que deseas crear esta información?
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  text @click="dialog = false">Cancelar</v-btn>
                            <v-btn  color="primary" text @click="passes(_storeUsers)" :loading="loading" :disabled="loading">
                                Crear Usuario
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </ValidationObserver>
</template>
<script>
import {mapActions,mapState} from 'vuex'

export default {
    components: {},
    data: () => ({
        loading: false,
        dialog: false,
        data: {
            nombre: null,
            apellido: null,
            identificacion: null,
            correo: null,
            estado: null,
            password: null,
            password_confirmation: null,
            cambio_password: false,
            rol: null
        },
        items: [
            {nombre: 'Activo', valor: true},
            {nombre: 'Inactivo', valor: false},
        ],
        show1: false,
        show2: false,
        errorMessage: '',
        errorsValidation: false,
        mode: '',
    }),

    computed: {
        ...mapState('roles',['roles']),
    },
    mounted() {
        this.getData();
    },

    methods: {
        ...mapActions('roles', ['getRoles']),
        ...mapActions('users', ['storeUsers']),

        ...mapActions(['loader']),
        ...mapActions(['dSuccess']),


        getData(){
            this.loader()
            this._getRoles();
            this.loader()
        },
        _getRoles() {
            this.getRoles().then(response => {

            }).catch(e => {
                this.loader()
                console.log(e.response)
            })
        },
        _storeUsers() {
            this.loading = true
            this.storeUsers(this.data).then(response => {
                this.loading = false;
                this.dialog = false;
                this.dSuccess('Usuario creado con éxito')
                this.$router.push({name: 'users-index'})
            }).catch(e => {
                this.loading = false;
                this.dialog = false;
                if (e.response.status == 422) {
                    this.errorMessage = e.response.data;
                    this.$refs.obs.setErrors(e.response.data)
                }
            })
        }
    }
}
</script>

