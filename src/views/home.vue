<template>
    <dashboard-component :key="$route.path"/>
</template>
<script>
export default {
    components: {
        DashboardComponent:()=>import('../components/dashboardComponent')
    }
}
</script>
