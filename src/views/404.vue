<template>
    <v-container class="fill-height" fluid>
        <v-row
            align="center"
            justify="center"  no-gutters>

            <v-col cols="12" md="auto" class="text-center">
                <v-img contain src="/images/404.svg" />
                <h2 class="display-3 font-weight-bold"> Whoops, 404</h2>
                <p class="title">La página que estabas buscando no existe.</p>
                <v-btn class="ma-2" outlined  to="/">Regresar al inicio</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
