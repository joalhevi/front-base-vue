<template>
    <v-row>
        <v-col cols="12" class="px-0">
            <v-card>
                <v-card-title>
                    <v-btn text :to="{name:'roles-index'}">
                        <v-icon>mdi-arrow-left</v-icon>
                        Atrás
                    </v-btn>
                    <v-spacer></v-spacer>
                    <h3>Actualizar Rol</h3>
                </v-card-title>
            </v-card>
        </v-col>
        <v-col cols="12" class="px-0">
            <v-card tile>
                <v-card-text>
                    <update-roles-component/>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    components: {
        UpdateRolesComponent: () => import('../../components/roles/updateRolesComponent')
    },
    data: () => ({
        dialog: true,
    })
}
</script>
