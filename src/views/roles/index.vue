<template>

    <v-row>
        <v-col cols="12" class="px-0">
            <v-toolbar class="elevation-1">
                <v-btn
                    v-if="auth.permission(['roles-create'])"
                    :to="{name:'roles-create'}"
                    tile
                    depressed
                    color="primary"
                >
                    <v-icon>mdi-plus</v-icon>
                    Crear
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="font-weight-medium">Roles</v-toolbar-title>

            </v-toolbar>
        </v-col>

        <v-col cols="12" class="px-0">

            <index-roles-component/>

        </v-col>

        <router-view/>

    </v-row>

</template>
<script>
export default {
    components: {
        indexRolesComponent: () => import('../../components/roles/indexRolesComponent')
    },
}
</script>
