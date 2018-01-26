import axios from 'axios'

const Util = {
    apiPath: ''
}

Util.ajax = axios.create({
    baseURL: Util.apiPath
})

export default Util