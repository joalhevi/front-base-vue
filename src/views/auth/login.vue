<template>
    <login-component/>
</template>
<script>
export default {
    components:{
        loginComponent:()=>import('../../components/auth/loginComponent')
    },
    data:()=>{
        return{
            items:[],
            show:false
        }
    }
}
</script>

