(function(win) {
    "use strict";
    var zpop = {
        def_zindex:999,
        returnVal:"",
        rIds:[],
        _body: document.getElementsByTagName('body')[0],
        initBase: function (rId) {
          var zpopWrap=document.createElement("div");
          zpopWrap.className="my-zpop";
          zpopWrap.id="my-zpop"+rId;
          document.body.appendChild(zpopWrap);
          this.def_zindex +=1;
        },
        initBg: function (rId) {
          var zpopBgHtml='<div class="zpop-bg" id=\"zpop-bg\"></div>';
          var zpopBgHtml=document.createElement("div");
          zpopBgHtml.id="zpop-bg";
          zpopBgHtml.className="zpop-bg";
          var zpopBg=document.getElementById('zpop-bg');
          if (zpopBg<=0) {
            document.body.appendChild(zpopBgHtml);
          }else {
            return;
          }
        },
        initBtn:  function (obj,rId,returnVal) {
          var btns='<button type="button" id=\"yes-btn'+rId+'\">确定</button><button type="button" id=\"cancel-btn'+rId+'\">取消</button>';
          var foot=document.getElementById(rId).getElementsByClassName("zpop-footer")[0];
          foot.innerHTML=btns;
          var yesBtn = document.getElementById('yes-btn'+rId);
          var cancelBtn = document.getElementById('cancel-btn'+rId);
          if (cancelBtn) {
              cancelBtn.onclick=function(){
                  if(obj.cancelFn&&typeof obj.cancelFn=="function"){
                      var _res=obj.cancelFn();
                      if (!_res) {
                          zpop.popHide(rId);
                          obj.oncls()
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
        ready:function (rId) {
          var that=this;
          var popHeader=document.getElementsByClassName('zpop-header');
          var popHeadLen=popHeader.length;
          if (popHeader.length>0) {
            var cur_left=[],cur_top=[],oldX=[],oldY=[],newX=[],newY=[],offsetX=[],offsetY=[],_wrap=[];
            this.rIds.push(rId);
            console.log(this);
            for (var i = 0; i < popHeadLen; i++) {
              (function (i) {
                popHeader[i].onmousedown=function (ev) {
                  _wrap[i]=document.getElementById(zpop.rIds[i]);
                  cur_left[i]=window.getComputedStyle? window.getComputedStyle(_wrap[i], null).left:_wrap[i].currentStyle.left;//760
                  cur_top[i]=window.getComputedStyle? window.getComputedStyle(_wrap[i], null).top:_wrap[i].currentStyle.top;
                  oldX[i]=ev.clientX;
                  oldY[i]=ev.clientY;
                  this.onmousemove=function (e) {
                    newX[i]=e.clientX;
                    newY[i]=e.clientY;
                    offsetX[i]=newX[i]-oldX[i];
                    offsetY[i]=newY[i]-oldY[i];
                    this.style.cursor="default";
                    console.log(cur_left[i])
                    _wrap[i].style.left=parseInt(cur_left[i])+parseInt(offsetX[i])+"px";
                    _wrap[i].style.top=parseInt(cur_top[i])+parseInt(offsetY[i])+"px";
                  }
                };
                popHeader[i].onmouseup=function () {
                  this.onmousemove=null;
                };
                popHeader[i].onmouseout=function (e) {
                  this.onmousemove=null;
                }
              })(i)
            }
          }
        },
        confirm: function(obj) {
            var randId=parseInt(Math.random()*1000);
            var myZpop=document.getElementsByClassName('my-zpop');
            var popexist = document.getElementsByClassName('zpop-wrap');
            var pop_flag=false;
            if (obj.multiple) {
              this.initBase(randId);
              this.initBg(randId);
              pop_flag=true;
            }else if (popexist.length<=0&&myZpop.length<=0) {
              this.initBase(randId);
              this.initBg(randId);
              pop_flag=true;
            }else{
              pop_flag=false;
            };
            if (pop_flag) {
                this.popupTpl(obj.title, obj.content,randId);
                this.ready(randId);
                var popup = document.getElementById(randId);
                var closeBtn = document.getElementById('zpop-close-ico'+randId);
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
            var lightId=parseInt(Math.random()*1000);
            this.lightTpl(content,lightId);
            var _t=t||2000;
            var lightWrap=document.getElementById("zpop-light-wrap"+lightId);
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
                    setTimeout(function () {
                        var zpopLight=document.getElementById("my-light"+lightId);
                        document.body.removeChild(zpopLight)
                    },_t)
                }
            },2)
        },
        popHide: function(rId) {
            var curOpacity = 100;
            var curBgOpacity = 20;
            var popup = document.getElementById(rId);
            var zpopbg = document.getElementById("zpop-bg");
            var popexist = document.getElementsByClassName('zpop-wrap');
            var popLen=popexist.length;
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
                if (curBgOpacity > 0&&popLen==1) { //判断是否多个弹窗，如果是的话，先不隐藏背景层；
                    curBgOpacity -= 1;
                    zpopbg.style.opacity = curBgOpacity / 100;
                    zpopbg.style.filter = 'alpha(opacity=' + curBgOpacity + ')';
                }
                if (curOpacity <= 0||curWidth<=0||curHeight<=0) {
                    /*if (popLen==1) {
                      clearInterval(timer);
                      document.body.removeChild(zpopbg);
                    }else if(curBgOpacity<=0){
                      clearInterval(timer);
                    }*/
                    clearInterval(timer);
                    document.body.removeChild(document.getElementById('my-zpop'+rId));
                    var _idx=zpop.rIds.indexOf(rId);
                    zpop.rIds.splice(_idx,1);
                    if (popLen==1) {
                      document.body.removeChild(zpopbg);
                    }
                }
                if (curBgOpacity<=0) {
                  document.body.removeChild(zpopbg);
                }
            }, 5)
        },
        popupTpl: function(zTitle, zContent,rId) {

            var _html = '    <div class="popup-wrap" id='+rId+'>' +
                        '        <div class="zpop-header">' +
                        '            <div class="zpop-title">' + zTitle + '</div>' +
                        '            <span class="zpop-close-ico" id=\"zpop-close-ico'+rId+'\">&times;</span>' +
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
            new_html.id = "zpop-wrap"+rId;
            new_html.className = "zpop-wrap";
            new_html.innerHTML = _html;
            document.getElementById("my-zpop"+rId).appendChild(new_html);
        },
        lightTpl: function (lightContent,rId) {
            var _html=  '    <div class="zpop-light-wrap" id=\"zpop-light-wrap'+rId+'\">'+
                        '        <div class="zpop-light-body">'+
                        '        <div class="zpop-light-content">'+lightContent+'</div>'+
                        '    </div>';
            var new_html = document.createElement('div');
            new_html.id = "my-light"+rId;
            new_html.className = "my-light";
            new_html.innerHTML = _html;
            document.body.appendChild(new_html);
        }
    }

    win.zpop = zpop;
})(window)
