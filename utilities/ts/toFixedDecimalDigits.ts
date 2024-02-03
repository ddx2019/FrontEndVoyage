

/**
 *@description 保留指定位数的小数
 * @param value - 输入值
 * @param decimals - 保留的小数位数
 * @param isPaddedDecimal - 末尾是否补0(默认不补0)
 */
export function toFixedDecimalDigits(
  value: number,
  decimals: number,
  isPaddedDecimal = false
): string {
  const valStr = value.toString()
  if (decimals > 0) {
    const [integerPart, decimalPart = ''] = valStr.split('.')
    const truncatedDecimal = decimalPart.slice(0, decimals)
    const paddedDecimal = truncatedDecimal.padEnd(decimals, isPaddedDecimal ? '0' : '')
    return `${integerPart}.${paddedDecimal}`
  } else {
    return valStr
  }
}

/**
 * 
 * 
 * // 引入函数
import { toFixedDecimalDigits } from './yourPath'; // 替换为你的文件路径
// 使用示例
const value = 123.456789;
const decimals = 3;
const result = toFixedDecimalDigits(value, decimals); // 调用函数
console.log(result); // 输出结果 123.456
const result2 = toFixedDecimalDigits(12.1, 2,true); // 调用函数
console.log(result2); // 输出结果 12.10
 */