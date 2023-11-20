export function randomData() {
  return Math.round(Math.random() * 500)
}

export function textSize(text, fontSize) {
  var span = document.createElement('span')
  var result = {
    'width': span.offsetWidth,
    'height': span.offsetHeight
  }
  span.style.visibility = 'hidden'
  span.style.fontSize = fontSize || '2vw'
  document.body.appendChild(span)

  if (typeof span.textContent !== 'undefined') { span.textContent = text || '' } else span.innerText = text || ''

  result.width = span.offsetWidth - result.width
  result.height = span.offsetHeight - result.height
  span.parentNode.removeChild(span)
  return result
}

export function tooltipPosition(point, params, dom, rect, size) {
  // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
  // 提示框位置
  var x = 0 // x坐标位置
  var y = 0 // y坐标位置

  // 当前鼠标位置
  var pointX = point[0]
  var pointY = point[1]

  // 外层div大小
  // var viewWidth = size.viewSize[0];
  // var viewHeight = size.viewSize[1];

  // 提示框大小
  var boxWidth = size.contentSize[0]
  var boxHeight = size.contentSize[1]

  // boxWidth > pointX 说明鼠标左边放不下提示框
  if (boxWidth > pointX) {
    x = 5
  } else { // 左边放的下
    x = pointX - boxWidth
  }

  // boxHeight > pointY 说明鼠标上边放不下提示框
  if (boxHeight > pointY) {
    y = 5
  } else { // 上边放得下
    y = pointY - boxHeight
  }

  return [x, y]
}

export function coppyObj(arr) {
  return arr.map((e) => {
    if (typeof e === 'object') {
      return Object.assign({}, e)
    } else {
      return e
    }
  })
}

// 深度克隆
export function deepClone(obj) {
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    return obj // 原始类型直接返回
  }
  var o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return o
}

// 针对ECHARTS鸡肋BUG 根据屏幕尺寸返回对应字体尺寸
export function docFontSize() {
  var _font = 11
  if (typeof window === 'object') {
    var clientWidth = document.documentElement.clientWidth
    if (clientWidth > 1200 && clientWidth < 1600) {
      _font = 12
    } else if (clientWidth >= 1600 && clientWidth < 2000) {
      _font = 14
    } else if (clientWidth >= 2000 && clientWidth < 4000) {
      _font = 20
    } else if (clientWidth >= 4000) {
      _font = 30
    }
  }
  return _font
}

// 获取当前时
export function getNowFormatDate(rule, seperator) {
  var date = new Date()
  var seperator1 = seperator || ''
  var rule1 = rule || 'YYYY-MM-DD'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }

  var currentdate = year + seperator1 +
    (rule1.indexOf('MM') > -1 ? (month + (rule1.indexOf('DD') > -1 ? (seperator1 + strDate) : '')) : '')
  return currentdate
};

// 获取返回时间中的月份
export function getMonthData(str) {
  if (typeof str !== 'string') {
    return 0
  }

  var formatMonth = str.slice(0, 4) + '-' + str.slice(4, 6) + (str.slice(6, 8) && ('-' + str.slice(6, 8)))
  return new Date(formatMonth).getMonth() + 1
}

export function cutstr(str = '', len = 6) {
  if (!str) {
    return ''
  }
  let result = ''
  let strlen = str.length
  let chrlen = str.replace(/[^\x00-\xff]/g, '**').length
  if (!((typeof str === 'string') && str.constructor === String)) {
    return ''
  }
  if (chrlen <= len) {
    return str
  }
  for (let i = 0, j = 0; i < strlen; i++) {
    let chr = str.charAt(i)
    if (/[\x00-\xff]/.test(chr)) {
      j++ // ascii码为0-255，一个字符就是一个字节的长度
    } else {
      j += 2 // ascii码为0-255 以外，一个字符就是两个字节的长度
    }
    if (j <= len) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
      result += chr
    } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
      return result + '...'
    }
  }
}
// 多坐标X轴值不对应 进行转换为对应
export function tarnsformChartsData(obj = {}) {
  let xData = []
  let nObj = obj

  // 取最大X轴数据
  for (let key in obj) {
    if (key.includes('X')) {
      xData = obj[key] instanceof Array && obj[key].length > xData.length ? obj[key] : xData
    }
  }

  // 为Y轴补空数据
  for (let key in obj) {
    if (key.includes('X')) {
      let iXdata = obj[key]
      let iYdata = obj[key.replace('X', 'Y')]
      let nYdata = []
      xData.forEach(item => {
        let index = iXdata.indexOf(item)
        nYdata.push(index !== -1 ? iYdata[index] : 0)
      })
      obj[key.replace('X', 'Y')] = nYdata
    }
  }
  nObj.xData = xData
  return nObj
}

// 求数组中的最大值
export function Max(array) {
  return Math.max.apply(Math, array)
}

// 数组按照某一个字段从小到大排序
export function sortByKey(array, key) {
  return array.sort((a, b) => {
    let x = a[key]
    let y = b[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
}

// 数值单位
export function setUnit(value, unit) {
  let arr = []
  value = parseFloat(value)
  if (value > 100000000) {
    value = (value / 100000000).toFixed(2)
    value = parseFloat(value)
    arr[0] = value
    arr[1] = "亿" + unit
  } else if (value >= 10000) {
    value = (value / 10000).toFixed(2)
    value = parseFloat(value)
    arr[0] = value
    arr[1] = "万" + unit
  } else {
    arr[0] = value
    arr[1] = unit
  }
  return arr
}

// 数字滚动
export function count(count, obj) {
  let countPri = obj.innerText || 0
  countPri = 0
  let countAdd = count - countPri
  if (count == 0) {
    obj.innerText = 0
    return
  }
  if (count < 0) {
    obj.innerText = count
    return
  }
  let nowCount = countPri
  let addCount = Math.ceil(countAdd / 10)
  let timer = setInterval(function() {
    nowCount += addCount
    if (nowCount > count) {
      obj.innerText = count.toLocaleString()
      clearInterval(timer)
    } else {
      obj.innerText = nowCount.toLocaleString()
    }
  }, 100)
}

// 获取当前年份
export function getYear() {
  const date = new Date()
  const year = date.getFullYear()
  return year
}

// 获取当前日期
export function getDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  if(month < 10 && day < 10) {
    return year + "0" + month + "0" + day
  }else if(month < 10 && day >= 10) {
    return year + "0" + month + day
  }else if(month >= 10 && day < 10) {
    return year + month + "0" + day
  }else {
    return year + "" + month + day
  }
}

// 格式化日期
export function formatDate(fmt, inDate) { 
  let date = inDate ? inDate : new Date();
  var o = { 
     "M+" : date.getMonth()+1,                 //月份 
     "d+" : date.getDate(),                    //日 
     "h+" : date.getHours(),                   //小时 
     "m+" : date.getMinutes(),                 //分 
     "s+" : date.getSeconds(),                 //秒 
     "q+" : Math.floor((date.getMonth()+3)/3), //季度 
     "S"  : date.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
} 
