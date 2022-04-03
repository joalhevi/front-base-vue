<template>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
        <v-alert
            dense
            outlined
            dismissible
            type="error"
            v-if="errorMessage"
            v-for="(errors,index ) in errorMessage"
            :key="index">
            <span v-for="error in errors"> {{ error }}</span>
        </v-alert>
        <v-alert
            dense
            outlined
            dismissible
            type="success"
            v-if="succesMessage">
            {{ succesMessage }}
        </v-alert>
        <v-form class="px-4 py-3">
            <ValidationProvider name="password_anterior" rules="required|min:6"
                                v-slot="{ errors, valid }">
                <v-text-field
                    v-model="data.password_anterior"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="password_anterior"
                    label="Contraseña antigua"
                    hint="Indica tu contraseña antigua"
                    @click:append="show1 = !show1"
                    required
                    :error-messages="errors"
                    :success="valid">
                </v-text-field>
            </ValidationProvider>

            <ValidationProvider name="password" rules="required|min:6|confirmed:confirmation"
                                v-slot="{ errors, valid }">
                <v-text-field
                    v-model="data.password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    name="password"
                    label="Contraseña nueva"
                    hint="Indica tu nueva contraseña"
                    @click:append="show2 = !show2"
                    required
                    :error-messages="errors"
                    :success="valid">
                </v-text-field>
            </ValidationProvider>
            <ValidationProvider name="password_confirmation" v-slot="{ errors,valid }" rules="required|min:6" vid="confirmation">
                <v-text-field
                    v-model="data.password_confirmation"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    name="password_confirmation"
                    label="Confirmar contraseña"
                    hint="confirma tu nueva contraseña"
                    @click:append="show3 = !show3"
                    required
                    :error-messages="errors">
                </v-text-field>
            </ValidationProvider>

            <v-dialog
                v-model="dialog"
                max-width="480"
            >
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        block
                        tile
                        depressed
                        v-on="on"
                        class="my-4"
                    >
                        Cambiar Contraseña
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title
                        primary-title
                    >
                        Confirmación de cambio
                    </v-card-title>

                    <v-card-text>
                        ¿Estás seguro que deseas realizar este cambio?
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false">Descartar</v-btn>
                        <v-btn text @click="passes(loader)" :loading="loading" :disabled="loading">Cambiar Contraseña
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>
    </ValidationObserver>

</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
    computed: {
        ...mapState('auth', ['user'])
    },
    data() {
        return {
            errores: '',
            data:{
                password:'',
                password_confirmation:'',
                password_anterior:''
            },
            errorMessage:'',
            succesMessage:'',
            show1:false,
            show2:false,
            show3:false,
            dialog: false,
            loading:false,
        }
    },
    methods: {
        ...mapActions('auth', ['resetPassword']),
        loader() {
            this.loading= true;
            this.resetPassword(this.data).then(response => {
                this.errores = '';
                this.data.password = '';
                this.data.password_confirmation = '';
                this.data.password_old = '';
                this.loading= false;
                this.dialog = false;
                this.succesMessage="Contraseña cambiada con éxito"
                setTimeout( () => this.$router.push({ path: '/'}), 2000);

            }).catch(e => {
                this.loading= false;
                this.dialog = false;
                if (e.response.status == 422) {
                    this.data = {
                        password_old: '',
                        password: '',
                        password_confirmation: ''
                    };
                    this.errorMessage = e.response.data.errors;
                    this.errorsValidation=true
                }
            });

        }
    }
}
</script>

