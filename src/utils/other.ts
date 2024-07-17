/**
 * 判断是否是移动端
 */
export function isMobile() {
    if (
        navigator.userAgent.match(
            /('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i
        )
    ) {
        return true;
    } else {
        return false;
    }
}
const other = {
    isMobile: () => {
        return isMobile();
    },
}
// 统一批量导出
export default other;