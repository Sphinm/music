// 通过正则判断类名是否存在
export function hasClass(el, className) {
  let currentClassName = el.className || ''
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(currentClassName)
}

// 添加类名
export function addClass(el, className) {
  if (!hasClass(el, className)) {
    // 方式一
    // let newClass = el.className.split(' ')
    // newClass.push(className)
    // el.className = newClass.join(' ')

    // 方式二
    let currentClassName = el.className || ''
    el.className = currentClassName ? currentClassName + ' ' + className : className
  }
}

// 删除类名
export function removeClass(el, className) {
  if (hasClass(el, className)) {
    let currentClassName = el.className || ''
    el.className = (' ' + currentClassName + ' ').replace(' ' + className + ' ', ' ').trim()
  }
}

// 切换类名
export function toggleClass(el, className) {
  hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
}
