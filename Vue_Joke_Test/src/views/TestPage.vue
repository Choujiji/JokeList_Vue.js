<template>
    <div id="test-page">
        <mt-button 
            class="testClass"
            @click="showToast(0)"
        >弹出Toast1</mt-button>
        <mt-button 
            class="testClass"
            @click="showToast(1)"
        >弹出Toast2</mt-button>
        <mt-button 
            class="testClass"
            @click="showToast(2)"
        >弹出Toast3</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
    export default {
        methods: {
            showToast (index) {
                if (index === 0) {
                    Toast('哈哈哈~')
                } else if (index === 1) {
                    Toast({
                        message: '提示',
                        position: 'bottom',
                        duration: 3000
                    })
                } else {
                    const toast = Toast({
                        message: '成功啦~~',
                        iconClass: 'icon icon-success'
                    })
                    setTimeout(() => {
                        toast.close()
                    }, 3000)
                }
            }
        }
    }
</script>
<style lang="scss">
    $test-color: red;

    #test-page {
        background: $test-color;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .testClass {
        margin: 5px;
        font-size: 17px;
    }
</style>