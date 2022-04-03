import Vue from 'vue'
import store from './../store'

let userPermissions = store.state.auth.abilities
Vue.prototype.auth = {}
Vue.prototype.auth.permission = (permission) => {
    if (userPermissions.includes('*')) {
        return true
    } else if (userPermissions.includes(permission)) {
        // console.log(permission)
        return true
    } else {
        return false
    }
}
