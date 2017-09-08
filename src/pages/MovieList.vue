<template>
    <div id="movielist" >
        <div>
            <section class="ui-notice" v-if="!show">
                <vue-simple-spinner message="加载中..."></vue-simple-spinner>
            </section>
            <section v-if="show">
                <swipe class="my-swipe" :style="'height:' + width ">
                    <swipe-item v-for="(imgUrl, index) in swiperImageLists" :key="index" v-lazy:background-image="imgUrl" lazy="loading" class="slide lazy-img-fadein"></swipe-item>
                </swipe>
                <section class="ui-panel ui-panel-simple">
                    <h2 class="ui-arrowlink"><span>院线热映</span><span class="ui-panel-title-tips">全部{{in_theaters.total}}</span></h2>
                </section>
                <ul class="ui-grid-trisect" style="">
                    <li v-for="movie in in_theaters.subjects" @click="movieInfo(movie.id)">
                        <div class="">
                            <div class="ui-grid-trisect-img">
                                <div><img v-lazy="movie.images.large" lazy="loading" class="lazy-img-fadein"></div>
                            </div>
                            <div>
                                <h5 class="ui-nowrap">{{movie.title}}</h5>
                                <p class="star-p ui-txt-info ui-txt-tips ui-nowrap" v-html="getStar(movie)"></p>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
                <section class="ui-panel ui-panel-simple">
                    <h2 class="ui-arrowlink"><span>即将上映</span><span class="ui-panel-title-tips">全部{{coming_soon.total}}</span></h2>
                </section>
                <ul class="ui-grid-trisect">
                    <li v-for="movie in coming_soon.subjects" @click="movieInfo(movie.id)">
                        <div >
                            <div class="ui-grid-trisect-img">
                                <div><img v-lazy="movie.images.large" lazy="loading" class="lazy-img-fadein"></div>
                            </div>
                            <div>
                                <h5 class="ui-nowrap">{{movie.title}}</h5>
                                <p class="ui-txt-info ui-txt-tips ui-nowrap">{{movie.collect_count}}人想看</p>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>

                <section class="ui-panel ui-panel-simple">
                    <h2 ><span>你可能感兴趣</span></h2>
                </section>
                <div class="ui-whitespace vertical-list">
                    <ul class="ui-row ui-border-b" v-for="movie in top250.subjects" @click="movieInfo(movie.id)">
                        <li class="ui-col ui-col-33">
                            <div><img v-lazy="movie.images.large" lazy="loading" class="lazy-img-fadein"></div>
                        </li>
                        <li class="ui-col ui-col-67" >
                            <h1>{{movie.title}}</h1>
                            <p class="star-p ui-txt-info ui-txt-tips ui-nowrap" v-html="getStar(movie)">
                            </p>
                            <p class="ui-txt-info ui-txt-tips">导演：{{movie.directors[0].name}}</p>
                            <p class="ui-txt-info ui-txt-tips ui-nowra-multi">演员：{{getCatsts(movie)}}</p>
                            <p class="ui-txt-default ui-txt-tips ui-border-t end-title">最近值得看的热门电影</p>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import 'vue-swipe/dist/vue-swipe.css';

    let winH = window;
    let h = winH.innerWidth*288/720;
    import Vue from 'vue';
    // in ES6 modules
    import { Swipe, SwipeItem } from 'vue-swipe';

    export default {
        name: 'movielist',
        data () {
            return {
                show: false,
                width:h+'px',
                first: 'background',
                apiUrl: 'http://douban.xuzongchao.com/api/index',
                msg: 'Welcome User',
                in_theaters: {},
                coming_soon: {},
                top250:{},
                swiperImageLists:[],
                swiperImageListsBak:[
                    'http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg',
                    'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg',
                    'http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg'
                ]
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            document.title = '电影列表';

            this.fetchData()
        },
        components(){
            Swipe,SwipeItem
        },
        methods: {
            getCatsts(item) {
                let listHtml = '';
                item.casts.map(function(value, index, array) {
                    if(index != 0){
                        listHtml += ' / '+ value.name ;
                    } else {
                        listHtml += value.name ;
                    }

                });

                return listHtml;
            },
            getStar(item){
                if (item.rating.average == 0) {
                    return '暂无评分';
                }
                let s = item.rating.average / 2;
                let l = s.toString().split('.');
                let ls = parseInt(parseFloat('0.' + l[1]) * 100);
                if (ls > 50) {
                    s += 1;
                }
                let e = 5 - l[0];
                console.log(ls);
                let content = '';
                for (let i = 1; i < s; i++) {
                    content += '<span class="star-span"></span>';
                }
                if (ls != 0 && ls <= 50) {
                    content += '<span class="star-half"></span>';
                }
                console.log('分数' + item.rating.average + '最后一个：' + e);
                for (let p = 1; p < e; p++) {
                    content += '<span class="star-gray"></span>';
                }

                content += ' ' + item.rating.average;
                return content;
            },
            movieInfo(id){
                this.$router.push('/movie/' + id);
            },
            goTo() {
                let name = this.$router.currentRoute;
                this.$router.push('/foo');
                console.log(name);
            },
            apiAlert() {
                console.log(this.$route.params.id);
                this.msg = this.msg.split('').reverse().join('');
            },
            fetchData() {
                this.$http.jsonp(this.apiUrl)
                    .then((response) => {
                        let ret = response.data.result;
                        console.log();
                        this.in_theaters = ret.in_theaters;
                        this.coming_soon = ret.coming_soon;
                        this.top250 = ret.top250;
                        console.log(ret.in_theaters);
                        console.log(ret);
                        this.show = true;
                        this.swiperImageLists = this.swiperImageListsBak;
                    })
                    .catch(function (response) {
                        console.log(response)
                    })
            }
        }
    }
</script>

<style scoped>
    /*[v-cloak]{visibility:hidden}*/

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0
    }
    .end-title{
        margin-top: 10px;padding-top: 10px;
    }
    .vertical-list{
        background: #ffffff;
    }
    .vertical-list ul{
        padding: 10px 0;
    }
    .vertical-list ul .ui-col-33{
         position: relative;padding-top: 40%;width: 29%
     }
    .vertical-list ul .ui-col-67{
        padding-left: 15px;
    }
    .ui-grid-trisect {
        background: #ffffff;
        display: block;
        overflow: scroll;
        white-space:nowrap;
        -webkit-overflow-scrolling: touch;
    }

    .ui-grid-trisect > li {
        display:inline-block;
        width: 112px;
        float: none;
        margin-right: 10px;
    }
    .ui-grid-trisect-img {
        display:inline-block;
        width: 112px;
        background: #e6e6e6;
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


    .ui-grid-trisect-img div, .ui-grid-halve-img div, .ui-col-33 div{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        position: absolute;
        text-align: center;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

</style>
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

</style>
