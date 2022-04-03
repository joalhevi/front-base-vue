<template>
    <v-row  justify="center" :key="$route.params.id">
            <v-col cols="12" class="px-0" >
                <v-card tile>
                    <v-card-title>
                        <v-btn text tile :to="{name:'users-index'}">
                            <v-icon>mdi-arrow-left</v-icon>
                            Atrás
                        </v-btn>
                        <v-spacer></v-spacer>
                        <h3>Usuario</h3>
                        <v-row justify="end" class="mt-7 mt-lg-0">

                            <v-btn color="warning"
                                   text
                                   tile
                                   v-if="auth.permission(['users-update'])"
                                   :to="{name:'users-update',params:{id:$route.params.id}}">
                                <v-icon>
                                    mdi-pencil
                                </v-icon>
                                Editar
                            </v-btn>

                            <block-users-component
                                v-if="auth.permission('users-status')"
                                :user="user"/>
                            <close-session-users-component
                                v-if="auth.permission('users-remove-token')"
                                :id="$route.params.id"/>
                        </v-row>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                    <show-users-component/>
            </v-col>
        </v-row>
</template>
<script>
import {mapState} from "vuex";

export  default {
    components:{
        showUsersComponent: ()=> import("../../components/users/showUsersComponent"),
        blockUsersComponent: ()=> import("../../components/users/blockUsersComponent"),
        CloseSessionUsersComponent: ()=>import("../../components/users/closeSessionUsersComponent")
    },
    computed:{
        ...mapState('users',['user'])
    }
}
</script>
