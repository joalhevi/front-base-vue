import axios from 'axios'

const auth = JSON.parse(localStorage.getItem('vuex'))

/**
 * index abilities
 * @param context
 * @param data
 * @returns {Promise<unknown>}
 */
export function getAbilities(context, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.get(`${process.env.VUE_APP_BASE_API_URL}/api/abilities`)
            .then(response => {
                context.commit('setAbilities', response.data.data)
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}

/**
 * index roles
 * @param context
 * @param data
 * @returns {Promise<unknown>}
 */
export function getRoles(context, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.get(`${process.env.VUE_APP_BASE_API_URL}/api/roles`)
            .then(response => {
                context.commit('setRoles', response.data.data)
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}

/**
 * show one role
 * @param context
 * @param data
 * @returns {Promise<unknown>}
 */
export function showRole(context, params) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.get(`${process.env.VUE_APP_BASE_API_URL}/api/roles/${params}`)
            .then(response => {
                context.commit('setRole', response.data.data)
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}

/**
 * create new role
 *
 * @param context
 * @param data
 * @returns {Promise<unknown>}
 */
export function storeRoles(context, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.post(`${process.env.VUE_APP_BASE_API_URL}/api/roles`,data)
            .then(response => {
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}

/**
 * update roles
 *
 * @param context
 * @param data
 * @returns {Promise<unknown>}
 */
export function updateRoles(context, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.put(`${process.env.VUE_APP_BASE_API_URL}/api/roles/${data.id}`,data)
            .then(response => {
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}

/**
 * delete roles
 *
 * @param context
 * @param data
 * @returns {Promise<unknown>}
 */
export function deleteRoles(context,id) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.delete(`${process.env.VUE_APP_BASE_API_URL}/api/roles/${id}`)
            .then(response => {
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}

