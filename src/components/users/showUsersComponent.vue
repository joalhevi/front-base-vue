<template>
    <v-card :loading="loading" tile>
        <v-skeleton-loader
            v-if="loading"
            v-bind="attrs"
            type="list-item-three-line, list-item-three-line, actions">
        </v-skeleton-loader>
        <div v-show="!loading">
            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-subtitle>Nombres</v-list-item-subtitle>
                    <v-list-item-title>{{ user.nombre }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-subtitle>Apellidos</v-list-item-subtitle>
                    <v-list-item-title>{{ user.apellido }}</v-list-item-title>
                </v-list-item-content>

            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-card-bulleted-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-subtitle>Número de Identificación</v-list-item-subtitle>
                    <v-list-item-title>{{ user.identificacion }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-account-convert</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-subtitle>Estado</v-list-item-subtitle>
                    <v-list-item-title>
                        <span v-if="user.estado == true">
                            Activo
                        </span>
                        <span v-if="user.estado == false">
                         Inactivo
                        </span>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-email</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-subtitle>Correo Electrónico</v-list-item-subtitle>
                    <v-list-item-title>{{ user.correo }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item v-if="user.relaciones.roles.length">
                <v-list-item-avatar>
                    <v-icon>mdi-account-switch</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-subtitle>Rol</v-list-item-subtitle>
                    <v-list-item-title>
                        {{ user.relaciones.roles[0]['titulo'] }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
        </div>
    </v-card>
</template>
<script>
import {mapActions, mapState} from 'vuex'

export default {
    components: {},
    data: () => ({
        loading: false,
        attrs: {
            class: 'mb-6',
            boilerplate: true,
            elevation: 2,
        },
    }),
    computed: {
        ...mapState('users', ['user'])
    },
    mounted() {
        this._getUser()
    },

    methods: {
        ...mapActions('users', ['showUser']),
        _getUser() {
            this.loading = true;

            this.showUser(this.$route.params.id).then(response => {
                this.loading = false;
            }).catch(e => {
                this.loading = false;
                console.log(e.response)
            })
        }
    }
}
</script>
