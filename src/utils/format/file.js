/**
 * base64转成bolb对象
 */
export function dataURItoBlob(base64Data) {
  let regex = /^data:image\/(jpeg|jpg|png|gif);base64/g
  if (!regex.test(base64Data)) return false
  let byteString = atob(base64Data.split(',')[1])
  let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], { type: mimeString })
}

/**
 * 上传文件大小以及格式限制
 * @param {Object} file 文件对象
 * @param {Array} fileType 支持的文件格式 如['image/jpg','image/png']
 * @param {String} maxSize 支持的文件最大大小 默认单位MB
 */
export function checkFile(file, fileType = [], maxSize = 5) {
  if (!file) return { isError: true, errorMsg: '文件不存在' }
  // 文件格式判断
  if (fileType && !fileType.includes(file.type)) {
    return { isError: true, errorMsg: `文件格式仅支持${fileType}` }
  }
  // 文件大小判断
  if (file.size > maxSize * 1024 * 1024) {
    return { isError: true, errorMsg: `文件大小不能超过${maxSize}MB` }
  }
  return { isError: false, errorMsg: `文件大小不能超过${maxSize}MB` }
}

/**
 * 文件下载，根据接口返回的内容进行下载
 */
export function downloadFile({ headers, blobData }, cb) {
  const blob = new Blob([blobData], { type: 'application/octet-stream;charset=UTF-8' })
  const contentDisposition = headers['content-disposition']
  const result = contentDisposition.split('=')
  const filename = result[1]
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob) // 创建下载的连接
  const reg = /^["](.*)["]$/g
  downloadElement.style.display = 'none'
  downloadElement.href = href
  downloadElement.download = decodeURI(filename.replace(reg, '$1')) // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href)

  // 如果需要其他操作，可使用回调函数
  cb && cb()
}
