<template>
    <v-container class="fill-height" fluid>
        <v-row
            align="center"
            class="ma-0"
            justify="center">
            <v-col cols="12" md="4">
                <v-card elevation="0">
                    <v-row no-gutters class=" pt-5">
                        <v-col cols="12">
                            <div class="px-3 text-center">

                            </div>
                        </v-col>
                        <v-col cols="12" class="pt-3">
                            <h4 class="text-center text--primary text-h4">Iniciar Sesión</h4>
                        </v-col>
                        <v-col cols="12">
                            <ValidationObserver ref="obs" v-slot="{ passes,handleSubmit  }">
                                <v-form @submit.prevent="handleSubmit(submitLogin)">
                                    <v-card-text>
                                        <v-alert
                                            dense
                                            outlined
                                            type="error"
                                            v-if="errorMessage"
                                            v-for="(errors,index ) in errorMessage"
                                            :key="index"
                                        >
                                            <span v-for="error in errors" :key="error"> {{ error }}</span>
                                        </v-alert>
                                        <ValidationProvider name="identificacion" vid="identificacion"
                                                            rules="required|min:6"
                                                            v-slot="{ errors, valid }">
                                            <v-text-field
                                                v-model="data.identificacion"
                                                label="Identificación"
                                                name="identificacion"
                                                prepend-inner-icon="mdi-account"
                                                hint="Indica tu identificación"
                                                type="text"
                                                required
                                                outlined
                                                :error-messages="errors"
                                            />
                                        </ValidationProvider>
                                        <ValidationProvider name="password" vid="password"
                                                            rules="required|min:6"
                                                            v-slot="{ errors, valid }">
                                            <v-text-field
                                                outlined
                                                v-model="data.password"
                                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show ? 'text' : 'password'"
                                                name="password"
                                                label="Contraseña"
                                                prepend-inner-icon="mdi-lock"
                                                hint="Indica tu contraseña de ingreso"
                                                @click:append="show = !show"
                                                required
                                                :error-messages="errors">
                                            </v-text-field>
                                        </ValidationProvider>


                                    </v-card-text>
                                    <v-card-actions class=" justify-center">
                                        <v-btn color="primary"
                                               block
                                               type="submit"
                                               depressed
                                               @submit.prevent="handleSubmit(submitLogin)"
                                               class="px-10">
                                            Iniciar
                                        </v-btn>
                                    </v-card-actions>

                                </v-form>
                            </ValidationObserver>
                            <p class="px-3">
                                <router-link to="reset-password">¿Olvidaste tu contraseña?</router-link>
                            </p>
                        </v-col>
                        <v-col>
                            <p class="text-center grey--text">
                                Software para la Administración de Inventario <br>
                                <strong>&copy; COOPORCICULTORES</strong>
                            </p>
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
                identificacion: null,
                password: null,
                device_name: 'WebApp'
            },
            show: false,
            errorMessage: [],
            image:'bg-login-1.jpg'
        }
    },
    computed: {
        ...mapState('auth', ['error']),
    },
    created() {
       this.image = `bg-login-${Math.round(Math.random() * 6)}.jpg`;
    },
    methods: {
        ...mapActions('auth', ['signIn']),
        ...mapActions(['loader']),
        submitLogin() {
            this.loader();
            this.signIn(this.data).then(response => {
                location.reload()
            }).catch(e => {
                this.loader();
                if (e.response.status === 401) {
                    this.errorMessage = e.response.data.errors;
                } else if (e.response.status === 422) {
                    this.errorMessage = e.response.data;
                }

                this.data.password = null

            });
        }
    }
}
</script>
