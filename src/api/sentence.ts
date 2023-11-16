import request from "@/utils/request";
export const createSentence = (data: object) => {
    return request({ url: "/api/sentence/update", data, method: "POST" })
}
// 获取style列表
export const getStyleList = (params: object) => {
    return request({ url: `/api/sentence`, params, method: 'GET' })
}
//根据id删除
export const deleteById = (id: string) => {
    return request({
        url: `/api/sentence/delete`, data: { id }, method: 'POST'
    })
}