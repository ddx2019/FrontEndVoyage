
/**
 *@description 保留指定位数的小数
 * @param param0 {
 * value: 输入值
 * decimals: 保留的小数位数
 * removeTrailingZeros: 是否去除末尾的0(默认true)
 * }
 */
export function toFixedDecimalDigits({
  value,
  decimals,
  removeTrailingZeros = true
}: {
  value: number //输入值
  decimals: number //保留的小数位数
  removeTrailingZeros?: boolean //是否去除末尾的0(默认true)
}): string {
  const valStr = value.toString()
  const [integerPart, decimalPart = ''] = valStr.split('.')
  let result = integerPart
  if (decimals > 0) {
    const truncatedDecimal = decimalPart.slice(0, decimals)
    const paddedDecimal = truncatedDecimal.padEnd(decimals, '0')
    result += `.${paddedDecimal}`
  }
  return removeTrailingZeros ? result.replace(/\.?0+$/, '') : result
}

/**
 * 
 * 
 * // 引入函数
import { toFixedDecimalDigits } from './yourPath'; // 替换为你的文件路径
// 使用示例
const value = 123.456789;
const decimals = 3;
const result = toFixedDecimalDigits({ value, decimals }); // 调用函数
console.log(result); // 输出结果 123.456
 */