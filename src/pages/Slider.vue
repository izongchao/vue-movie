<template>
    <div id="slide">
        <section v-if="show">
        <swipe class="my-swipe" :style="'height:' + width ">
            <swipe-item v-for="(imgUrl, index) in swiperImageLists" :key="index" v-lazy:background-image="imgUrl" lazy="loading" class="slide lazy-img-fadein"></swipe-item>
        </swipe>
        </section>
    </div>
</template>

<script>
    import 'vue-swipe/dist/vue-swipe.css';
    let winH = window;
    let h = winH.innerWidth*288/720;
    import Vue from 'vue';
    // in ES6 modules
    import { Swipe, SwipeItem } from 'vue-swipe';
    Vue.component('swipe', Swipe);
    Vue.component('swipe-item', SwipeItem);

    export default {
        name: 'slide',
        created(){
            let s = this.$refs.test1;
            console.log(s);

            console.log('create');
        },
        mounted(){
            let s = this.$refs.test1;
            let _this = this;
            setTimeout(function(){
                _this.swiperImageLists = [
                    'http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg',
                    'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg',
                    'http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg'
                ]
                _this.show = true;
            },3000);

        },
        data(){
            return {
                show:false,
                width:h+'px',
                swiperImageLists:[

                ]
            }
        }
    }
</script>

<style>

    .my-swipe {
        color: #1ca7da;
        font-size: 30px;
        text-align: center;
    }
    .slide {
        background-size: cover;
        background-repeat: no-repeat;
        color: #fff;
    }
    .slide1 {
        background-image: url("http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        color: #fff;
    }

    .slide2 {
        background-image: url("http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        color: #fff;
    }

    .slide3 {
        background-image: url("http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        color: #fff;
    }
    @-webkit-keyframes fadeIn {
        0% {
            opacity: 0
        }

        to {
            opacity: 1
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0
        }

        to {
            opacity: 1
        }
    }
    .lazy-img-fadein[lazy=loaded] {
        -webkit-animation: fadeIn .8s ease both;
        animation: fadeIn .8s ease both;
        width: 100% !important;
        height: 100% !important;
        margin: auto;
    }

    .lazy-img-fadein[lazy-progressive=true] {
        width: 100% !important;
        margin: auto;
    }

    .lazy-img-fadein[lazy=error] {
        border-radius: 2px;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
    }
    .ui-col-33 .lazy-img-fadein[lazy=loaded]{
        -webkit-box-shadow:0 0 5px rgba(0, 0, 0, .5);
    }
    .lazy-img-fadein[lazy=loading] {
        width: 100% !important;
        margin: auto;
    }
</style>

