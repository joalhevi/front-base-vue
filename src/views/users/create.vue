<template>

    <v-row justify="center">
        <v-col cols="12" class="px-0">
            <v-card>
                <v-card-title>
                    <v-btn text tile :to="{name:'users-index'}">
                        <v-icon>mdi-arrow-left</v-icon>
                        Atrás
                    </v-btn>
                    <v-spacer></v-spacer>
                    <h3>Nuevo Usuario</h3>
                </v-card-title>
            </v-card>
        </v-col>

        <v-col cols="12" class="px-0">
            <v-card tile>
                <v-card-text>
                    <create-users-component/>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

</template>
<script>
export default {
    components: {
        createUsersComponent: () => import("../../components/users/createUsersComponent"),
        // deleteOfficeComponent: ()=> import("$comp/users/deleteOfficesComponent")
    },
}
</script>
