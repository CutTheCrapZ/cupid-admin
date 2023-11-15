import { getCode, checkToken, refreshToken, uploadToken } from "@/api/oneDrive";
export const refreshT = async (refresh_token: string) => {
    let refreshT = await refreshToken(refresh_token)
   
    if (refreshT.code !== 200) {
        alert("通过refresh_token刷新token出错")
        //refresh_token也过期就重新获取code重定向到首页
        let res = await getCode()
        if (res.code === 200) location.href = res.path
    } else {
        //获取refresh_token成功
        let o = JSON.parse(refreshT.data.body)
     
        //检查刷新的access_token是否有效
        try {
            //有效则保存新的
            o.access_token && localStorage.setItem("access_token", o.access_token)
            o.refresh_token && localStorage.setItem("refresh_token", o.refresh_token)
            o.token_type && localStorage.setItem("token_type", o.token_type)
            await checkToken()
       
            await uploadToken(o)
        
        } catch (error) {
            //无效则重新获取code跳转页面
            let res = await getCode()
            if (res.code === 200) location.href = res.path
        }

    }
}