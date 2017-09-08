<template>
    <div id="app">
        <header class="ui-header ui-header-positive">
            <i class="ui-icon-return" onclick="history.back()"></i><h1>电影 </h1>
        </header>

        <section class="ui-notice" v-if="!show">
            <vue-simple-spinner  message="加载中..."></vue-simple-spinner>
        </section>
        <section class="ui-container" v-show="show" v-if="movieInfo.year">

        <div class="ui-whitespace-none" >
        <div class="ui-grid-trisect-img" >
            <div><img v-lazy="movieInfo.images.large" lazy="loading" class="lazy-img-fadein" ></div>
        </div>
        </div>
        <div class="ui-whitespace" style="margin: 10px 0">
            <ul class="ui-row">
                <li class="ui-col ui-col-67">
                    <h1>{{movieInfo.title}}</h1>
                    <p class="ui-txt-info ui-txt-tips" v-if="movieInfo.year">{{movieInfo.year}} / {{movieInfo.countries.join(' / ')}} / {{movieInfo.genres.join(' / ')}}</p>
                    <p class="ui-txt-info ui-txt-tips" v-if="movieInfo.year">上映时间：2017-7-27({{movieInfo.countries.join(' / ')}})</p>
                    <p class="ui-txt-info ui-txt-tips">片长：123分钟</p>
                </li>
                <li class="ui-col ui-col-33">
                    <div class="right-inner">
                        <p class="ui-txt-rating ui-txt-tips">豆瓣评分</p>
                        <h1 v-if="movieInfo.rating.average != 0">{{movieInfo.rating.average}}</h1>
                        <p class="star-p" v-html="getStar()"><span class="star-span"></span><span class="star-span"></span><span class="star-span"></span><span class="star-span"></span><span class="star-gray"></span></p>
                        <p class="ui-txt-info ui-txt-tips">{{movieInfo.ratings_count}}人</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="ui-whitespace" style="margin: 20px 0">
            <ul class="ui-row">
                <li class="ui-col ui-col-33">
                    <div class="see-button">想看</div>
                </li>
                <li class="ui-col ui-col-67" style="padding-left: 20px">
                    <div class="see-button">看过</div>
                </li>

            </ul>
        </div>
        <ul class="ui-list ui-list-text ui-list-link ">
            <li class="ui-border-b">
                <div class="ui-list-thumb-s">
                    <span class="xuan-gou"></span>
                </div>
                <h4 class="ui-nowrap">选座购票</h4>
                <div class="ui-txt-warning ui-txt-sub">￥23起</div>
            </li>
        </ul>
        <ul class="ui-list ui-list-pure">
            <li class="">
                <p><span>故事简介</span></p>
                <h6>{{movieInfo.summary}}</h6>
            </li>
            <li class="">
                <p><span>影人</span></p>

            </li>
        </ul>
        <ul class="ui-grid-trisect" >
            <li v-for="cast in movieInfo.casts">
                <div class="">
                    <div class="ui-grid-trisect-img">
                        <div><img v-lazy="cast.avatars.large" lazy="loading" class="lazy-img-fadein" ></div>
                    </div>
                    <div>
                        <h5 class="ui-nowrap" style="text-align: center;">{{cast.name}}</h5>
                    </div>
                </div>
            </li>
        </ul>

        </section>

    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                movieInfo:{},
                show:false,
                apiUrl:'https://api.douban.com',
                msg: 'Welcome to Your Vue.js App'
            }
        },
        beforeRouteEnter(to, from, next){
            next(vm => {

                vm.show = false;
                vm.movieInfo = {};
                // 通过 `vm` 访问组件实例
                vm.fetchData();
            })
        },
        //离开后销毁数据
        deactivated () {
            this.$destroy();
        },
        methods:{
            getStar(){
                let content = '';
                let rating = this.movieInfo.rating.average;
                if(rating == 0) {
                    for(let t = 0; t < 5; t++) {
                        content += '<span class="star-gray"></span>';
                    }
                    return content;
                }

                let s = rating/2;
                let l = s.toString().split('.');
                let ls = parseInt(parseFloat('0.'+l[1])*100);

                if(ls > 50) {
                    s+=1;
                }

                let e = 5 - l[0];

                for(let i = 1; i < s; i++) {
                    content += '<span class="star-span"></span>';
                }
                if(ls !=0 && ls <=50){
                    content += '<span class="star-half"></span>';
                }
                for(let p = 1; p < e; p++) {
                    content += '<span class="star-gray"></span>';
                }
                return content;
            },
            fetchData() {
                this.$http.jsonp(this.apiUrl+'/v2/movie/subject/'+this.$route.params.id)
                    .then((response) => {
                        let ret = response.data;

                        this.movieInfo = ret;
                        console.log(ret);
                        this.show = true;
                    })
                    .catch(function(response) {
                        console.log(response)
                    })
            }
        }
    }
</script>

<style scoped>
    .ui-list-thumb-s {
        width: 18px;
        height: 18px;
    }
    .ui-list-thumb, .ui-list-thumb-s, .ui-list-img, .ui-list-icon {
        position: relative;
        margin: 0px 4px 0px 0;
    }
    .xuan-gou{
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACwUlEQVRoQ+2YwXHbMBAA72ZEfuMS1EHsDqQKIleQpIJEDx2ekZ+EHkoqiEpQKohcQZgO0kGcrzRDZM5DJpIFksABoO0Z88MHCXAXhzuAQHjmFz5zfngRcImg1voSANYAMDHG/AKAbZ7nN/P5/M6lfdc7ySOgtX4HAF8tEGWWZdNQiaQCHfCNT7BEMgEH+CgSSQQ84BuJb0Q0k+RDdAEB/D03EYlYRI3aRkoKb4z5qZTiSuV9RROQwjOxMWaulPrsTQ8QZyELga8FrpVS20cRCIWvob8Q0cfBBSLBMzevyFMiKn0lxDkQEb5hZgmeRqUxZgwAM0Tk+ybLsnnbii0SSADfN/CtK7a3gA88l8eqqmaj0WhcVdUWEV/1kXY8t0p4CfjC53k+aUKvtf4BAKJafyRVEtHVsaSzQCB8247UOyDGmBul1LJp6CTwVOBr6JMo9Ao8MXhetf8opS6cIpAY/tYYcylI7JOda2sEUsHzCCLihBet1WrFv5jfXRPhuG1nBIaAZwBfAQB4T0SbzirkA193dNVsAbraPhy99Xp9cTgcePRdS+sZPH//ZArVpwdcr50vRJwuFovdY8DbBHgv8saZ/v+LOz4ysbVLNfLWHNBa/waAfyVKIHLSJDX8WQSKoigR8XUoOLcfAt4msETETzEEmtzgvmIlrI3rbB2IFIVbIrrPiZTwZxFoPrjf73eBU+kOEa/rqcRnokGlsmtGWFdiHrUIEr4z0Vrn+zpp3UrUEnzUwSdmfKLMKyDf+VfvbV/Hns9F8NYp5PJhwRagq1sxvFiAGxZFsYkQiSD4UIHQkhsMHySgteb8+OAy5SzvRIEPFZD+pEeDDxUwgtGPCh8kIEji6PBBAp6LXRL4IAGPbUcy+GABB4mk8FEEmkQuioJPy3jbMUZE/kNbSo7LfQtD78GWb4dDv/8iMPSIP/zeX8AS0UBkTPmfAAAAAElFTkSuQmCC");
    }
    .see-button{
        text-align: center;
        height: 34px;
        line-height: 34px;
        border: 1px solid #ffc161;
        color:#ffc161;
        border-radius: 3px;
    }
    .ui-txt-rating{
        color:#c7c7c7;
    }
    .right-inner{
        text-align: center;
        width: 80px;
        margin: 10px 10px;
        padding: 6px 0;
        background: #ffffff;
        float: right;
        -webkit-box-shadow:0 0 10px rgba(0, 0, 0, .1);
    }
    .right-inner h1{
        line-height: 20px;
    }
    .ui-list{
        background: #f4f9f5;
    }
    #app{
        background: #f4f9f5;
    }
    .ui-header-positive, .ui-footer-positive {
        background-color: #2a362c;
    }
    .ui-text-center {
        width: 100px;
    }
    .ui-whitespace-none .ui-grid-trisect-img {
        background: #2a362c;
        border-top: 15px solid #2a362c;
        padding-top: 100%;
    }
    .ui-whitespace-none .ui-grid-trisect-img div{
        margin: 0% 20%;
        margin-top: 0;
        margin-bottom: 0;
        width: 60%;
        height: 100%;
        background-position: top;
    }
    .ui-grid-trisect-img{
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
        width: 100%!important;
        margin: auto;
    }
    .ui-grid-trisect .lazy-img-fadein[lazy=loaded] {
        height: 100%!important;
    }
    .lazy-img-fadein[lazy-progressive=true] {
        width: 100%!important;
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
    .lazy-img-fadein[lazy=loading]{
        width: 100% !important;
        margin: auto;
        /*-webkit-animation-duration: 1s;*/
        /*animation-duration: 1s;*/
        /*-webkit-animation-fill-mode: both;*/
        /*animation-fill-mode: both;*/
        /*-webkit-animation-name: fadeIn;*/
        /*animation-name: fadeIn;*/
    }
    .ui-grid-trisect-img div, .ui-grid-halve-img div {
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
