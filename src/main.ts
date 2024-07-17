import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import "@/utils/rem"
createApp(App).use(router).use(ElementPlus).mount('#app')
// 判断是否是pc设备
const isPc = () => {
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
//如果不是生产环境并且不是pc设备那么就显示调试
// if (import.meta.env.VITE_NODE_ENV != "production" && !isPc()) {
//     console.log(import.meta.env.VITE_NODE_ENV);
//     const vConsole = new VConsole();
// }
