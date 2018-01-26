<template>
    <div 
        id="joke-list" 
        ref="list"
        :style="{'-webkit-overflow-scrolling': scrollMode}"
    >
        <mt-loadmore
            :top-method="getNewestData"
            :bottom-method="getNextData"
            :bottom-all-loaded="allDataLoaded"
            bottom-pull-text="加载下一批"
            ref="loadmore"
        >
            <ul>
                <joke-item 
                    v-for="(item, index) in jokes"
                    :key="index"
                    :joke="item"
                    :onPressButtonLike="onPressActionButton"
                    :onPressButtonComment="onPressActionButton"
                    :onPressButtonShare="onPressActionButton"
                    :onPressClassification="onPressActionButton"
                ></joke-item>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    import { InfiniteScroll, Loadmore } from 'mint-ui'
    import JokeItem from '../components/JokeItem.vue'
    import $ from '../libs/util'

    export default {
        components: {
            JokeItem
        },
        data () {
            return {
                /** 加载标识 */
                isLoading: false,
                /** 是否还有下一批数据 */
                allDataLoaded: false,
                /** 
                    移动端弹性滚动效果：touch为弹性滚动，auto为非弹性
                    （ios由于自动启用-webkit-overflow-scrolling，会屏蔽loadBottom方法，导致无法上拉） 
                */
                scrollMode: 'auto'
            }
        },
        computed: {
            /** 列表段子数据 */
            jokes () {
                return this.$store.state.jokes
            },
            /** 当前最后一个段子ID */
            lastJokeID () {
                const lastJoke = this.jokes.length ? this.jokes[this.jokes.length - 1] : null
                return lastJoke ? lastJoke.joke_id : 0
            },
            /** 段子总数 */
            allJokesCount () {
                return this.jokes.length
            }
        },
        methods: {
            /** 获取段子 */
            async getJokes (startID) {
                await this.$store.dispatch('requestJoke', startID, 20)
                // 请求之后，恢复弹性滑动
                this.$nextTick(() => {
                    this.scrollMode = 'touch'
                })
            },
            /** 获取最新数据 */
            async getNewestData () {
                console.log('准备请求new~~~~')
                if (this.isLoading) {
                    return
                }
                this.isLoading = true

                console.log('最新数据~')
                await this.getJokes(0)
                this.$refs.loadmore.onTopLoaded()

                this.isLoading = false
            },
            /** 获取下一批数据 */
            async getNextData () {
                console.log('准备请求next=====')
                if (this.isLoading) {
                    return
                }
                this.isLoading = true

                console.log('下一批数据~')
                const lastJokesCount = this.allJokesCount
                await this.getJokes(this.lastJokeID)
                // 数据没变，则没有新数据了
                if (lastJokesCount === this.allJokesCount) {
                    console.log('没有数据了===')
                    this.allDataLoaded = true
                }
                this.$refs.loadmore.onBottomLoaded()

                this.isLoading = false
            },
            onPressActionButton () {
                this.$store.commit('routeToAppStore')
            }
        },
        async mounted () {
            console.log('store - ', this.$store)
            // 获取最新段子数据
            await this.getNewestData()
            console.log('jokes = ',this.jokes)

            this.$bus.on('scrollVerticalDidEnd', (obj) => {
                console.log(obj.distance)
                // 超出屏幕高度，发消息（结束视频播放）
                if (Math.abs(obj.distance) >= window.innerHeight) {
                    this.$bus.emit('endVideoPlayBack')
                }
            })

            // $.ajax.get('/1.5/joke.json').then((res) => {
            //     console.log(res)
            // })
        }
    }
</script>
<style lang="scss">
    #joke-list {
        display: flex;
        flex: 1;
    }
    ul {
        padding: 0;
        margin: 0;
    }
</style>