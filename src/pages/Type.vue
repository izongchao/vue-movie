<template>
    <div id="app">

        <header class="ui-header ui-header-positive ui-border-b">
            <i class="ui-icon-return" onclick="history.back()"></i>
            <h1>文本 type</h1>
            <button class="ui-btn">回首页</button>
        </header>

        <section class="ui-container">
            <section class="ui-notice">
                <vue-simple-spinner  message="加载中..."></vue-simple-spinner>
            </section>

            <section id="type" v-show="true">
                <div class="demo-item">
                    <p class="demo-desc">文本两端对齐</p>
                    <div class="demo-block">
                        <div class="ui-whitespace" >
                            <div class="ui-text-center">
                                <p class="ui-txt-justify-one">好的嗯</p>
                                <p class="ui-txt-justify-one">姓名</p>
                                <p class="ui-txt-justify-one">年月日</p>
                                <p class="ui-txt-justify-one">出生日期</p>
                            </div>

                            <p class="ui-txt-justify">
                                普通的多行文本内容：在首个《进击的巨人》预热视频中只是描述了一个巨人恰好拿起一人准备放进嘴巴里面，而另个场景则是超大型巨人附着浓重的烟雾将巨手拍下来。将于今年8月1日上映。</p>
                        </div>
                    </div>

                </div>
            </section>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style scoped>
    .ui-text-center {
        width: 100px;
    }
</style>
