export default [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "view-home" */ '../views/home'),
        meta: {
            requiresAuth: true,
            permissions: ['home']
        }
    },
    {
        path: '/403',
        name: '403',
        component: () => import(/* webpackChunkName: "view-403" */ '../views/403'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "view-404" */ '../views/404'),
    },
    {
        path: '/500',
        name: '500',
        component: () => import(/* webpackChunkName: "view-500" */ '../views/500'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "view-login" */ '../views/auth/login'),
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import(/* webpackChunkName: "view-reset-password" */ '../views/auth/reset-password'),
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/password/find/:token',
        name: 'find-reset-password',
        component: () => import(/* webpackChunkName: "view-find-password" */ '../views/auth/findResetPassword'),
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: () => import(/* webpackChunkName: "view-perfil" */ '../views/auth/profile'),
        meta: {
            requiresAuth: true,
            permissions: ['perfil']
        }
    },
    {
        path: '/reset',
        name: 'reset',
        component: () => import(/* webpackChunkName: "view-change-password" */ '../views/changePassword'),
        meta: {
            requiresAuth: true,
            permissions: ['reset']
        }
    },
    {
        path: '/roles',
        name: 'roles-index',
        component: () => import(/* webpackChunkName: "view-roles-show" */ '../views/roles/index'),
        meta: {
            requiresAuth: true,
            permissions: ['roles-index']
        }
    },
    {
        path: '/roles/create',
        name: 'roles-create',
        component: () => import(/* webpackChunkName: "view-roles-create" */ '../views/roles/create'),
        meta: {
            requiresAuth: true,
            permissions: ['roles-create']
        }
    },
    {
        path: '/roles/:id/edit',
        name: 'roles-update',
        component: () => import(/* webpackChunkName: "view-roles-edit" */ '../views/roles/update'),
        meta: {
            requiresAuth: true,
            permissions: ['roles-update']
        }
    },

    {
        path: '/users',
        name: 'users-index',
        component: () => import(/* webpackChunkName: "view-users-index" */ '../views/users/index'),
        meta: {
            requiresAuth: true,
            permissions: ['users-index']
        }
    },
    {
        path: '/users/create',
        name: 'users-create',
        component: () => import(/* webpackChunkName: "view-users-create" */ '../views/users/create'),
        meta: {
            requiresAuth: true,
            permissions: ['users-index']
        }
    },
    {
        path: '/users/:id',
        name: 'users-show',
        component: () => import(/* webpackChunkName: "view-users-show" */ '../views/users/show'),
        meta: {
            requiresAuth: true,
            permissions: ['users-show']
        }
    },
    {
        path: '/users/:id/edit',
        name: 'users-update',
        component: () => import(/* webpackChunkName: "view-users-edit" */ '../views/users/update'),
        meta: {
            requiresAuth: true,
            permissions: ['users-update']
        }
    }
]