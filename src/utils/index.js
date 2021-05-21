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
