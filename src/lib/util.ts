type Once = (fn: Function) => Function
type Throttle = (fn: Function, delay: number) => Function

export const once: Once = (fn) => {
  let n: boolean = false
  return function (...args: any[]) {
    if (!n) {
      n = true
      fn.apply(null, args)
    }
  }
}
export const throttle: Throttle = (fn, delay) => {
  let oldt: number = 0
  return function (this: any, ...args: any[]) {
    const nowt: number = Date.now()
    if (nowt - oldt < delay) return
    oldt = nowt
    fn.apply(this, args)
  }
}
