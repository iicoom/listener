/**
 * Created by Leo
 * Date: 2022-01-23 13:18
 * Email: asdfpeng@qq.com
 */
class Listener {
    constructor() {
        this.name = "Listener"
        this.store = {}
    }

    static getInstance() {
        if (!Listener.instance) {
            Listener.instance = new Listener()
        }
        return Listener.instance
    }

    /**
     * 同一个事件可多次注册，可能触发时执行多次
     * @param evtName
     * @param cb
     */
    $on(evtName, cb) {
        if (typeof cb !== 'function') {
            console.error(`[${this.name}] can't listen event:${evtName}, cb is not a function`)
            return
        }
        if (!(evtName in this.store)) {
            this.store[evtName] = []
        }
        this.store[evtName].push(cb)
        console.log(`[${this.name}] listen on event:${evtName}, cb: ${cb.name}`)
    }

    $emit(evtName, ...data) {
        if (evtName in this.store) {
            this.store[evtName].forEach(cb => {
                cb(...data)
            })
        } else {
            console.error(`[${this.name}] could not found event:${evtName}`)
        }
    }

    /**
     * 卸载一个事件，如果没有传入cb会被所有cb都清除
     * @param evtName
     * @param cb
     */
    $off(evtName, cb) {
        if (evtName in this.store) {
            if (cb) {
                const index = this.store[evtName].indexOf(cb)
                if (index > -1) {
                    this.store[evtName].splice(index, 1)
                    console.log(`[${this.name}] remove event:${evtName} cb: ${cb.name}`)
                }
                return
            }
            delete this.store[evtName]
            console.log(`[${this.name}] deleted event:${evtName}`)
            return null
        }
        console.warn(`[${this.name}] event:${evtName} not exist`)
    }
}

export const VueListener = {
    install: (Vue) => {
        Vue.prototype.$listener = Listener.getInstance()
    }
}

export const MyListener = Listener.getInstance()
