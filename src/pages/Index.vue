<template>
    <div id="app">
        <section class="ui-container">
            <section id="list">
                <div class="demo-item">
                    <div class="demo-block">
                        <ul class="ui-list ui-list-pure ui-border-b">
                            <li class="ui-border-t" @click="goTo('type')" data-href="type.html">
                                文本
                            </li>
                            <li class="ui-border-t" @click="goTo('movie_list')" data-href="icon.html">
                                图标
                            </li>
                            <li class="ui-border-t" @click="goTo('slider')" data-href="layout.html">
                                slider
                            </li>
                            <li class="ui-border-t" @click="goTo('slider')" data-href="layout.html">
                                布局
                            </li>
                            <li class="ui-border-t" @click="toast" data-href="grid.html">
                                网格
                            </li>
                            <li class="ui-border-t" data-href="arrowlink.html">
                                箭头链接
                            </li>
                            <li class="ui-border-t" data-href="border.html">
                                1px解决方案
                            </li>
                            <li class="ui-border-t" data-href="nowrap.html">
                                文字截断
                            </li>
                            <li class="ui-border-t" data-href="placehold.html">
                                占位
                            </li>
                            <li class="ui-border-t" data-href="whitespace.html">
                                两端留白
                            </li>
                            <li class="ui-border-t" data-href="justify.html">
                                {{total}}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <hello @changeNumber="changeNumberToal" @click.native="naviate" content="0"></hello>
            <hello @changeNumber="changeNumberToal" content="0"></hello>

        </section>
    </div>
</template>

<script>
    import printMe from '../print.js';

    import Vue from 'vue';
    import Toasted from 'vue-toasted';

    Vue.use(Toasted);
    export default {
        name: 'app',
        data () {
            return {
                total:0,
                msg: 'Welcome to Your Vue.js App'
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            document.title = '首页';
        },
        methods : {
            naviate(){
                this.total +=1;
            },
            changeNumberToal()
            {
                this.total +=1;
                console.log(11111);
            },
            goTo(location) {
                this.$router.push(location);
            },
            toast(){
                printMe();
                this.$toasted.show("Toasted !!", {
                    theme: "primary",
                    fullWidth:false,
                    position: "bottom-center",});
            }
        }
    }
</script>

<style>


</style>
