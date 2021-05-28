/**
 * @desc  函数防抖，用于将多次执行变为最后一次执行
 * @param {function} func - 需要使用函数防抖的被执行的函数。必传
 * @param {Number} wait - 多少毫秒之内触发，只执行第一次，默认1000ms。可以不传
 */
export function debounce (fn, delay) {
  delay = delay || 1000 // 默认1s后执行
  let timer = null
  return () => {
    const context = this
    const arg = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, arg)
    }, delay)
  }
}

/**
 * 节流函数, 用于将多次执行变为每隔一段时间执行
 * @param fn 事件触发的操作
 * @param delay 间隔多少毫秒需要触发一次事件
 */
export function throttle (fn, delay) {
  let lastTime
  var timer
  const delayMin = delay || 200
  return function () {
    var args = arguments
    // 记录当前函数触发的时间
    var nowTime = Date.now()
    if (lastTime && nowTime - lastTime < delay) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        // 记录上一次函数触发的时间
        lastTime = nowTime
        // 修正this指向问题
        fn.apply(this, args)
      }, delayMin)
    } else {
      lastTime = nowTime
      fn.apply(this, args)
    }
  }
}

/*
 * 验证字符串是否为空（也不能为纯空格）
 * true--说明为空， false--说明不为空
 */
export function isEmptyString (string) {
  if (
    string === undefined ||
    typeof string === 'undefined' ||
    !string ||
    string === null ||
    string === '' ||
    /^\s+$/gi.test(string)
  ) {
    return true
  } else {
    return false
  }
}

/**
 * 判断数据类型
 * @param {any} val - 基本类型数据或者引用类型数据
 * @return {string} - 可能返回的结果有，均为小写字符串
 * number、boolean、string、null、undefined、array、object、function等
 */
export function getType (val) {
  // 判断数据是 null 和 undefined 的情况
  if (val == null) {
    return val + ''
  }
  return typeof (val) === 'object' ? Object.prototype.toString.call(val).slice(8, -1).toLowerCase() : typeof (val)
}

/*
 * 验证是否为数字
 */
export function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

/*
 * 是否为数组
 */
export function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

/*
 * 是否空数组
 */
export function isArrayEmpty (val) {
  if (val && val instanceof Array && val.length > 0) {
    return false
  } else {
    return true
  }
}

// 首字母大小
export function titleCase (str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase (str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr (str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}
