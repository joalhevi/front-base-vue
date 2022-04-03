<template>

    <v-row>
        <v-col cols="12" class="px-0">
            <v-card tile>
                <v-card-title>
                    <v-btn text :to="{name:'roles-index'}">
                        <v-icon>mdi-arrow-left</v-icon>
                        Atrás
                    </v-btn>
                    <v-spacer></v-spacer>
                    <h3>Nuevo Rol</h3>
                </v-card-title>
            </v-card>
        </v-col>

        <v-col cols="12" class="px-0">
            <v-card tile>
                <v-card-text>
                    <create-roles-component></create-roles-component>
                </v-card-text>
            </v-card>
        </v-col>
        <router-view/>

    </v-row>


</template>
<script>
export default {
    components: {
        CreateRolesComponent: () => import('../../components/roles/createRolesComponent')
    },
    data: () => ({
        dialog: true,
    })
}
</script>
