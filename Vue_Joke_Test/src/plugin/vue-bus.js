import Vue from 'vue'

/** 事件监听器 */
const install = () => {
    const bus = new Vue({
        methods: {
            emit (event, ...args) {
                this.$emit(event, ...args)
            },
            on (event, callback) {
                this.$on(event, callback)
            },
            off (event, callback) {
                this.$off(event, callback)
            }
        }
    })
    Vue.prototype.$bus = bus
}

export default install