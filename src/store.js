import Vue from 'vue';
import Vuex from 'vuex';
import auth from './store/auth/index';
import roles from './store/roles/index';
import users from './store/users/index';

import VuexPersistence from 'vuex-persist'
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    store: window.localStorage,
    modules:['auth','users']
});
export default new Vuex.Store({
    state: {
        loader: false,
        dialogSuccess:false,
    },
    mutations: {
        loader(state){
            state.loader = !state.loader
        },
        dSuccess(state){
            state.dialogSuccess = !state.dialogSuccess
        }
    },
    getters:{
    },
    actions: {
        loader(context){
            context.commit('loader')
        },
        dSuccess(context){
            context.commit('dSuccess')
        }
    },
    modules:{
        auth,
        roles,
        users
    },
     plugins:[vuexLocal.plugin]
})
