<template>
    <v-container class="fill-height" fluid>
        <v-row
            align="center"
            class="ma-0"
            justify="center">
            <v-col
                cols="12"
                md="5">

                <v-card class="rounded-xl" elevation="9">
                    <v-row>
                        <v-col>
                            <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
                                <v-form @submit.prevent="passes(submitReset)">
                                    <h4 class="text-center text-h4">Cambio de Contraseña</h4>
                                    <v-divider></v-divider>
                                    <v-card-text>
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
                                        <ValidationProvider name="correo" rules="required|email"
                                                            v-slot="{ errors, valid }">
                                            <v-text-field
                                                outlined
                                                v-model="data.email"
                                                label="Correo electrónico"
                                                name="correo"
                                                prepend-inner-icon="mdi-email"
                                                hint="Indica tu correo electrónico"
                                                type="text"
                                                required
                                                :error-messages="errors"/>
                                        </ValidationProvider>
                                        <ValidationProvider name="password" rules="required|min:6|confirmed:confirmation"
                                                            v-slot="{ errors, valid }" >
                                            <v-text-field
                                                outlined
                                                v-model="data.password"
                                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show ? 'text' : 'password'"
                                                name="password"
                                                label="Nueva contraseña"
                                                prepend-inner-icon="mdi-lock"
                                                hint="Indica tu contraseña nueva"
                                                @click:append="show = !show"
                                                required
                                                :error-messages="errors">
                                            </v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider name="password_confirmation" rules="required|min:6|"
                                                            v-slot="{ errors, valid }" vid="confirmation">
                                            <v-text-field
                                                outlined
                                                v-model="data.password_confirmation"
                                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show2 ? 'text' : 'password'"
                                                name="password_confirmation"
                                                label="Confirma la contraseña"
                                                prepend-inner-icon="mdi-lock"
                                                hint="Indica tu contraseña nueva"
                                                @click:append="show2 = !show2"
                                                required
                                                :error-messages="errors">
                                            </v-text-field>
                                        </ValidationProvider>

                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer/>
                                        <v-btn color="primary" block @click.prevent="passes(submitReset)"
                                               @submit="passes(submitReset)">Restablecer
                                        </v-btn>
                                    </v-card-actions>
                                </v-form>
                            </ValidationObserver>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import {mapActions, mapState,} from 'vuex'

export default {
    data: () => {
        return {
            data: {
                email: '',
                password: '',
                password_confirmation: '',
                token:''
            },
            show: false,
            show2: false,

            errorMessage: [],
            succesMessage: ''
        }
    },
    computed: {
        ...mapState('auth', ['error']),
    },
    mounted() {
        this.findTokenResetPassword(this.$route.params.token);
        this.data.token= this.$route.params.token;
    },
    methods: {
        ...mapActions('auth', ['PasswordFindReset', 'findTokenResetPassword']),
        ...mapActions(['loader','dSuccess']),
        submitReset() {
            this.loader();
            this.PasswordFindReset(this.data).then(response => {
                this.loader();
                this.dSuccess('Contraseña cambiada correctamente, pronto será redireccionado al inicio');
                this.succesMessage = 'Contraseña cambiada correctamente, pronto será redireccionado al inicio';
                setTimeout( () => this.$router.push({ path: '/login'}), 3000);
            }).catch(e => {
                this.loader();
                if (e.response.status == 401) {
                    this.errorMessage = e.response.data.errors;
                } else if (e.response.status == 422) {
                    this.errorMessage = e.response.data;
                }

                this.data.password = '';
                this.data.password_confirm= '';

            });

        }
    }
}
</script>
