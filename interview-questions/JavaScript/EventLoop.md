# Event Loop

当谈论 `JavaScript` 中的事件循环（`Event Loop`）时，我们涉及了 `JavaScript` 引擎处理异步代码的方式。让我们深入探讨事件循环是什么，它的组成部分和执行顺序，以及它为何存在。

## 事件循环是什么？

事件循环是 `JavaScript` 中处理异步任务的机制。它确保了 `JavaScript` 引擎能够按照特定顺序执行代码，包括同步代码和异步任务。

## 事件循环的组成部分和执行顺序

- 调用栈（`Call Stack`）：调用栈是存储函数调用的数据结构。在 `JavaScript` 中，代码执行时会被添加到调用栈中，遇到函数调用则会创建一个执行上下文（`execution context`）。同步代码会直接在调用栈中执行。

- 任务队列（`Task Queue`）：任务队列存放着待执行的异步任务。分为宏任务队列和微任务队列。

- 宏任务（`Macrotasks`）：宏任务则是放置在宏任务队列中的异步任务。这些任务会在当前执行栈中的所有任务执行完毕后才执行。包括 `setTimeout`、`setInterval`、`I/O` 操作等。

- 微任务（`Microtasks`）：微任务是一种特殊的异步任务，它们会在当前任务执行完毕后立即执行。常见的微任务包括 `Promise` 的 then 方法、`MutationObserver` 的回调函数等。微任务会排队在微任务队列中等待执行。

## 事件循环的意义、必要性和作用

事件循环在 JavaScript 中确保了异步任务的执行顺序和代码执行的可控性。它是管理异步任务执行的机制，使得 `JavaScript` 在单线程环境下处理异步操作成为可能。

### 为什么需要事件循环

`JavaScript` 是单线程执行的，需要一种机制来处理异步任务，避免阻塞主线程，保证程序的响应性。事件循环解决了异步任务的管理和执行顺序问题，确保了任务按照一定规则执行。

### 事件循环的作用

- 处理异步任务： 事件循环允许 JavaScript 处理异步任务，如网络请求、定时器等，而不阻塞主线程。
- 保持执行顺序： 确保任务的执行顺序，微任务和宏任务队列管理任务的优先级和执行顺序。
- 提高响应性能： 使得程序能同时处理多个任务，提高了响应性能和用户体验。
- 优化资源利用： 允许在等待任务完成时继续执行其他任务，提高了资源利用率。
- 单线程执行模型： 在单线程环境下处理异步任务，避免了多线程可能带来的复杂性和不确定性。

综上所述，事件循环在 JavaScript 中的意义在于解决了异步任务的管理问题，保障了程序的执行顺序和可控性，同时提高了程序的响应性能和资源利用率。这个机制是 JavaScript 处理异步操作的关键，确保了在单线程环境下的程序稳定性和性能优势。

确保 `JavaScript` 在处理异步任务时能够按照特定的顺序进行，确保代码执行的顺序和可控性，避免了任务之间的混乱和紊乱。它使得 `JavaScript` 引擎能够高效地处理同步和异步代码，确保代码执行顺序的可控性。

## 常见的宏任务和微任务

**在 `JavaScript` 中，典型的宏任务（`Macrotasks`）包括：**

- 整体的代码块（Script）：整体代码作为一个宏任务，会被放入宏任务队列中。
- `setTimeout` 和 `setInterval`：它们的回调函数会作为宏任务被放入宏任务队列。
- DOM 渲染后触发的事件：比如用户交互（鼠标点击、滚动等）或者资源加载事件（load）。

**常见的微任务（Microtasks）包括：**

- `Promise.then``、Promise.catch`、`Promise.finally`：`Promise` 这些的回调会作为微任务被放入微任务队列。
- `MutationObserver`：DOM 变动观察器的回调也被视为微任务。

**这些任务的执行顺序是：**

首先执行当前执行栈中的同步代码，然后执行微任务队列中的所有微任务，接着再执行宏任务队列中的一个宏任务，如此循环执行。
不同的 JavaScript 运行环境（浏览器、Node.js 等）可能会有一些特定的任务类型，上面列出的是比较常见的宏任务和微任务。

## new Promise(executor)中的 executor 函数值得注意

在 JavaScript 中，`new Promise(executor)` 中的 `executor` 函数是同步执行的，因为这样可以确保 `Promise` 对象在创建时可以立即执行初始化逻辑，
并允许开发者在 `executor` 中立即执行可能需要的`同步操作`。异步操作可以在 `executor` 函数内部被触发，但 `executor` 本身是同步执行的。

在 JavaScript 中，`new Promise(executor)` 中的 executor 是一个函数，`executor` 函数内的代码会在 `Promise` 实例化时立即执行，而不会被放入事件循环中的微任务或宏任务队列。`executor` 函数内部的代码在实例化时同步执行，这也是为什么在 `executor` 中的同步操作可以立即执行并改变 `Promise` 对象的状态。

这个函数接受两个参数，分别是 `resolve` 和 `reject`，它们是由 JavaScript 引擎提供的回调函数。

- `resolve`：这是一个函数，在执行 executor 函数时，当异步操作成功完成时被调用，将 Promise 对象的状态从待定（pending）变为已完成（fulfilled）。

- `reject`：同样是一个函数，在执行 executor 函数时，当异步操作失败时被调用，将 Promise 对象的状态从待定（pending）变为已拒绝（rejected）。

`executor` 函数被传递给 `Promise` 构造函数，其主要目的是封装异步操作。在这个函数中，你可以执行异步任务，一旦任务完成，可以调用 `resolve` 或 `reject` 函数来改变 `Promise` 对象的状态，从而触发相应的 `then` 或 `catch` 回调。

例如：

```javascript
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Operation succeeded!');
        reject(new Error('Operation failed!'))
    }, 1000)
})

promise
    .then((result) => {
        console.log('Success:', result) // 不会执行
    })
    .catch((error) => {
        console.error('Error:', error.message) // 1秒后输出 "Error: Operation failed!"
    })
    .finally(() => {
        console.log('Finally block executed.') // 1秒后输出 "Finally block executed."
    })
```

在这个例子中，`Promise`对象在 `1 秒后`会变为已拒绝状态（`rejected`）。因此，`catch` 方法中的失败回调函数会被执行，并输出相应的错误信息。随后，`finally` 方法中的回调函数也会被执行，无论 `Promise` 最终状态是成功还是失败，`finally`中的代码都会执行。

## 示例代码的细致分析

以以下代码为例：

```JavaScript
setTimeout(() => console.log(1), 0);

console.log(2);

new Promise(res => {
  console.log(3);
  res();
}).then(() => console.log(4));

console.log(5);
```

这段代码展示了 `JavaScript` 中的事件循环机制。首先，解释一下这段代码的执行顺序：

- `setTimeout(() => console.log(1), 0)`;`：setTimeout` 函数会将回调函数推入事件队列，等待事件循环完成后执行。尽管设定了 0 毫秒的延迟，但这个回调函数仍然是异步执行的，会在当前执行栈执行完毕后进入事件队列。
- `console.log(2);`：这是同步代码，会立即执行，打印出 2。

- `new Promise(res => { console.log(3); res(); }).then(() => console.log(4));`：这里创建了一个 Promise，但 Promise 内部的`console.log(3);` 和 `res();` 会立即执行。`console.log(3);` 是同步执行的，所以会打印出`3`。而 `res();` 的执行会将这个 `Promise` 状态改变为 `resolved`。

- `.then(() => console.log(4));`：在 `Promise` 被 `resolved` 后，then 方法中的回调函数会被推入微任务队列，等待当前执行栈的任务执行完毕后立即执行。因此，`console.log(4);` 会在当前任务执行完毕后执行，但在 `setTimeout` 中的异步任务之前。

- `console.log(5);`：这是同步代码，会立即执行，打印出 `5`。

由于 JavaScript 的事件循环机制，异步任务 setTimeout 中的回调函数虽然设定了 0 毫秒的延迟，但仍然会在当前执行栈执行完毕后才会被推入任务队列。因此，其输出会在同步代码执行完毕后才会呈现。

根据上述分析，这段代码的输出结果应该是：

```bash
2
3
5
4
1
```

这样的输出顺序遵循了 JavaScript 的事件循环和异步执行的规则。
