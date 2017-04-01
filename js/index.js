(function(win) {
    "use strict";
    var zpop = {
        def_zindex:999,
        _body: document.getElementsByTagName('body')[0],
        initBase: function () {
          var zpopWrap=document.createElement("div");
          zpopWrap.className="my-zpop";
          zpopWrap.id="my-zpop";
          document.body.appendChild(zpopWrap);
          console.log(this.def_zindex);
          this.def_zindex +=1;
        },
        initBg: function () {
          var zpopbg='<div class="zpop-bg" id=\"zpop-bg\"></div>';
          document.getElementById('my-zpop').innerHTML=zpopbg;
        },
        initBtn:  function (obj,rId) {
          var btns='<button type="button" id=\"yes-btn\">确定</button><button type="button" id=\"cancel-btn\">取消</button>';
          var foot=document.getElementById(rId).getElementsByClassName("zpop-footer")[0];
          foot.innerHTML=btns;
          var yesBtn = document.getElementById('yes-btn');
          var cancelBtn = document.getElementById('cancel-btn');
          if (cancelBtn) {
              cancelBtn.onclick=function(){
                  if(obj.cancelFn&&typeof obj.cancelFn=="function"){
                      var _res=obj.cancelFn();
                      if (!_res) {
                          zpop.popHide(rId);
                          obj.oncls("把这个值带回去！")
                      }
                  }else{
                      zpop.popHide(rId);
                  }
              }
          };
          if (yesBtn) {
              yesBtn.onclick=function () {
                  if (obj.yesFn&&typeof obj.yesFn=="function") {
                      var _res=obj.yesFn();
                      if (!_res) {
                         zpop.closePop();
                      }

                  }
              }
          }
        },
        confirm: function(obj) {
            var randId=parseInt(Math.random()*1000);
            var myZpop=document.getElementsByClassName('my-zpop');
            var popexist = document.getElementsByClassName('zpop-wrap');
            var pop_flag=false;
            if (obj.multiple) {
              this.initBase();
              pop_flag=true;
            }else if (popexist.length<=0&&myZpop.length<=0) {
              this.initBase();
              this.initBg();
              pop_flag=true;
            }else{
              pop_flag=false;
            };
            if (pop_flag) {
                this.popupTpl(obj.title, obj.content,randId)
                var popup = document.getElementById(randId);
                var closeBtn = document.getElementById('zpop-close-ico');
                popup.style.display = "block";
                var curOpacity = 0;
                popup.style.height = '0px';
                popup.style.width = '0px';
                popup.style.zIndex = this.def_zindex;
                var timer = setInterval(function() {
                    var speed1 = 10;
                    var speed2 = 8;
                    var speed3 = 2;
                    var tWidth = obj.width||400;
                    var tHeight = obj.height||320;
                    var tOpacity = 100;
                    var curWidth = popup.currentStyle ? popup.currentStyle.width : window.getComputedStyle(popup, null).width;
                    var curHeight = popup.currentStyle ? popup.currentStyle.height : window.getComputedStyle(popup, null).height;
                    curWidth = parseInt(curWidth)+speed1;
                    curHeight = parseInt(curHeight)+speed2;
                    popup.style.marginLeft = (0 - curWidth / 2) + "px";
                    popup.style.marginTop = (0 - curHeight / 2) + "px";
                    if (curWidth < tWidth) {
                        popup.style.width = curWidth + "px";
                    }
                    if (curHeight < tHeight) {
                        popup.style.height = curHeight  + "px";
                    }
                    if (curOpacity < tOpacity) {
                        curOpacity += speed3;
                        popup.style.opacity = curOpacity / 100;
                        popup.style.filter = 'alpha(opacity=' + curOpacity + ')';
                    }
                    if (curWidth >= tWidth && curHeight >= tHeight && curOpacity >= tOpacity) {
                      this.initBtn(obj,randId);
                      clearInterval(timer);
                    }
                }.bind(this), 5)
            } else {
                return false;
            }
            closeBtn.onclick = function() {
                zpop.popHide(randId);
            }
        },
        light:function (content,t) {
            this.lightTpl(content);
            var _t=t||2000;
            var lightWrap=document.getElementById("zpop-light-wrap");
            lightWrap.style.zIndex=this.def_zindex+1;
            var w=0,h=0;
            var timer=setInterval(function (){
                w +=10;
                h +=5;
                lightWrap.style.width =w+"px";
                lightWrap.style.height =h+"px";
                lightWrap.style.marginLeft=-parseInt(w/2)+"px";
                lightWrap.style.marginTop=-parseInt(h/2)+"px";
                if (w>=120&&h>=60) {
                    lightWrap.style.width="120px";
                    lightWrap.style.height="60px";
                    clearInterval(timer);
                    // setTimeout(function () {
                    //     var zpopLight=document.getElementById("light-wrap");
                    //         document.body.removeChild(zpopLight)
                    // },_t)
                }
            },2)
        },
        popHide: function(m) {
            var curOpacity = 100;
            var curBgOpacity = 20;
            var popup = document.getElementById(m);
            var zpopbg = document.getElementById("zpop-bg");
            var curWidth = popup.currentStyle ? popup.currentStyle.width : window.getComputedStyle(popup, null).width;
            var curHeight = popup.currentStyle ? popup.currentStyle.height : window.getComputedStyle(popup, null).height;
            curWidth = parseInt(curWidth);
            curHeight = parseInt(curHeight);
            var timer = setInterval(function() {
                if (curOpacity > 0) {
                    curOpacity -= 8;
                    curWidth -=10;
                    curHeight -=8;
                    popup.style.opacity = curOpacity / 100;
                    popup.style.width = curWidth+"px";
                    popup.style.height = curHeight+"px";
                    popup.style.marginLeft = (0 - curWidth / 2) + "px";
                    popup.style.marginTop = (0 - curHeight / 2) + "px";
                    popup.style.filter = 'alpha(opacity=' + curOpacity + ')';
                }
                if (curBgOpacity > 0) {
                    curBgOpacity -= 1;
                    zpopbg.style.opacity = curBgOpacity / 100;
                    zpopbg.style.filter = 'alpha(opacity=' + curBgOpacity + ')';
                }
                if ((curOpacity <= 0 && curBgOpacity <= 0)||curWidth<=0||curHeight<=0) {
                    document.body.removeChild(document.getElementById('my-zpop'));
                    clearInterval(timer);
                }
            }, 5)
        },
        popupTpl: function(zTitle, zContent,rId) {
            var _html = '    <div class="popup-wrap" id='+rId+'>' +
                        '        <div class="zpop-header">' +
                        '            <div class="zpop-title">' + zTitle + '</div>' +
                        '            <span class="zpop-close-ico" id=\"zpop-close-ico\">&times;</span>' +
                        '        </div>' +
                        '        <div class="zpop-body">' +
                        '            <div class="zpop-content">' +
                        '            ' + zContent + '' +
                        '            </div>' +
                        '        </div>' +
                        '        <div class="zpop-footer"></div>' +
                        '    </div>' +
                        '    </div>';
            var new_html = document.createElement('div');
            new_html.id = "zpop-wrap";
            new_html.innerHTML = _html;
            document.getElementById("my-zpop").appendChild(new_html);
        },
        lightTpl: function (lightContent) {
            var _html=  '    <div class="zpop-light-wrap" id=\"zpop-light-wrap\">'+
                        '        <div class="zpop-light-body">'+
                        '        <div class="zpop-light-content">'+lightContent+'</div>'+
                        '    </div>';
            var new_html = document.createElement('div');
            new_html.id = "my-light";
            new_html.className = "my-light";
            new_html.innerHTML = _html;
            document.body.appendChild(new_html);
            document.getElementById("my-light").style.width="100%";
            document.getElementById("my-light").style.height="100%";
        }
    }

    win.zpop = zpop;
})(window)
