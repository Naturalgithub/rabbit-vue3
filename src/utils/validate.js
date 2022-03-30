/* 提供项目中所有的表单的校验 */
// 校验的时候，如果返回true，校验通过

// 如果返回的不是true，而是其他值，校验失败，而且返回值就是校验的提示信息
export function account (value) {
  // 1. 必填
  // 2. 6-20个字符，需要以字母开头
  if (!value) return '用户名不能为空'
  if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
  return true
}
export function password (value) {
  if (!value) return '请输入密码'
  if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
  return true
}
export function mobile (value) {
  if (!value) return '请输入手机号'
  if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
  return true
}
export function code (value) {
  if (!value) return '请输入验证码'
  if (!/^\d{6}$/.test(value)) return '验证码是6个数字'
  return true
}
export function isAgree (value) {
  if (!value) return '请勾选同意用户协议'
  return true
}
/**
 * @description: 重置表单
 * @param {*} obj
 * @return {*}
 */
export function resetFormData (form = {}, callback) {
  for (const key in form) {
    form[key] = null
  }
  callback && callback(form)
  return form
}
