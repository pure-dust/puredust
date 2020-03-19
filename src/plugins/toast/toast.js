import toast from './toast.vue';
import Vue from 'vue'

let ToastTem = Vue.extend(toast)
let instance
let timer = null
let Toast = (options) => {
    if (!instance) {
        instance = new ToastTem()
        instance.vm = instance.$mount()
        document.body.appendChild(instance.vm.$el)
    }
    if (timer) {
        clearTimeout(timer)
        timer = null
        instance.show = false
        instance.message = ''
    }
    let time = 3000
    if (typeof options === 'string') {
        instance.message = options
    } else if (typeof options === 'object') {
        let {
            message,
            time
        } = options
        instance.message = message
        time = time || 3000
    } else {
        return
    }
    instance.show = true
    timer = setTimeout(() => {
        instance.show = false
        clearTimeout(timer)
        timer = null
        instance.message = ''
    }, time)
}
Toast.close = () => {
    if (timer) {
        clearTimeout(timer)
        timer = null
        instance.show = false
        instance.message = ''
    }
}
Toast.install = (Vue) => {
    Vue.prototype.$Toast = Toast
}
export default Toast