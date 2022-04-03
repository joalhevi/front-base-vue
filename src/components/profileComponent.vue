<template>
    <v-row justify="space-between">
        <v-col cols="12" md="5">
            <v-card tile>
                <v-card-title class="text-center">
                    <h3 class="text-center"> Datos de Usuario</h3>
                </v-card-title>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title>Nombres</v-list-item-title>
                            <v-list-item-subtitle class="text-capitalize ">{{ user.nombre }}</v-list-item-subtitle>
                            <v-list-item-content>
                                <v-list-item-title>Apellidos</v-list-item-title>
                                <v-list-item-subtitle class="text-capitalize">{{ user.apellido }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-content>
                                <v-list-item-title> Número de Identificación</v-list-item-title>
                                <v-list-item-subtitle>{{ user.identificacion }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-content>
                                <v-list-item-title>Correo Electrónico</v-list-item-title>
                                <v-list-item-subtitle>{{ user.correo }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item-content>

                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
        <v-col cols="12" md="5">
            <v-card tile>
                <v-card-title>
                    <h3>
                        Cambiar Contraseña
                    </h3>
                </v-card-title>
                <v-divider></v-divider>
                <change-password-component></change-password-component>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import ChangePasswordComponent from "./changePasswordComponent";
import {mapState} from "vuex";

export default {
    components: {ChangePasswordComponent},
    computed: {
        ...mapState('auth', ['user'])
    },
}
</script>
