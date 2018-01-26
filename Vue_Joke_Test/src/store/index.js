import Vue from 'vue'
import Vuex from 'vuex'
import $ from '../libs/util'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /** 段子数据 */
        jokes: []
    },
    getters: {

    },
    mutations: {
        resetJokes (state, data) {
            state.jokes = data
        },
        addJokes(state, data) {
            state.jokes = state.jokes.concat(data)
        },
        /** 切换至App Store */
        routeToAppStore() {
            window.location.href = 'http://dz.qlyd.net'
        }
    },
    actions: {
        requestJoke(context, startID = 0, count = 1) {
            return new Promise(async (resolve, reject) => {
                const response = await $.ajax.get('/1.5/joke.json')
                const jokeInfo = JSON.parse(response.data)
                console.log('ajax response - ', jokeInfo)
                // 加到数据中
                if (startID === 0) {
                    // 第一批数据
                    context.commit('resetJokes', jokeInfo)
                } else {
                    // 下一批数据
                    context.commit('addJokes', jokeInfo)
                }
                resolve()
            })
        }
    }
})

export default store