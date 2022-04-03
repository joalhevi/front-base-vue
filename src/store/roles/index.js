import state from './state';
import * as mutations from './mutations';
import * as actions from './actions'
import * as gatters from './gatters'

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    gatters
}