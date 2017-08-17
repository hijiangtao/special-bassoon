/*
 * @Author: Joe Jiang 
 * @Date:   2017-08-17 22:47:12 
 * @Last Modified by: Joe Jiang
 * @Last Modified time: 2017-08-17 22:48:27
 */

'use strict'

/**
 * 获取随机颜色
 */
const getRandomColor = function () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export {
    getRandomColor
}