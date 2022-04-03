<template>
    <v-row align="start" justify="start">
        <v-col>
            <v-container fluid>
                <v-card class="px-3 py-5" tile>
                    <v-row align="center" justify="center">
                        <v-col
                            cols="12"
                            md="6"
                            class="py-2 py-md-3 px-md-3"
                            v-for="item in items"
                            v-if="auth.permission(item.permission)"
                            :key="item.title"
                        >
                            <v-card
                                class="mx-auto text-center elevation-2"
                                :to="item.link"
                                outlined
                                hover
                            >
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            class="headline mb-1"
                                            v-text="item.title"
                                        ></v-list-item-title>
                                        <v-list-item-subtitle
                                            v-text="item.description"
                                        ></v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-avatar tile>
                                        <v-icon
                                            x-large
                                            v-html="item.icon"
                                            :color="item.color"
                                        ></v-icon>
                                    </v-list-item-avatar>
                                </v-list-item>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-col>
    </v-row>
</template>
<script>
export default {
    components: {},
    data: () => {
        return {
            items: [
                {
                    title: "Mi Perfil",
                    description: "Ingresar a mi perfil",
                    icon: "mdi-face-agent",
                    link: "/perfil",
                    color: "red darken-1",
                    permission: ["perfil"],
                },
                {
                    title: "Usuarios",
                    description: "Administrar usuarios de la aplicación",
                    icon: "mdi-account-multiple",
                    link: "/users",
                    color: "red darken-1",
                    permission: ["users-index"],
                },
                {
                    title: "Roles y Permisos",
                    description:
                        "Administrar los roles y permisos de los usuarios de la aplicación",
                    icon: "mdi-select-group",
                    color: "red darken-1",
                    link: "/roles",
                    permission: ["roles-index"],
                },
            ],
        };
    },
};
</script>
