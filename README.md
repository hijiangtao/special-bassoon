# Tencent SNG Task README

## 综述

点击「开始动画／重制动画」按钮查看 DIV 红块滑动效果（由快至慢 5s 结束）；点击「打开提示／关闭提示」按钮查看使用说明；点击「开始弹幕／结束弹幕」查看弹幕效果，可通过 select 标签选定弹幕播放形式为固定显示或者滚动播放。

## 运行方式

```
cd oa
npm install
./node_modules/webpack/bin/webpack.js -p
./node_modules/http-server/bin/http-server ./
```

## 文件说明

* index.html - 主 HTML 文件
* index.js - 编译前主入口 JavaScript 文件
* bullet.js - 弹幕类，包含弹幕类以及单条弹幕字幕类
* dialog.js - 对话框类，包含对话框设置、显示以及事件绑定等方法
* util.js - 工具类，存放公共方法
* default.css - 页面样式文件
* package.json - 项目包信息
* package-lock.json - npm 包锁定版本信息
* webpack.config.js - webpack 配置文件
* README.md - 说明文档
* dist/bundle.js - 利用 webpack 对 index.js 打包压缩后的可执行文件（index.html 中引入的文件已经替换为该文件）

## 实现说明

### 1. 实现对话框

对话框的显示与隐藏可以通过 display/opacity/visibility 等属性控制，且 opacity 结合 transition 可以实现对话框的过渡动画，但考虑到这些方法即使隐藏对话框后，相应元素仍然存在于页面上，所以最终用 display 来控制显示／隐藏效果。

对话框的布局中涉及到内部内容的居中对齐等布局。其中标题居中采用的是内联元素 line-height 效果实现，按钮的布局用的 flexbox 实现。

### 2. 实现弹幕

由于 canvas 相比大量 DOM 元素对浏览器造成的负担要小很多，所以采用 canvas 来实现弹幕的效果，主要包含以下几块内容。

**弹幕的生成与存储**：采用 `Message` 类来存储单个字幕，类内包含字幕移动的方法 `move()`，除此外包括字幕的颜色、移动速度、文字内容、移动方式（固定还是滑动）以及字幕的位置。在 `Bullet` 类中用 `this.msgs` 存储所有字幕信息实例，已经废弃／消失至屏幕外的字幕用 null 赋值达到内存释放，提高页面性能；弹幕内容源源不断的生成采用 `setInterval` 定时器实现，控制参数由 `num` 传入，含义为一秒内绘制的字幕数；

**绘制与计算**：初始化弹幕动画，利用 requestAnimationFrame 完成持续字幕移动效果，相比定时器能够降低页面的渲染消耗并减少页面的卡顿现象；与此同时在每帧绘制函数中加入时间控制，提高每帧绘制到 40ms 才执行一次绘制，进一步提高页面运行性能；若当前弹幕画布不再需要可以通过 `clearBullet` 来清除定时器与清空画布内容；

**弹幕设置**：弹幕一般具有不同颜色，此处用 `util` 类中随机生成颜色方法赋值；弹幕的不同显示效果一般分为两类：一类固定在屏幕中间显示，另一类从右向左滑动显示，该部分通过每个弹幕信息的 `dynamic` 属性控制，并在 `renderBullet()` 方法判断执行相应逻辑；

### 3. 实现由快至慢的滑动效果

CSS3 效果实现，通过 transition 指定 duration 以及变化时间函数来实现。

## 联系

* Joe Jiang - [Email](hijiangtao@gmail.com)

2017.8