<template>
  <v-app id="sandbox" v-if="isLogged">
    <v-navigation-drawer
        v-model="primaryDrawer.model"
        :clipped="primaryDrawer.clipped"
        :permanent="primaryDrawer.type === 'permanent'"
        :temporary="primaryDrawer.type === 'temporary'"
        app
        overflow>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Navegación
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <nav-component></nav-component>
    </v-navigation-drawer>

    <v-app-bar
        :clipped-left="primaryDrawer.clipped"
        :color="dark ? '': 'white darken-2'"
        app>
      <v-app-bar-nav-icon
          dark
          v-if="primaryDrawer.type !== 'permanent'"
          @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />

      <v-toolbar-title class="flex">
        <h1>AppName</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          v-model="dark"
          @click="dark = !dark"
          icon
          small>
        <v-icon dark>
          mdi-theme-light-dark
        </v-icon>
      </v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn
              v-on="on"
              small
              text
              tile
          >
            {{$vuetify.breakpoint.mdAndDown ? user.nombre[0] + user.apellido[0] : user.nombre_completo}} <br>
            {{user.rol}}
            <!--                        <v-icon>mdi-dots-vertical</v-icon>-->
          </v-btn>
        </template>
        <v-list>

          <v-list-item :to="'/perfil'">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>

              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="_logout()">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Cerrar Sesión</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main >
      <v-container fluid transition="scale-transition" class="px-5">
        <router-view></router-view>
      </v-container>
    </v-main>


    <v-footer :inset="true" >
      <v-spacer></v-spacer>
      <span class="px-4">&copy;
              Cooporcicultores
            {{ new Date().getFullYear() }}
            </span>
    </v-footer>
    <v-overlay :value="loader">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar
        :value="dialogSuccess"
        @input="_dialogSuccess"
        :vertical="vertical"
        bottom
        left
        color="indigo darken-4"
        elevation="24"
        :multi-line="mode === 'multi-line'"
    >
      {{ messageSuccess }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="success"
            text
            v-bind="attrs"
            @click="_dialogSuccess()">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
  <v-app id="sandbox" v-else>
    <router-view></router-view>
    <v-overlay :value="loader" z-index="999">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar
        :value="dialogSuccess"
        @input="_dialogSuccess"
        :vertical="vertical"
        absolute
        centered
        color="indigo darken-4"
        elevation="24"
        :multi-line="mode === 'multi-line'"
    >
      {{ messageSuccess }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="success"
            text
            v-bind="attrs"
            @click="_dialogSuccess()">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>

</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  components: {
    navComponent: () => import('./components/listNavigation'),
  },
  watch: {
    dark: {
      handler() {
        localStorage.setItem("dark", JSON.stringify(this.dark));
        this.$vuetify.theme.dark = this.dark
      },
    },
  },
  computed: {
    ...mapState('auth', ['isLogged','user']),
    ...mapState(['loader']),
    ...mapState(['dialogSuccess', 'messageSuccess'])
  },
  mounted() {
    this.$vuetify.theme.dark = this.dark
  },

  data: () => ({
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: true,
    },
    dark: JSON.parse(localStorage.getItem("dark")) || false,
    mode: '',
    vertical: true,
  }),
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions(['dSuccess']),
    _dialogSuccess() {
      this.dSuccess();
    },
    _logout() {
      this.logout().then(response => {
        // console.log('cerrar sesión')
        this.$router.push({name: 'login'})
      }).catch(e => {
        // console.log('fallo cerrar sesion')
        this.$router.push({name: 'login'})
      })
    }
  }
}
</script>
