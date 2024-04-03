# Array

选择方法取决于具体的使用场景和个人偏好。在大多数情况下，简单直接的方法通常是最好的选择。

## Get the last element of an array

### 索引方式

`let lastItem = arr[arr.length-1]`

优点：简单直观，代码清晰。

缺点：需要计算数组长度，可能在大型数组上效率较低。

### `Array.prototype.slice()` 方法

`let lastItem = arr.slice[-1](0)`

优点：避免直接修改原数组。

缺点：创建了新的数组，有一定的性能开销。此外，使用[0]获取最后一项可能显得不够直观。

### `Array.prototype.pop()` 方法

`let lastItem =arr.pop()`

优点：直接修改原数组，返回并删除最后一项。

缺点：修改了原数组，可能不符合业务需求。

### `Array.prototype.reduce()` 方法

`let lastItem = arr.reduce((_, item) => item, null)`

优点：使用reduce函数将数组简化为单个值，避免了创建新数组,不会修改原数组。

缺点：可能在性能上略显不足，因为 reduce() 方法需要遍历整个数组。同时相对于目的简单获取最后一项而言，使用reduce显得过于复杂。

### 解构赋值

`const {length, [length - 1]: lastItem } = arr;`

优点：通过解构赋值语法获取数组长度和最后一项，代码简洁。

缺点：可能不够直观，且在某些情况下可能会引起混淆。

### `Array.prototype.at()`方法

`let lastItem = arr.at(-1);`

优点：at()方法直接返回指定位置的数组元素，代码简洁且直观。

缺点：该方法是 ECMAScript 2022 引入的新特性，在一些旧的 JavaScript 环境中可能不被支持。

## Get the first element of an array

### 索引方式

`const firstItem = arr[0];`

优点：直观易懂，语法简单。

### `Array.prototype.slice()`方法

`const firstItem = arr.slice[0, 1](0);`

优点：返回一个包含第一项的数组，对原数组无影响。

缺点：创建了新的数组，有一定的性能开销。

### 解构赋值

`const [firstItem] = arr;`

优点：语法简洁。

### `Array.prototype.find()` 方法

`const firstItem = arr.find((item, index) => index === 0);`

优点：可以通过回调函数进行自定义条件查找。

### `Array.prototype.shift()` 方法

`const firstItem = arr.shift();`

优点：直接修改原数组，返回并删除第一项。

缺点：修改了原数组，可能不符合业务需求。
