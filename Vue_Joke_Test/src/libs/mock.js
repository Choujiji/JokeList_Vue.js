/** 假数据 */

/** Mock.js */
import Mock, { Random } from 'mockjs'

const ServerHeader = 'https://qlyd.net:8443/'

const JokeListData = () => {
    const jokeData = []
    for (let i = 0; i < 20; i++) {
        const joke = {
            joke_id: 100000 + i,
            content: Random.cparagraph(1, 10), // 1~10句的段落
            type: Random.integer(1, 4),
            author: {
                user_id: Random.integer(100, 500),
                user_name: Random.cname(),
                avatar: Random.dataImage('200x200', 'avatar')
            },
            classification: {
                classification_id: Random.integer(1, 3),
                classification_name: Random.cword(4, 6),
                classification_icon: Random.dataImage('300x300', 'classification')
            },
            like_count: Random.integer(0, 99999),
            comment_count: Random.integer(0, 99999),
            image_info: {
                type: 'gif',
                preview_image_url: 'http://img5.imgtn.bdimg.com/it/u=1660647722,808346013&fm=27&gp=0.jpg',
                image_url: 'http://p0.ubetween.com/2015/1202/201512021033432689549.gif'
            },
            video_info: {
                height: 626,
                video_cover: "http://video.joke.qlyd.net/1f958500-8bba-11e7-94e0-49002c445339?vframe/jpg/offset/0",
                video_desc: "老爸用跑车弹射起步拔牙，这娃一定是亲生的。。。",
                video_play_time: 121,
                video_play_url: {
                    f0: "http://video.joke.qlyd.net/1f958500-8bba-11e7-94e0-49002c445339", 
                    f10: "http://video.joke.qlyd.net/1e8db1f0-8bba-11e7-94e0…02c445339?avvod/m3u8/pipeline/tcdzs_queue/vb/256k", 
                    f20: "http://video.joke.qlyd.net/1e8db1f0-8bba-11e7-94e0…02c445339?avvod/m3u8/pipeline/tcdzs_queue/vb/512k", 
                    f30: "http://video.joke.qlyd.net/1f958500-8bba-11e7-94e0-49002c445339"
                },
                width:480
            }
        }
        jokeData.push(joke)
    }
    return JSON.stringify(jokeData)
}

Mock.mock('/1.5/joke.json', 'get', JokeListData)