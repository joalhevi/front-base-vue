import Vue from 'vue';
import { required, email,min,confirmed,numeric } from "vee-validate/dist/rules";
import { ValidationProvider,ValidationObserver, extend } from 'vee-validate';
import { localize } from 'vee-validate';
import es from 'vee-validate/dist/locale/es.json';

extend('email', email);
extend('required', required);
extend('min', min);
extend('confirmed', confirmed);
extend('numeric', numeric);


localize('es',es);
Vue.component('ValidationProvider', ValidationProvider).default;
Vue.component('ValidationObserver', ValidationObserver).default;



