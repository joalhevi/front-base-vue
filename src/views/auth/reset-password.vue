<template>
    <reset-component/>
</template>
<script>
export default {
    components:{
        resetComponent:()=>import('../../components/auth/resetPasswordComponent')
    },
}
</script>
