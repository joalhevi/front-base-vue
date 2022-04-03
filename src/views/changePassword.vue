<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px">
            <v-card>
                    <v-card-title>Cambiar Contraseña</v-card-title>
                <v-card-text>

                    <v-container>
                        <change-password-component></change-password-component>
                    </v-container>

                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    components: {
        ChangePasswordComponent:()=>import('../components/changePasswordComponent')
    },
    data: () => ({
        dialog: true,
    }),
}
</script>
