<template>

    <v-row>
        <v-col cols="12" class="px-0">
            <v-card class="elevation-1" tile>
                <v-card-title>
                    <v-btn tile depressed color="primary" :to="{name:'users-create'}"
                           v-if="auth.permission(['users-create'])">
                        <v-icon>mdi-plus</v-icon>
                        Crear
                    </v-btn>
                    <v-spacer></v-spacer>
                    <h3 class="font-weight-medium">Usuarios</h3>
                </v-card-title>
            </v-card>
        </v-col>

        <v-col cols="12" class="px-0">
            <index-users-component/>
        </v-col>
    </v-row>
</template>
<script>
export default {
    components: {
        indexUsersComponent: () => import('../../components/users/indexUsersComponent')
    }
}
</script>
