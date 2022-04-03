<template>

    <v-row  justify="center">
            <v-col cols="12" class="px-0" >
                <v-card tile>
                    <v-card-title>
                        <v-btn text tile  :to="{name:'users-show',params:{id:$route.params.id}}">
                            <v-icon>mdi-arrow-left</v-icon>
                            Atrás
                        </v-btn>
                        <v-spacer></v-spacer>
                        <h3>Actualizar Usuario</h3>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col cols="12" class="px-0">
                <v-card>
                    <v-card-text>
                        <edit-users-component></edit-users-component>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

</template>
<script>
export  default {
    components:{
        editUsersComponent: ()=> import("../../components/users/editUsersComponent"),
    },
}
</script>
