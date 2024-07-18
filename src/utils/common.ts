export const getAssetsImage = (url: string) => {
    return new URL(`../assets/images/${url}`, import.meta.url).href;
};
//处理onedrive返回二进制图片流
export const disposeOneDriveImage = (data: string): string => {
    var blob = new Blob([data], { type: "image/jpeg" });
    // var img = document.createElement("img");
    // img.onload = function(e) {
    //     window.URL.revokeObjectURL(img.src); 
    // };
    // img.src = window.URL.createObjectURL(blob);
    // $("#imgcontainer").html(img);
    const qrUrl = (window.URL || window.webkitURL).createObjectURL(blob)
    return qrUrl
  }