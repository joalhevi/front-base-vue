import Vue from 'vue'
import axios from 'axios'

const auth = JSON.parse(localStorage.getItem('vuex'))

export function getUsers(context, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.get(`${process.env.VUE_APP_BASE_API_URL}/api/users?page=${context.state.pagination.current_page}&q=${data.search}&office=${data.office}`)
            .then(response => {
                context.commit('setUsers', response.data.data)
                context.commit('setPagination', response.data.meta)
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}


export function showUser(context, params) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.get(`${process.env.VUE_APP_BASE_API_URL}/api/users/${params}`)
            .then(response => {
                context.commit('setUser', response.data.data)
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}


export function storeUsers(context, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.post(`${process.env.VUE_APP_BASE_API_URL}/api/users`,data)
            .then(response => {
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}


export function updateUser(context, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.put(`${process.env.VUE_APP_BASE_API_URL}/api/users/${data.id}`,data)
            .then(response => {
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}

export function blockUser(context, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.put(`${process.env.VUE_APP_BASE_API_URL}/api/users/active/${data}`)
            .then(response => {
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}

export function closeSessionUser(context, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.token
        axios.put(`${process.env.VUE_APP_BASE_API_URL}/api/users/remove-token/${data}`)
            .then(response => {
                resolve(response)
            }).catch(e => {
            console.log(e.response);
            reject(e)
        })
    })
}

