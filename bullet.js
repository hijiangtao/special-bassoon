/*
 * @Author: Joe Jiang 
 * @Date:   2017-08-17 19:24:10 
 * @Last Modified by: Joe Jiang
 * @Last Modified time: 2017-08-17 23:55:51
 */

import { getRandomColor } from './util';

/**
 * 弹幕信息字幕实例类
 */
class Message {
    constructor(props) {
        this.color = getRandomColor();
        this.speed = props.speed || 1;
        this.txt = props.txt;
        this.dynamic = props.dynamic
            ? true
            : false;
        this.top = Math.floor(Math.random() * (props.cHeight - 14));
        this.left = props.cWidth;
    }

    /**
     * 字幕自移动方法
     */
    move() {
        this.left -= this.speed;
    }
}

/**
 * 弹幕画布类
 */
class Bullet {
    constructor(props) {
        const {id, width, height, num} = props;

        this.container = {
            id: id || 'bulletCanvas',
            width: width || 400,
            height: height || 400,
            num: num || 100
        };
        this.dynamic = true;
        this.msgs = [];
        this.txtList = [
            '弹幕1',
            '弹幕2',
            '乔治亚·欧姬芙能画出任何东西',
            '这就是她',
            '我还是没搞明白',
            '还不厌其烦地画那么多次',
            '啊啊啊',
            '每次的灯光不同',
            ' 阿里领投11亿美金',
            '入股印尼最大电商',
            '爱立信或在瑞典以外',
            '裁员2.5万人 超1/5员工会被裁',
            '福特自动驾驶',
            '汽车专利',
            '方向盘',
            '踏板可拆卸',
            '印度核查中国品牌手机',
            '因担心用户数据',
            '有安全隐患',
            '苹果CEO库克',
            '写备忘录谴责白'
        ];

        this.generateDataset();
    }

    /**
     * 利用传入参数 num 控制生成字幕的速度，数据插入 this.msgs
     */
    generateDataset() {
        let callback = function() {
            const txtLen = this.txtList.length,
                dynamic = this.dynamic,
                left = this.container.left,
                txt = this.txtList[ Math.floor( Math.random()*txtLen-0.0000001 ) ],
                speed = this.dynamic ? 1 + Math.floor(Math.random()*3) : 12;

            this.msgs.push(new Message({
                speed,
                txt,
                dynamic,
                cWidth: this.container.width,
                cHeight: this.container.height
            }));
        }

        this.intervalIns = setInterval(callback.bind(this), Math.floor( 1000 / this.container.num ));
    }

    /**
     * 初始化弹幕动画，利用 requestAnimationFrame 完成持续字幕移动效果
     */
    initDisplay() {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        this.startAniFrame = requestAnimationFrame(this.renderFrame.bind(this));
    }

    /**
     * 变更字幕表现形式，固定显示或者滚动滑动
     */
    changeMoveState() {
        this.dynamic = !this.dynamic;
    }

    /**
     * 逐帧绘制弹幕画布
     * @param {*} timestamp 精准时间戳 
     */
    renderFrame(timestamp) {
        if (!this.start) {
            this.start = timestamp;
        }

        let progress = timestamp - this.start;

        /**
         * 超过 40ms 才执行一次绘制，达到提高性能的目的
         */
        if (progress > 40) {
            this.start = timestamp;
            this.renderBullet();
        }

        this.startAniFrame = requestAnimationFrame(this.renderFrame.bind(this));
    }

    /**
     * 逐个字幕信息块更新状态与绘制
     */
    renderBullet() {
        let canvas = document.getElementById(this.container.id),
            ctx = canvas.getContext("2d"),
            msgs = this.msgs,
            msgLen = msgs.length;

        ctx.clearRect(0, 0, this.container.width, this.container.height);
        ctx.save();

        // 遍历所有实例
        for (let i = 0; i < msgLen; i++) {
            let msgIns = msgs[i];
            // 弹幕实例不为空
            if (msgIns) {
                // 是否释放弹幕实例
                if (msgIns.left < -200) {
                    msgIns = null;
                } else {
                    msgIns.move();
                    let left = msgIns.dynamic ? msgIns.left : this.container.width / 3,
                        top = msgIns.top;
                    
                    ctx.fillStyle = msgIns.color;
                    ctx.fillText(msgIns.txt, left, top)
                    ctx.restore();
                }
            }
        }
    }

    /**
     * 清除画布，停止动画
     */
    clearBullet() {
        let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

        cancelAnimationFrame(this.startAniFrame);

        let canvas = document.getElementById(this.container.id),
            ctx = canvas.getContext("2d");
            
        ctx.clearRect(0, 0, this.container.width, this.container.height);
        ctx.save();
    }

}

export default Bullet;
