# 摇骰子探索

通过替换骰子图片和使用  `[transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)` 属性来模拟简单的骰子滚动效果

## 图片切换与旋转动画

**前提：** 你拥有6张不同面的骰子图片

通过图片切换和旋转动画的方式模拟了骰子的摇动效果。点击按钮后，两个骰子以不同的方式进行摇动，并在一定次数后停止并显示最终结果的图片。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>DiceLuckDraw</title>
    <style>
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 200px;
      }
      div {
        font-size: 30px;
      }
      #dice2 {
        margin-left: 10px;
      }
      body {
        background-color: lightblue;
      }
    </style>
  </head>
  <body>
    <!-- 骰子显示区域，假设骰子图片在./imgs目录下 -->
    <div class="container">
      <img id="dice1" src="./imgs/1.png" alt="" />
      <img id="dice2" src="./imgs/1.png" alt="" />
    </div>

     <button onclick="startGame()">开始游戏</button>

    <!-- JavaScript 实现摇动效果 -->
    <script>
      // 骰子的六个面
      const diceFaces = [1, 2, 3, 4, 5, 6];

      function startGame() {
        rollDice(6, 'dice1');
        rollDice(2, 'dice2');
      }

      /**
       * @description 摇动骰子
       * @param {number} numSides - 骰子面数
       * @param {string} elementId - 骰子元素id
       */
      function rollDice(numSides, elementId) {
        const dice = document.getElementById(elementId);
        let counter = 0;
        const rollInterval = setInterval(() => {
          counter++;
          const randomFace = diceFaces[Math.floor(Math.random() * diceFaces.length)];
          const randomDeg = Math.random() * 360;
          dice.style.transform = `rotateZ(${randomDeg}deg)`;
          dice.src = `./imgs/${randomFace}.png`;
          if (counter >= 30) {
            clearInterval(rollInterval);
            dice.style.transform = `rotateZ(${0}deg)`;
            dice.src = `./imgs/${numSides}.png`;
          }
        }, 80);
      }
    </script>
  </body>
</html>

```

代码解析：

**HTML 结构：**包含了两个 <img> 元素用于展示骰子图片，并应用了一些样式使其居中显示。

**JavaScript 实现摇动效果：**

- `diceFaces` 数组包含了骰子的六个面。
- `rollDice` 函数用于模拟骰子摇动的效果。
- 在每次定时器触发时，随机选择一个骰子面并改变对应的图片，同时给骰子添加旋转效果，模拟骰子滚动的动画。
- 当达到一定次数后，停止定时器，将骰子旋转角度归零，并显示最终结果的图片，模拟骰子停止滚动的效果。

你可以根据需求进行更改、扩展。

## vue中实现

转动骰子，并模拟游戏过程中的状态变化。

```html
<template>
    <view class="dice-game">
        <view class="dice-container">
            <image
                class="dice"
                :src="diceImgUrls[0]"
                :style="{ transform: `rotateZ(${diceRotates[0]}deg)` }"
            />
            <image
                class="dice"
                :src="diceImgUrls[1]"
                :style="{ transform: `rotateZ(${diceRotates[1]}deg)` }"
            />
        </view>
        <button
            class="game-status-btn"
            :class="{ disabled: isGameLoading }"
            @click="startGameHander"
        >
            开始游戏
        </button>
    </view>
</template>

<script setup lang="ts">
import { computed, ref} from 'vue'

const diceValues = ref([1, 1]) // 骰子的值
const diceRotates = ref([0, 0]) // 骰子的旋转角度
const gameError = ref(false) // 游戏抛出错误
const gameData = ref({ values: [1, 1], game_status: 1 })
const isGameLoading = ref(false)

/**  骰子的面数 */
const diceFaces = [1, 2, 3, 4, 5, 6]
/** 图片地址（假设图片以骰子的面命名，如1.png，2.png等） */
const diceImgUrls = computed(() => diceValues.value.map((value) => `https://xxx/${value}.png`))

// 开始游戏
async function startGameHander() {
    try {
        isGameLoading.value = true
        rollDice(0)
        rollDice(1)
        //...从后台获取数据（模拟）
        gameData.value = await new Promise((resolve) =>
            setTimeout(() => {
                resolve({ values: [3, 5], game_status: 2 })
            }, 200)
        )
    } catch (error) {
        gameError.value = true
        isGameLoading.value = false
    }
}

/**
 * @description 模拟骰子滚动的效果
 * @param diceIndex - 骰子的索引
 */
function rollDice(diceIndex: number) {
    let counter = 0
    const rollInterval = setInterval(() => {
        counter++
        const randomFace = diceFaces[Math.floor(Math.random() * diceFaces.length)]
        const randomDeg = Math.random() * 360
        diceValues.value[diceIndex] = randomFace
        diceRotates.value[diceIndex] = randomDeg
        const { values, game_status } = gameData.value
        /** 游戏正常结束的条件：骰子转动20次后并且游戏状态为2的时候 */
        const gameEnd = counter >= 20 && game_status === 2
        /** 游戏结束条件：异常或正常 */
        if (gameError.value || gameEnd) {
            clearInterval(rollInterval)
            diceValues.value[diceIndex] = values[diceIndex]
            diceRotates.value[diceIndex] = 0
            const diceRollEnd = gameEnd && diceIndex === 1
            /** 骰子动画结束(最后一颗骰子停止转动) */
            if (diceRollEnd) {
                isGameLoading.value = false
                // ...处理动画结束后的逻辑
            }
        }
    }, 80)
}
</script>

<style scoped lang="scss">
.dice-container {
    margin: 100px;
    display: flex;
    .dice {
        width: 96rpx;
        height: 96rpx;
    }
}
.disabled {
    background-color: #ccc;
    pointer-events: none;
}
</style>

```

1. `startGameHander()`
这个函数是当“开始游戏”按钮被点击时触发的。模拟骰子滚动并获取后台数据（这里使用了 `setTimeout` 模拟异步请求），并根据结果更新游戏数据

主要功能包括：

- 设置游戏状态：将 isGameLoading 设为 true，表示游戏正在加载中。
- 模拟骰子滚动：调用 rollDice 函数模拟两个骰子的滚动效果，用于展示骰子在摇动的过程中。
- 模拟游戏数据：使用 setTimeout 模拟一个模拟异步请求，在一定时间后更新 gameData 的状态，模拟骰子滚动结束后的最终结果。

2. `rollDice(diceIndex: number)`

函数模拟骰子滚动的效果，更新骰子的值和旋转角度，并根据游戏状态控制动画结束和游戏逻辑。它接收一个参数 diceIndex 表示第几个骰子。

- 模拟骰子滚动动画：使用 setInterval 定时器模拟骰子的滚动效果。在每个时间间隔内，更新骰子的值 diceValues 和旋转角度 diceRotates，以呈现骰子滚动的动画效果。
- 结束游戏动画：根据条件判断，当滚动次数达到一定值或游戏状态为特定值时，清除定时器并将骰子的值和旋转角度更新为最终结果，标志着骰子滚动动画的结束。
