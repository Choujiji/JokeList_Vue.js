<template>
    <div>
        <!-- 预览图及播放按钮 -->
        <div 
            class="preview-image-button"
            v-if="showPreviewImage"
            @click="startToPlay"
        >
            <!-- 预览图片 -->
            <img 
                class="preview-image"
                :src="previewImageUrl"
            >
            <!-- 播放按钮视图 -->
            <div class="play-button">
                <img class="play-button-img" :src="PlayImageSrc">
            </div>
            <!-- 底部的描述信息 -->
            <div class="description">
            </div>
        </div>
        
        <video
            id="video"
            ref="video"
            autoplay
            controls
            :poster="previewImageUrl"
            v-if="!showPreviewImage"
            :src="videoUrl"
        >
            Your browser does not support the video tag.
        </video>
    </div>
</template>
<script>
    import PlayImageSrc from '@/assets/Play.png'

    import { Toast } from 'mint-ui'

    export default {
        props: {
            videoUrl: String,
            previewImageUrl: String,
            videoWidth: Number,
            videoHeight: Number,
            onStartPlay: Function,
            onPausePlay: Function,
            onStopPlay: Function
        },
        data () {
            return {
                showPreviewImage: true,
                isPlaying: false,
                /** 播放按钮图片 */
                PlayImageSrc
            }
        },
        watch: {
            isPlaying (newValue) {
                if (newValue === true) {
                    console.log('监听了~')
                    // 开始播放后，监听统一停止播放消息
                    this.$bus.on('endVideoPlayBack', this.stopPlaying.bind(this))
                    // 监听他人开始播放消息
                    this.$bus.on('startVideoPlayBack', this.checkToStopPlaying.bind(this))
                } else {
                    // 停止播放后，移除监听
                    this.$bus.off('endVideoPlayBack', this.stopPlaying.bind(this))
                    this.$bus.off('startVideoPlayBack', this.checkToStopPlaying.bind(this))
                }
            }
        },
        methods: {
            startToPlay() {
                this.showPreviewImage = false;
                setTimeout(() => {
                    // 开始播放
                    const video = this.$refs.video
                    video.play()
                    this.isPlaying = true
                    // 发送开始播放消息（对象是播放地址）
                    this.$bus.emit('startVideoPlayBack', this.videoUrl)
                }, 100)
            },
            stopPlaying () {
                console.log('停止播放======')
                this.showPreviewImage = true;
                this.isPlaying = false
            },
            checkToStopPlaying (playbackUrl) {
                // 其他视频开始播放，自身停止播放
                if (playbackUrl !== this.videoUrl) {
                    this.stopPlaying()
                }
            }
        }
    }
</script>
<style lang="scss">
    $play-image-size: 80px;

    .preview-image-button {
        position: relative;

        .preview-image {
            width: 100%;
        }
        .play-button {
            position: absolute;
            left: 45%;
            top: 45%;
            width: $play-image-size;
            height: $play-image-size;

            .play-button-img {
                width: 100%
            }
        }
    }

    video {
        width: 100%
    }
</style>