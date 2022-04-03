<template>
    <v-list dense>
        <template v-for="item in items">
            <v-row v-if="item.heading" :key="item.heading" align="center">
                <v-col cols="6">
                    <v-subheader v-if="item.heading">
                        {{ item.heading }}
                    </v-subheader>
                </v-col>
            </v-row>
            <v-list-group
                v-else-if="item.children && auth.permission(item.permission)"
                :key="item.text"
                v-model="item.model"
                :prepend-icon="item.model ? item.icon : item['icon-alt']"
                append-icon=""
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item
                    class="pl-12"
                    v-for="(child, i) in item.children"
                    :key="i"
                    v-if="auth.permission(child.permission)"
                    :to="child.link"
                    exact-active-class="green darken-2 white--text "
                    link
                >
                    <v-list-item-action v-if="child.icon">
                        <v-icon>{{ child.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ child.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
            <v-list-item
                v-else-if="auth.permission(item.permission)"
                :key="item.title"
                :to="item.link"
                exact-active-class="green darken-2 white--text"
                link
            >
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ item.title }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>
</template>
<script>
export default {
    data: () => ({
        items: [
            {
                title: "Tablero",
                icon: "mdi-view-dashboard",
                link: "/",
                permission: ["home"],
            },
            {
                title: "Panel de Control",
                icon: "mdi-chevron-up",
                "icon-alt": "mdi-chevron-down",
                model: false,
                link: "",
                permission: ["panel-admin"],
                children: [
                    {
                        title: "Usuarios",
                        icon: "mdi-account-group",
                        link: "/users",
                        permission: ["users-index"],
                    },
                    {
                        title: "Roles",
                        icon: "mdi-format-list-checks",
                        link: "/roles",
                        permission: ["roles-index"],
                    },
                ],
            },

            {
                title: "404",
                icon: "mdi-alert-box-outline",
                link: "/404",
                permission: "404",
            },
            {
                title: "403",
                icon: "mdi-alert-box-outline",
                link: "/403",
                permission: "403",
            },
            {
                title: "500",
                icon: "mdi-alert-box-outline",
                link: "/500",
                permission: "500",
            },
        ],
    }),
};
</script>
