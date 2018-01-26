<template>
    <li 
        class="joke-item"
        ref="jokeItem"
    >
        <div class="item-component">
            <!-- 顶部分隔线 -->
            <div class="line-top"></div>
            <!-- 顶部 -->
            <div class="header">
                <!-- 头像 -->
                <img 
                    class="avatar"
                    :src="joke.author.avatar"
                >
                <!-- 名称 -->
                <p class="user-name">{{ joke.author.user_name }}</p>
            </div>
            <!-- 主要 -->
            <div class="main">
                <!-- 文字 -->
                <div class="joke-content">{{ joke.content }}</div>
                <!-- 分类名称 -->
                <div class="classifiaction-component">
                    <a 
                        class="classification"
                        @click="onPressClassification"
                    >{{ joke.classification.classification_name }}</a>
                </div>
                <!-- 图片 -->
                <img 
                    class="joke-image"
                    v-if="(joke.type === 2) && (joke.image_info)" 
                    v-lazy="joke.image_info.image_url">
                <!-- 视频 -->
                
                <video-player
                    class="joke-video-player"
                    v-if="joke.type === 3 && (joke.video_info)"
                    :previewImageUrl="joke.video_info.video_cover"
                    :videoUrl="joke.video_info.video_play_url.f30 || joke.video_info.video_play_url.f0"
                ></video-player>
            </div>
            <!-- 底部 -->
            <div class="footer">
                <!-- 段子信息 -->
                <div class="footer-info">
                    <div class="info-like-count">
                        <img :src="likeImageUnselectSrc">
                        {{ joke.like_count }}
                    </div>
                    <div class="info-comment-count">{{ joke.comment_count }}条评论</div>
                </div>
                <!-- 分隔线 -->
                <div class="footer-line-top"></div>
                <div class="footer-component">
                    <mt-button class="action-button" @click="onPressButtonLike">
                        <img :src="likeImageUnselectSrc">
                    </mt-button>
                    <mt-button class="action-button" @click="onPressButtonComment">
                        <img :src="commentImageSrc">
                    </mt-button>
                    <mt-button class="action-button" @click="onPressButtonShare">
                        <img :src="shareImageSrc">
                    </mt-button>
                </div>
                <!-- 分隔线 -->
                <div class="footer-line-bottom"></div>
            </div>
            <!-- 底部分隔线 -->
            <div class="line-bottom"></div>
        </div>
    </li>
</template>
<script>
    import likeImageUnselectSrc from '@/assets/Like_Unselect.png'
    import likeImageSelectedSrc from '@/assets/Like_Selected.png'
    import commentImageSrc from '@/assets/Comment.png'
    import shareImageSrc from '@/assets/Share.png'

    import VideoPlayer from './Video.vue'
    import { LazyLoad } from 'mint-ui'

    export default {
        components: {
            VideoPlayer
        },
        props: {
            /** 段子数据 */
            joke: {
                type: Object,
                default () {
                    return {}
                }
            },
            onPressButtonLike: {
                type: Function,
                default () {
                    return () => {}
                }
            },
            onPressButtonComment: {
                type: Function,
                default () {
                    return () => {}
                }
            },
            onPressButtonShare: {
                type: Function,
                default () {
                    return () => {}
                }
            },
            onPressClassification: {
                type: Function,
                default () {
                    return () => {}
                }
            }
        },
        data () {
            return {
                likeImageUnselectSrc,
                likeImageSelectedSrc,
                commentImageSrc,
                shareImageSrc,
            }
        },
        watch: {
            joke (value) {
                console.log('jiji - value - ', value)
            }
        },
        methods: {
            getOffset (el) {
                var _x = 0, _y = 0;
                while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                    _x += el.offsetLeft - el.scrollLeft;
                    _y += el.offsetTop - el.scrollTop;
                    el = el.offsetParent;
                }
                return { top: _y, left: _x };
            }
        }
    }
</script>
<style lang="scss" scpoed>
    li {
        list-style: none;
        margin: 0;
    }
    .line-top,
    .footer-line-top,
    .footer-line-bottom {
        height: 1px;
        background: lightgray;

        .footer-line-bottom {
            background: gray;
        }
    }
    .item-component {
        display: flex;
        flex-direction: column;
    }
    .header {
        display: flex;
        flex-direction: row;
        padding: 0px 10px;
        align-items: center;
    }
    .main {
        display: flex;
        flex-direction: column;
        padding: 0px 10px;   

        .joke-video {
            width: 100%;
        }
    }
    .footer {
        display: flex;
        flex-direction: column;
    }
    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        border: 1px solid lightgray;
    }
    .user-name {
        font-size: 28px;
        color: gray;
        margin-left: 20px;
    }
    .joke-content {
        font-size: 34px;
        text-align: justify;
        color: black;
    }
    .classification {
        font-size: 24px;
        color: gray;
        border: 2px solid gray;
        border-radius: 34px;
        padding: 2px 15px;
        display: inline;
        text-align: center;
    }
    .joke-image,
    .joke-image[lazy=loading],
    .classifiaction-component,
    .joke-content {
        margin-bottom: 20px;
    }
    .footer-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: gray;
        padding: 0 10px;

        .info-like-count {
            display: flex;
            flex-direction: row;
            align-items: center;
            img {
                width: 30px;
                height: 30px;
                margin-right: 6px;
            }
        }
    }
    .footer-component {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;
        height: 50px;
        justify-content: space-between;

        .action-button {
            background: rgba(0, 0, 0, 0);
            border: none;
            box-shadow: none;
            width: 33.3%;
            img {
                height: 100%
            }
            &:active {
                background: rgba(0, 0, 0, 0)
            }
        }
    }
    .line-bottom {
        height: 10px;
        background: lightgray;
    }
</style>