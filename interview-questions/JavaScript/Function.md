# Function

## 函数的 `length` 属性和函数的参数设置默认值

在 JavaScript 中，函数的 `length` 属性返回该函数在定义时的参数个数，不包括剩余参数、默认参数和解构赋值参数。如果设置了默认值的参数，无论它们在参数列表中的位置如何，它们都不会被计入 `length` 属性。 [Function: length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)

```javascript
function foo(a, b = 10, c) {
    console.log(foo.length) //会输出 1
}
foo(1, 2, 3)
```

函数 `foo` 的参数 `b` 设置了默认值，因此它不会被计入 `length` 属性。参数 `a` 和 `c` 没有设置默认值，但是由于 `b` 设置了默认值，`c` 被视为可选参数，因此也不会被计入 `length` 属性。所以，`foo.length` 的值为 1，因为只有参数 `a` 没有默认值。因此，`foo(1, 2, 3);` 会输出 `1`。

### c 为什么会被视为可选参数呢？

在 JavaScript 中，如果一个函数的参数设置了默认值，那么这个参数以及它后面的所有参数都会被视为可选参数，即使后面的参数没有设置默认值。

上文的例子中，函数 `foo` 的参数 `b` 设置了默认值，因此参数 `c` 被视为可选参数，即使 `c` 没有设置默认值。

这是因为在调用函数时，如果省略了设置了默认值的参数，那么所有后面的参数也必须省略，否则参数的顺序会被打乱，导致结果不符合预期。因此，设置了默认值的参数后面的所有参数都被视为可选参数。

例如，如果你调用 `foo(1)`，那么参数 `b` 将使用默认值 `10`，参数 `c` 将是 `undefined`。如果你调用 `foo(1, 2)`，那么参数 `b` 将是 `2`，参数 `c` 仍然是 `undefined`。如果你想为参数 `c` 提供一个值，你必须也为参数 `b` 提供一个值，例如 `foo(1, 2, 3)`。