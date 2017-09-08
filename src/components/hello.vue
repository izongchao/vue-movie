<template>
    <button class="ui-btn ui-btn-lg" @click="change" >{{ msg }}</button>
</template>
<script>
    export default {
        data(){
            return {
                msg:parseInt(this.content)
            }
        },
        props: {
            content: {
                type: String,
                default: ''
            },

        },
        methods:{
            change:function(){
                this.msg +=1;
                this.$emit('changeNumber');
            }
        }
    }
</script>
<style>

</style>