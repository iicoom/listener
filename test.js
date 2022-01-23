/**
 * Created by Leo
 * Date: 2022-01-23 13:50
 * Email: asdfpeng@qq.com
 */
import {MyListener} from "./index.js";

MyListener.$on('test', handler)
MyListener.$on('test', handler1)


function handler(data) {
    console.log('test handler triggered:', data)
}

function handler1(data) {
    console.log('test handler1 triggered:', data)
}

MyListener.$off('test', handler1)
MyListener.$emit('test', 'fucker')
