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
                                    <h4 class="text-center text-h4">Recuperar Contraseña</h4>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <v-alert
                                            dense
                                            outlined
                                            type="error"
                                            dismissible
                                            v-if="errorMessage"
                                            v-for="(errors,index ) in errorMessage"
                                            :key="index"
                                        >
                                            <span v-for="error in errors"> {{ error }}</span>
                                        </v-alert>
                                        <v-alert
                                            dense
                                            outlined
                                            prominent
                                            transition="scale-transition"
                                            dismissible
                                            type="success"
                                            v-if="succesMessage"

                                        >
                                            {{succesMessage}}
                                        </v-alert>
                                        <ValidationProvider name="correo" rules="required|email"
                                                            v-slot="{ errors, valid }">
                                            <v-text-field
                                                outlined
                                                v-model="data.correo"
                                                label="Correo electrónico"
                                                name="correo"
                                                prepend-inner-icon="mdi-email"
                                                hint="Indica tu correo electrónico"
                                                type="text"
                                                required
                                                :error-messages="errors"
                                            />
                                        </ValidationProvider>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer/>
                                        <v-btn color="primary" block @click.prevent="passes(submitReset)"
                                               @submit="passes(submitReset)">Recuperar
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
                correo: '',
            },
            show: false,
            errorMessage: [],
            succesMessage:''
        }
    },
    computed: {
        ...mapState('auth', ['error']),
    },
    methods: {
        ...mapActions('auth', ['forgotPassword']),
        ...mapActions(['loader','dSuccess']),
        submitReset() {
            this.loader();
            this.forgotPassword(this.data).then(response => {
                this.loader();
                this.succesMessage = response.data.message;
                this.data.correo = null;
                this.errorMessage = null;
                this.dSuccess(response.data.message)
            }).catch(e => {
                this.loader();
                if (e.response.status == 401) {
                    this.errorMessage = e.response.data.errors;
                } else if (e.response.status == 422) {
                    this.errorMessage = e.response.data;
                }

                this.data.password = ''

            });

            // this.$router.push('/');
        }
    }
}
</script>
