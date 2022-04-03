import axios from 'axios'

//llamado al login
export function signIn (context, user) {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_API_URL}/api/login`, {
            identificacion: user.identificacion,
            password: user.password,
            device_name: user.device_name
        }, { errorHandle: false }).then(response => {
            const token = response.data.access_token
            context.commit('setToken', token)
            context.commit('setUser', response.data.user)
            context.commit('setAbilities', response.data.abilities)
            context.commit('setTokenType', 'Bearer')
            context.commit('setIsLoggin', true)
            resolve(response)
        }).catch(e => {
            console.log('default ' + e)
            reject(e)
        })
    })
}


export function logout (context) {
    axios.defaults.headers.common['Authorization'] = context.state.token_type + ' ' + context.state.token
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_API_URL}/api/logout`).then(response => {
            context.commit('setIsLoggin', false)
            context.commit('destroyToken')
            localStorage.removeItem('vuex')
            resolve(response)
        }).catch(e => {
            // console.log(e)
            context.commit('setIsLoggin', false)
            context.commit('destroyToken')
            context.commit('authError', e.message)
            localStorage.removeItem('vuex')
            reject(e)
        })
    })
}


export function resetPassword (context, data) {
    axios.defaults.headers.common['Authorization'] = context.state.token_type + ' ' + context.state.token
    return new Promise((resolve, reject) => {
        axios.put(`${process.env.VUE_APP_BASE_API_URL}/api/reset-password`, data).then(response => {
            const token = response.data.access_token
            context.commit('setToken', token)
            context.commit('setUser', response.data.user)
            context.commit('setAbilities', response.data.abilities)
            context.commit('setTokenType', 'Bearer')
            resolve(response)
        }).catch(e => {
            reject(e)
        })
    })
}

export function forgotPassword (context, user) {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_API_URL}/api/forgot-password`, user).then(response => {
            resolve(response)
        }).catch(e => {
            reject(e)
        })
    })
}


export function findTokenResetPassword (context, token) {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_API_URL}/api/password/find/${token}`).then(response => {
            resolve(response)
        }).catch(e => {
            reject(e)
        })
    })
}

export function PasswordFindReset (context, data) {
    return new Promise((resolve, reject) => {
        axios.post('/api/password/reset', data).then(response => {
            resolve(response)
        }).catch(e => {
            reject(e)
        })
    })
}
