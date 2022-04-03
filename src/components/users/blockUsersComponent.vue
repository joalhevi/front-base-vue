<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red"
                    dark
                    text
                    tile
                    depressed
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="dialog = true"
                >
                    <v-icon v-if="user.estado == true">
                        mdi-account-cancel-outline
                    </v-icon>
                    <v-icon v-if="user.estado == false">
                        mdi-account
                    </v-icon>
                </v-btn>
            </template>
            <span v-if="user.estado == true">Desactivar Usuario</span>
            <span v-if="user.estado == false">Activar Usuario</span>

        </v-tooltip>

        <v-dialog
            v-model="dialog"
            max-width="365"
        >
            <v-card>
                <v-card-title class="headline">Confirmación</v-card-title>

                <v-card-text>
                    ¿Estas seguro que deseas bloquear este usuario? <br>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text
                        tile
                        depressed
                        @click="dialog = false">
                        Cancelar
                    </v-btn>

                    <v-btn
                        color="primary"
                        text
                        tile
                        depressed
                        @click="_blockUser()"
                        :loading="loading"
                        :disabled="loading">
                        Si, bloquear
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
    props: ['user'],
    data: () => ({
        dialog: false,
        loading: false,
    }),
    methods: {
        ...mapActions('users', ['blockUser']),
        ...mapActions(['dSuccess', 'loader']),

        _blockUser() {
            this.loader()
            this.loading = true;
            this.blockUser(this.user.id).then(response => {
                this.loader()
                this.loading = false;
                this.dialog = false;
                this.dSuccess('Cambio de estado');
                this.$router.push({name: 'users-index'})
            }).catch(e => {
                this.loader()
                console.log(e.response)
                this.loading = false;
                this.dialog= false;
            })

        }
    }
}
</script>
