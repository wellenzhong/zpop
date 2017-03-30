(function(win) {
    "use strict";
    var zpop = {
        hello: function() {
            alert("hello world!")
        },
        _body: document.getElementsByTagName('body')[0],
        zpopinit: function(cancelfn) {
            var popexist = document.getElementsByClassName('my-zpop');
            if (popexist.length <= 0) {
                this.zpopshow("温馨提示", '大家好！')
                var popup = document.getElementById("zpop-wrap");
                var closeBtn = document.getElementById('zpop-close-ico');
                var yesBtn = document.getElementById('yes-btn');
                var cancelBtn = document.getElementById('cancel-btn');
                popup.style.display = "block";
                var curOpacity = 0;
                popup.style.height = '0px';
                popup.style.width = '0px';
                var timer = setInterval(function() {
                    var speed1 = 10;
                    var speed2 = 8;
                    var speed3 = 2;
                    var tWidth = 400;
                    var tHeight = 320;
                    var tOpacity = 100;
                    var curWidth = popup.currentStyle ? popup.currentStyle.width : window.getComputedStyle(popup, null).width;
                    var curHeight = popup.currentStyle ? popup.currentStyle.height : window.getComputedStyle(popup, null).height;
                    curWidth = parseInt(curWidth);
                    curHeight = parseInt(curHeight);
                    popup.style.marginLeft = (0 - curWidth / 2) + "px";
                    popup.style.marginTop = (0 - curHeight / 2) + "px";
                    if (curWidth < tWidth) {
                        popup.style.width = curWidth + speed1 + "px";
                    }
                    if (curHeight < tHeight) {
                        popup.style.height = curHeight + speed2 + "px";
                    }
                    if (curOpacity < tOpacity) {
                        curOpacity += speed3;
                        popup.style.opacity = curOpacity / 100;
                        popup.style.filter = 'alpha(opacity=' + curOpacity + ')';
                    }
                    if (curWidth > tWidth && curHeight > tHeight && curOpacity > tOpacity) {
                        clearInterval(timer);
                    }


                }, 5)
            } else {
                return false;
            }
            closeBtn.onclick = function() {
                zpop.closePop();
            }

            if (cancelBtn) {
                cancelBtn.onclick=function(){
                    if(cancelfn&&typeof cancelfn=="function"){
                        cancelfn();
                    }else{
                        zpop.closePop()
                    }
                }
            }
        },
        closePop: function() {
            var curOpacity = 100;
            var curBgOpacity = 20;
            var popup = document.getElementById("zpop-wrap");
            var zpopbg = document.getElementById("zpop-bg");
            var timer = setInterval(function() {
                if (curOpacity > 0) {
                    curOpacity -= 5;
                    popup.style.opacity = curOpacity / 100;
                    popup.style.filter = 'alpha(opacity=' + curOpacity + ')';
                }
                if (curBgOpacity > 0) {
                    curBgOpacity -= 1;
                    zpopbg.style.opacity = curBgOpacity / 100;
                    zpopbg.style.filter = 'alpha(opacity=' + curBgOpacity + ')';
                }
                if (curOpacity <= 0 && curBgOpacity <= 0) {
                    document.body.removeChild(document.getElementById('popup-wrap'));
                    clearInterval(timer);
                }
            }, 5)
        },
        zpopshow: function(zTitle, zContent, confirmFn, cancelFn) {
            var _title = zTitle || "提示";
            var _html = '<div class="my-zpop" id=\"my-zpop\">' +
                '    <div class="zpop-bg" id=\"zpop-bg\"></div>' +
                '    <div class="zpop-wrap" id=\"zpop-wrap\">' +
                '        <div class="zpop-header">' +
                '            <div class="zpop-title">' + zTitle + '</div>' +
                '            <span class="zpop-close-ico" id=\"zpop-close-ico\">&times;</span>' +
                '        </div>' +
                '        <div class="zpop-body">' +
                '            <div class="zpop-content">' +
                '            ' + zContent + '' +
                '            </div>' +
                '        </div>' +
                '        <div class="zpop-footer"><button type="button" id=\"yes-btn\">确定</button><button type="button" id=\"cancel-btn\">取消</button></div>' +
                '    </div>' +
                '    </div>';
            var new_html = document.createElement('div');
            new_html.id = "popup-wrap";
            new_html.innerHTML = _html;
            document.body.appendChild(new_html);

        }
    }

    win.zpop = zpop;
})(window)