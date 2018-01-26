<template>
    <div id="header-view">
        <div class="main">
            <img :src="appIconSource">
            <div class="info">
                <div class="info-title">天才段子手</div>
                <div class="info-desc">搞笑段子与内涵视频的发源地</div>
            </div>
        </div>
        <mt-button class="download-btn" @click="handleOpenAppStore">下载</mt-button>
    </div>
</template>
<script>
    import AppIconSrc from '@/assets/Icon.png'

    export const HeaderHeight = 128

    export default {
        data () {
            return {
                appIconSource: AppIconSrc,
                
            }
        },
        methods: {
            handleOpenAppStore () {
                this.$store.commit('routeToAppStore')
            }
        }
    }



</script>
<style scoped lang="scss">
    #header-view {
        position: fixed;
        z-index: 99999;
        top: 0;
        left: 0;
        width: 95%;
        height: 128px;
        font-size: 40px;
        background: #fff064;
        color: black;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        justify-content: space-between;

        .main {
            display: flex;
            flex-direction: row;
            align-items: center;

            img {
                width: 100px;
                height: 100px;
            }

            .info {
                padding: 10px 20px 10px;
                display: flex;
                flex-direction: column;

                .info-title {
                    font: {
                        size: 38px;
                        weight: bold;
                    }
                }
                .info-desc {
                    font: {
                        size: 24px;
                    }
                }
            }
        }

        .download-btn {
            width: 100px;
            height: 100px;
            border-radius: 20px;
            font: {
                size: 26px;
                weight: bold;
            }
        }
    }
</style>