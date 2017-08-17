/*
 * @Author: Joe Jiang 
 * @Date:   2017-08-17 19:31:29 
 * @Last Modified by: Joe Jiang
 * @Last Modified time: 2017-08-17 23:13:57
 */

/**
 * 对话框类
 */
class Dialog {
    constructor(props) {
        this.id = props.id || 'dialog';
        this.titleId = props.titleId || 'dialog-title';
        this.infoId = props.infoId || 'dialog-info';
        this.btnId = props.btnId || 'dialogBtnGroup';
    }

    /**
     * 触发弹窗的显示与否
     */
    toggleDisplay() {
        document.getElementById(this.id).classList.toggle('dialog-active');
    }

    /**
     * 更改弹窗标题
     * @param {*} title 标题内容字符串
     */
    setTitle(title) {
        if (title) {
            document.getElementById(this.titleId).innerHTML = `<span>${title}</span>`;
        }
    }

    /**
     * 更改弹窗内容
     * @param {*} info 弹窗内容字符串 
     */
    setInfo(info) {
        if (info) {
            document.getElementById(this.infoId).innerHTML = info.toString();
        }
    }

    /**
     * 绑定点击确定、取消的触发事件
     * @param {*} cancalFn 取消事件
     * @param {*} confirmFn 确定事件
     */
    bindEvents(cancalFn, confirmFn) {
        let btns = document.getElementsByClassName(this.btnId);
        btns[0].addEventListener('click', cancalFn);
        btns[1].addEventListener('click', confirmFn);
    }
}

export default Dialog;
