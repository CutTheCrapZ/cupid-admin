import axios from 'axios'
import { refreshT } from "@/utils/oneDrive";
import { ElLoading } from 'element-plus'
// import Message from '@/utils/message' // 防止重复点击重复弹出message弹框
// import { ElMessageBox } from 'element-plus'
// import { getToken } from '@/utils/cookies'
let loadingTimer: any = null
export default (config: any) => {
    let oneDriveHttp = config.oneDriveHttp
    // 创建axios实例
    const service: any = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        // 超时
        timeout: 50000
    })
    // 请求拦截器
    service.interceptors.request.use(
        async (config: any) => {
            if (loadingTimer) {
                loadingTimer!.close()
                // loadingTimer = null
            }
            loadingTimer = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            //   let mainStore
            //   // import按需加载
            //   let module = await import('@/store')
            //   mainStore = module.useStore()
            if (oneDriveHttp) {
                config.baseURL = "https://graph.microsoft.com/v1.0"
                config.headers['Authorization'] = localStorage.getItem("access_token")
            }
            config.headers['Content-Type'] =
                config.headers['Content-Type'] || 'application/json'
            // 8080
            if (config.type == 'file') {
                config.headers['content-type'] = 'application/multipart/form-data'
            } else if (config.type == 'form') {
                config.headers['Content-type'] = 'application/x-www-form-urlencoded'
            }
            if (config.method && config.method.toLowerCase() === 'get') {
                config.data = true
            }
            return config
        },
        (error: any) => {
            return Promise.reject(error)
        }
    )
    // 响应拦截器
    service.interceptors.response.use(
        (response: any) => {
            loadingTimer&&loadingTimer.close()
            const code = response.data.code

            return response.data
            if (code === 401) {
                // ElMessageBox.confirm(
                //   '登录状态已过期，您可以继续留在该页面，或者重新登录',
                //   '系统提示',
                //   {
                //     confirmButtonText: '重新登录',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                //   }
                // ).then(() => {
                //   // 调用退出登录接口
                // })
            } else if (code !== 200) {
                // Message({
                //   message: response.data.msg,
                //   type: 'error',
                //   duration: 5 * 1000
                // })
                return Promise.reject('error')
            } else {
                return response.data
            }
        },
        async (error: any) => {
            //   Message({
            //     message: error.message,
            //     type: 'error',
            //     duration: 5 * 1000
            //   })
            console.log(oneDriveHttp);
            loadingTimer&&loadingTimer.close()
            if (oneDriveHttp) {
                refreshT(localStorage.getItem("refresh_token") + "")
            }
            return Promise.reject(error)
        }
    )
    return service(config)
}
