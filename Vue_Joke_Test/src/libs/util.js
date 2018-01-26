import axios from 'axios'

const Util = {
    // apiPath: 'https://qlyd.net:8443'
    apiPath: ''
}

Util.ajax = axios.create({
    baseURL: Util.apiPath
})

export default Util