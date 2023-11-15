import request from '@/utils/request'
// 获取style列表
export const getStyleList = (params: object) => {
    return request({ url: `/api/style`, params, method: 'GET' })
}
//上传
export const upload = (data: object) => {
    return request({
        url: `/api/style/upload`, data, method: 'POST'
    })
}
//根据id删除

export const deleteById = (id: string) => {
    return request({
        url: `/api/style/delete`, data: { id }, method: 'POST'
    })
}