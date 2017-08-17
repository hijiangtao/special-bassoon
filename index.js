/*
 * @Author: Joe Jiang 
 * @Date:   2017-08-17 19:25:47 
 * @Last Modified by: Joe Jiang
 * @Last Modified time: 2017-08-17 23:20:28
 */

'use strict'

import Bullet from './bullet';
import Dialog from './dialog';

window.onload = () => {
    /**
     * 选择器
     */
    let btn = document.getElementById('aniBtn'),
        box = document.getElementById('box'),
        bullet = document.getElementById('openBullet'),
        canvas = document.getElementById('bulletCanvas'),
        dialogBtn = document.getElementById('showTips');

    /**
     * 页面实例
     */
    let bulletIns,
        dialogIns;

    /**
     * 对话框初始化
     */
    dialogIns = new Dialog({
        id: 'dialog',
        'titleId': 'dialog-title',
        'infoId': 'dialog-info',
        'btnId': 'dialogBtnGroup'
    });
    dialogIns.bindEvents(dialogIns.toggleDisplay.bind(dialogIns), dialogIns.toggleDisplay.bind(dialogIns));
    dialogBtn.addEventListener('click', () => {
        dialogIns.toggleDisplay();
    });

    /**
     * 滑动动画对应事件绑定操作
     */
    btn.addEventListener('click', e => {
        e.target.innerText = e.target.innerText === '开始动画' ? '重置动画' : '开始动画';
        box.classList.toggle('move');
    });

    /**
     * 弹幕初始化与删除对应事件绑定操作
     */
    bullet.addEventListener('click', e => {
        if (e.target.innerText === '开始弹幕') {
            e.target.innerText = '结束弹幕';

            if (!bulletIns) {
                bulletIns = new Bullet({
                    id: 'bulletCanvas',
                    width: canvas.width,
                    height: canvas.height,
                    num: 100
                });
                bulletIns.initDisplay();
            }
        } else {
            e.target.innerText = '开始弹幕';

            bulletIns.clearBullet();
            bulletIns = null;
        }
    });

    /**
     * 切换弹幕显示方式：固定位置还是滚动
     */
    document.getElementById('moveApproach').onchange = e => {
        if (bulletIns) {
            bulletIns.changeMoveState();
        } else {
            e.preventDefault();
        }
    };
}
