<template>
    <find-reset-component/>
</template>
<script>
export default {
    components:{
        findResetComponent:()=>import('../../components/auth/findResetPassword')
    }
}

</script>
