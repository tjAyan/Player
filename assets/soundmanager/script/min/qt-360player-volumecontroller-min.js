var threeSixtyPlayer,ThreeSixtyPlayer;!function(a){function t(){var t=this,e=this,n=soundManager,i=navigator.userAgent,s=i.match(/msie/i),o=i.match(/opera/i),d=i.match(/safari/i),r=i.match(/chrome/i),l=i.match(/firefox/i),u=i.match(/ipad|iphone/i),c="undefined"==typeof a.G_vmlCanvasManager&&"undefined"!=typeof document.createElement("canvas").getContext("2d"),m=o||r?359.9:360,f=navigator.userAgent.match(/msie [678]/i)?1:2;this.excludeClass="threesixty-exclude",this.links=[],this.sounds=[],this.soundsByURL=[],this.indexByURL=[],this.lastSound=null,this.lastTouchedSound=null,this.soundCount=0,this.oUITemplate=null,this.oUIImageMap=null,this.vuMeter=null,this.callbackCount=0,this.peakDataHistory=[],this.config={playNext:!1,autoPlay:!1,allowMultiple:!1,loadRingColor:"#ccc",playRingColor:"#000",backgroundRingColor:"#eee",segmentRingColor:"rgba(255,255,255,0.33)",segmentRingColorAlt:"rgba(0,0,0,0.1)",loadRingColorMetadata:"#ddd",playRingColorMetadata:"rgba(128,192,256,0.9)",circleDiameter:null,circleRadius:null,animDuration:500,animTransition:a.Animator.tx.bouncy,showHMSTime:!1,scaleFont:!0,useWaveformData:!1,waveformDataColor:"#0099ff",waveformDataDownsample:3,waveformDataOutside:!1,waveformDataConstrain:!1,waveformDataLineRatio:.64,useEQData:!1,eqDataColor:"#339933",eqDataDownsample:4,eqDataOutside:!0,eqDataLineRatio:.54,usePeakData:!0,peakDataColor:"#ff33ff",peakDataOutside:!0,peakDataLineRatio:.5,useAmplifier:!0,fontSizeMax:null,scaleArcWidth:1,useFavIcon:!1},this.css={sDefault:"sm2_link",sBuffering:"sm2_buffering",sPlaying:"sm2_playing",sPaused:"sm2_paused"},this.addEventHandler="undefined"!=typeof a.addEventListener?function(a,t,e){return a.addEventListener(t,e,!1)}:function(a,t,e){a.attachEvent("on"+t,e)},this.removeEventHandler="undefined"!=typeof a.removeEventListener?function(a,t,e){return a.removeEventListener(t,e,!1)}:function(a,t,e){return a.detachEvent("on"+t,e)},this.hasClass=function(a,t){return"undefined"!=typeof a.className?a.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)")):!1},this.addClass=function(a,e){return a&&e&&!t.hasClass(a,e)?void(a.className=(a.className?a.className+" ":"")+e):!1},this.removeClass=function(a,e){return a&&e&&t.hasClass(a,e)?void(a.className=a.className.replace(new RegExp("( "+e+")|("+e+")","g"),"")):!1},this.getElementsByClassName=function(a,e,n){var i=n||document,s=[],o,d,r=[];if("undefined"!=typeof e&&"string"!=typeof e)for(o=e.length;o--;)r&&r[e[o]]||(r[e[o]]=i.getElementsByTagName(e[o]));else r=e?i.getElementsByTagName(e):i.all||i.getElementsByTagName("*");if("string"!=typeof e)for(o=e.length;o--;)for(d=r[e[o]].length;d--;)t.hasClass(r[e[o]][d],a)&&s.push(r[e[o]][d]);else for(o=0;o<r.length;o++)t.hasClass(r[o],a)&&s.push(r[o]);return s},this.getParentByNodeName=function(a,t){if(!a||!t)return!1;for(t=t.toLowerCase();a.parentNode&&t!==a.parentNode.nodeName.toLowerCase();)a=a.parentNode;return a.parentNode&&t===a.parentNode.nodeName.toLowerCase()?a.parentNode:null},this.getParentByClassName=function(a,e){if(!a||!e)return!1;for(;a.parentNode&&!t.hasClass(a.parentNode,e);)a=a.parentNode;return a.parentNode&&t.hasClass(a.parentNode,e)?a.parentNode:null},this.getSoundByURL=function(a){return"undefined"!=typeof t.soundsByURL[a]?t.soundsByURL[a]:null},this.isChildOfNode=function(a,t){if(!a||!a.parentNode)return!1;t=t.toLowerCase();do a=a.parentNode;while(a&&a.parentNode&&a.nodeName.toLowerCase()!==t);return a&&a.nodeName.toLowerCase()===t?a:null},this.isChildOfClass=function(a,e){if(!a||!e)return!1;for(;a.parentNode&&!t.hasClass(a,e);)a=t.findParent(a);return t.hasClass(a,e)},this.findParent=function(a){if(!a||!a.parentNode)return!1;if(a=a.parentNode,2===a.nodeType)for(;a&&a.parentNode&&2===a.parentNode.nodeType;)a=a.parentNode;return a},this.getStyle=function(t,e){try{if(t.currentStyle)return t.currentStyle[e];if(a.getComputedStyle)return document.defaultView.getComputedStyle(t,null).getPropertyValue(e)}catch(n){}return null},this.findXY=function(a){var t=0,e=0;do t+=a.offsetLeft,e+=a.offsetTop;while(a=a.offsetParent);return[t,e]},this.getMouseXY=function(e){return e=e?e:a.event,u&&e.touches&&(e=e.touches[0]),e.pageX||e.pageY?[e.pageX,e.pageY]:e.clientX||e.clientY?[e.clientX+t.getScrollLeft(),e.clientY+t.getScrollTop()]:void 0},this.getScrollLeft=function(){return document.body.scrollLeft+document.documentElement.scrollLeft},this.getScrollTop=function(){return document.body.scrollTop+document.documentElement.scrollTop},this.events={play:function(){e.removeClass(this._360data.oUIBox,this._360data.className),this._360data.className=e.css.sPlaying,e.addClass(this._360data.oUIBox,this._360data.className),t.fanOut(this)},stop:function(){e.removeClass(this._360data.oUIBox,this._360data.className),this._360data.className="",t.fanIn(this)},pause:function(){e.removeClass(this._360data.oUIBox,this._360data.className),this._360data.className=e.css.sPaused,e.addClass(this._360data.oUIBox,this._360data.className)},resume:function(){e.removeClass(this._360data.oUIBox,this._360data.className),this._360data.className=e.css.sPlaying,e.addClass(this._360data.oUIBox,this._360data.className)},finish:function(){var a;e.removeClass(this._360data.oUIBox,this._360data.className),this._360data.className="",this._360data.didFinish=!0,t.fanIn(this),e.config.playNext&&(a=e.indexByURL[this._360data.oLink.href]+1,a<e.links.length&&e.handleClick({target:e.links[a]}))},whileloading:function(){this.paused&&t.updatePlaying.apply(this)},whileplaying:function(){t.updatePlaying.apply(this),this._360data.fps++},bufferchange:function(){this.isBuffering?e.addClass(this._360data.oUIBox,e.css.sBuffering):e.removeClass(this._360data.oUIBox,e.css.sBuffering)}},this.stopEvent=function(t){return"undefined"!=typeof t&&"undefined"!=typeof t.preventDefault?t.preventDefault():"undefined"!=typeof a.event&&"undefined"!=typeof a.event.returnValue&&(a.event.returnValue=!1),!1},this.getTheDamnLink=s?function(t){return t&&t.target?t.target:a.event.srcElement}:function(a){return a.target},this.handleClick=function(e){if(e.button>1)return!0;var i=t.getTheDamnLink(e),s,o,d,r,l,u,c;return("a"===i.nodeName.toLowerCase()||(i=t.isChildOfNode(i,"a")))&&t.isChildOfClass(i,"ui360")?(o=i.getAttribute("href"),i.href&&n.canPlayLink(i)&&!t.hasClass(i,t.excludeClass)?(n._writeDebug("handleClick()"),d=i.href,r=t.getSoundByURL(d),r?r===t.lastSound?r.togglePause():(r.togglePause(),n._writeDebug("sound different than last sound: "+t.lastSound.id),!t.config.allowMultiple&&t.lastSound&&t.stopSound(t.lastSound)):(l=i.parentNode,u=t.getElementsByClassName("ui360-vis","div",l.parentNode).length,r=n.createSound({id:"ui360Sound"+t.soundCount++,url:d,onplay:t.events.play,onstop:t.events.stop,onpause:t.events.pause,onresume:t.events.resume,onfinish:t.events.finish,onbufferchange:t.events.bufferchange,type:i.type||null,whileloading:t.events.whileloading,whileplaying:t.events.whileplaying,useWaveformData:u&&t.config.useWaveformData,useEQData:u&&t.config.useEQData,usePeakData:u&&t.config.usePeakData}),c=parseInt(t.getElementsByClassName("sm2-360ui","div",l)[0].offsetWidth*f,10),s=t.getElementsByClassName("sm2-canvas","canvas",l),r._360data={oUI360:t.getParentByClassName(i,"ui360"),oLink:i,className:t.css.sPlaying,oUIBox:t.getElementsByClassName("sm2-360ui","div",l)[0],oCanvas:s[s.length-1],oButton:t.getElementsByClassName("sm2-360btn","span",l)[0],oTiming:t.getElementsByClassName("sm2-timing","div",l)[0],oCover:t.getElementsByClassName("sm2-cover","div",l)[0],circleDiameter:c,circleRadius:c/2,lastTime:null,didFinish:null,pauseCount:0,radius:0,fontSize:1,fontSizeMax:t.config.fontSizeMax,scaleFont:u&&t.config.scaleFont,showHMSTime:u,amplifier:u&&t.config.usePeakData?.9:1,radiusMax:.175*c,width:0,widthMax:.4*c,lastValues:{bytesLoaded:0,bytesTotal:0,position:0,durationEstimate:0},animating:!1,oAnim:new a.Animator({duration:t.config.animDuration,transition:t.config.animTransition,onComplete:function(){}}),oAnimProgress:function(a){var e=this;e._360data.radius=parseInt(e._360data.radiusMax*e._360data.amplifier*a,10),e._360data.width=parseInt(e._360data.widthMax*e._360data.amplifier*a,10),e._360data.scaleFont&&null!==e._360data.fontSizeMax&&(e._360data.oTiming.style.fontSize=parseInt(Math.max(1,e._360data.fontSizeMax*a),10)+"px",e._360data.oTiming.style.opacity=a),(e.paused||0===e.playState||0===e._360data.lastValues.bytesLoaded||0===e._360data.lastValues.position)&&t.updatePlaying.apply(e)},fps:0},"undefined"!=typeof t.Metadata&&t.getElementsByClassName("metadata","div",r._360data.oUI360).length&&(r._360data.metadata=new t.Metadata(r,t)),r._360data.scaleFont&&null!==r._360data.fontSizeMax&&(r._360data.oTiming.style.fontSize="1px"),r._360data.oAnim.addSubject(r._360data.oAnimProgress,r),t.refreshCoords(r),t.updatePlaying.apply(r),t.soundsByURL[d]=r,t.sounds.push(r),!t.config.allowMultiple&&t.lastSound&&t.stopSound(t.lastSound),r.play()),t.lastSound=r,"undefined"!=typeof e&&"undefined"!=typeof e.preventDefault?e.preventDefault():"undefined"!=typeof a.event&&(a.event.returnValue=!1),!1):!0):!0},this.fanOut=function(e){var n=e;return 1===n._360data.animating?!1:(n._360data.animating=0,soundManager._writeDebug("fanOut: "+n.id+": "+n._360data.oLink.href),n._360data.oAnim.seekTo(1),void a.setTimeout(function(){n._360data.animating=0},t.config.animDuration+20))},this.fanIn=function(e){var n=e;return-1===n._360data.animating?!1:(n._360data.animating=-1,soundManager._writeDebug("fanIn: "+n.id+": "+n._360data.oLink.href),n._360data.oAnim.seekTo(0),void a.setTimeout(function(){n._360data.didFinish=!1,n._360data.animating=0,t.resetLastValues(n)},t.config.animDuration+20))},this.resetLastValues=function(a){a._360data.lastValues.position=0},this.refreshCoords=function(a){a._360data.canvasXY=t.findXY(a._360data.oCanvas),a._360data.canvasMid=[a._360data.circleRadius,a._360data.circleRadius],a._360data.canvasMidXY=[a._360data.canvasXY[0]+a._360data.canvasMid[0],a._360data.canvasXY[1]+a._360data.canvasMid[1]]},this.stopSound=function(a){soundManager._writeDebug("stopSound: "+a.id),soundManager.stop(a.id),u||soundManager.unload(a.id)},this.buttonClick=function(e){var n=e?e.target?e.target:e.srcElement:a.event.srcElement;return t.handleClick({target:t.getParentByClassName(n,"sm2-360ui").nextSibling}),!1},this.buttonMouseDown=function(a){return u?t.addEventHandler(document,"touchmove",t.mouseDown):document.onmousemove=function(a){t.mouseDown(a)},t.stopEvent(a),!1},this.mouseDown=function(e){if(!u&&e.button>1)return!0;if(!t.lastSound)return t.stopEvent(e),!1;var n=e?e:a.event,i,s,o;return u&&n.touches&&(n=n.touches[0]),i=n.target||n.srcElement,s=t.getSoundByURL(t.getElementsByClassName("sm2_link","a",t.getParentByClassName(i,"ui360"))[0].href),t.lastTouchedSound=s,t.refreshCoords(s),o=s._360data,t.addClass(o.oUIBox,"sm2_dragging"),o.pauseCount=t.lastTouchedSound.paused?1:0,t.mmh(e?e:a.event),console.log("asdasd"),u?(t.removeEventHandler(document,"touchmove",t.mouseDown),t.addEventHandler(document,"touchmove",t.mmh),t.addEventHandler(document,"touchend",t.mouseUp)):(document.onmousemove=t.mmh,document.onmouseup=t.mouseUp),t.stopEvent(e),!1},this.mouseUp=function(a){var e=t.lastTouchedSound._360data;t.removeClass(e.oUIBox,"sm2_dragging"),0===e.pauseCount&&t.lastTouchedSound.resume(),u?(t.removeEventHandler(document,"touchmove",t.mmh),t.removeEventHandler(document,"touchend",t.mouseUP)):(document.onmousemove=null,document.onmouseup=null)},this.mmh=function(e){"undefined"==typeof e&&(e=a.event);var n=t.lastTouchedSound,i=t.getMouseXY(e),s=i[0],o=i[1],d=s-n._360data.canvasMidXY[0],r=o-n._360data.canvasMidXY[1],l=Math.floor(m-(t.rad2deg(Math.atan2(d,r))+180));return n.setPosition(n.durationEstimate*(l/m)),t.stopEvent(e),!1},this.drawSolidArc=function(a,e,n,i,s,r,l){var u=n,c=n,m=a,f,h,g,p;m.getContext&&(f=m.getContext("2d")),a=f,l||t.clearCanvas(m),e&&(f.fillStyle=e),a.beginPath(),isNaN(s)&&(s=0),h=n-i,g=o||d,(!g||g&&n>0)&&(a.arc(0,0,n,r,s,!1),p=t.getArcEndpointCoords(h,s),a.lineTo(p.x,p.y),a.arc(0,0,h,s,r,!0),a.closePath(),a.fill())},this.getArcEndpointCoords=function(a,t){return{x:a*Math.cos(t),y:a*Math.sin(t)}},this.deg2rad=function(a){return a*Math.PI/180},this.rad2deg=function(a){return 180*a/Math.PI},this.getTime=function(a,t){var e=Math.floor(a/1e3),n=Math.floor(e/60),i=e-60*n;return t?n+":"+(10>i?"0"+i:i):{min:n,sec:i}},this.clearCanvas=function(a){var t=a,e=null,n,i;t.getContext&&(e=t.getContext("2d")),e&&(n=t.offsetWidth,i=t.offsetHeight,e.clearRect(-(n/2),-(i/2),n,i))},this.updatePlaying=function(){var a=this._360data.showHMSTime?t.getTime(this.position,!0):parseInt(this.position/1e3,10),e=t.config.scaleArcWidth;this.bytesLoaded&&(this._360data.lastValues.bytesLoaded=this.bytesLoaded,this._360data.lastValues.bytesTotal=this.bytesTotal),this.position&&(this._360data.lastValues.position=this.position),this.durationEstimate&&(this._360data.lastValues.durationEstimate=this.durationEstimate),t.drawSolidArc(this._360data.oCanvas,t.config.backgroundRingColor,this._360data.width,this._360data.radius*e,t.deg2rad(m),!1),t.drawSolidArc(this._360data.oCanvas,this._360data.metadata?t.config.loadRingColorMetadata:t.config.loadRingColor,this._360data.width,this._360data.radius*e,t.deg2rad(m*(this._360data.lastValues.bytesLoaded/this._360data.lastValues.bytesTotal)),0,!0),0!==this._360data.lastValues.position&&t.drawSolidArc(this._360data.oCanvas,this._360data.metadata?t.config.playRingColorMetadata:t.config.playRingColor,this._360data.width,this._360data.radius*e,t.deg2rad(1===this._360data.didFinish?m:m*(this._360data.lastValues.position/this._360data.lastValues.durationEstimate)),0,!0),this._360data.metadata&&this._360data.metadata.events.whileplaying(),a!==this._360data.lastTime&&(this._360data.lastTime=a,this._360data.oTiming.innerHTML=a),(this.instanceOptions.useWaveformData||this.instanceOptions.useEQData)&&c&&t.updateWaveform(this),t.config.useFavIcon&&t.vuMeter&&t.vuMeter.updateVU(this)},this.updateWaveform=function(a){if(!t.config.useWaveformData&&!t.config.useEQData||!n.features.waveformData&&!n.features.eqData)return!1;if(!a.waveformData.left.length&&!a.eqData.length&&!a.peakData.left)return!1;var e=a._360data.oCanvas.getContext("2d"),i=0,s=parseInt(a._360data.circleDiameter/2,10),o=s/2,d=1,r=1,l=0,u=s,c,m,f,h,g,p,v,y,_,C,D,M,N,T,S,w;if(t.config.useWaveformData)for(h=t.config.waveformDataDownsample,h=Math.max(1,h),g=256,p=g/h,v=0,y=0,_=null,C=t.config.waveformDataOutside?1:t.config.waveformDataConstrain?.5:.565,o=t.config.waveformDataOutside?.7:.75,D=t.deg2rad(360/p*t.config.waveformDataLineRatio),c=0;g>c;c+=h)v=t.deg2rad(360*(c/p*1/h)),y=v+D,_=a.waveformData.left[c],0>_&&t.config.waveformDataConstrain&&(_=Math.abs(_)),t.drawSolidArc(a._360data.oCanvas,t.config.waveformDataColor,a._360data.width*C*(2-t.config.scaleArcWidth),a._360data.radius*o*1.25*_,y,v,!0);if(t.config.useEQData)for(h=t.config.eqDataDownsample,M=0,h=Math.max(1,h),N=192,p=N/h,C=t.config.eqDataOutside?1:.565,f=t.config.eqDataOutside?-1:1,o=t.config.eqDataOutside?.5:.75,v=0,y=0,D=t.deg2rad(360/p*t.config.eqDataLineRatio),T=t.deg2rad(1===a._360data.didFinish?360:360*(a._360data.lastValues.position/a._360data.lastValues.durationEstimate)),m=0,S=0,c=0;N>c;c+=h)v=t.deg2rad(360*(c/N)),y=v+D,t.drawSolidArc(a._360data.oCanvas,y>T?t.config.eqDataColor:t.config.playRingColor,a._360data.width*C,a._360data.radius*o*(a.eqData.left[c]*f),y,v,!0);if(t.config.usePeakData&&!a._360data.animating){for(w=a.peakData.left||a.peakData.right,N=3,c=0;N>c;c++)w=w||a.eqData[c];a._360data.amplifier=t.config.useAmplifier?.9+.1*w:1,a._360data.radiusMax=.175*a._360data.circleDiameter*a._360data.amplifier,a._360data.widthMax=.4*a._360data.circleDiameter*a._360data.amplifier,a._360data.radius=parseInt(a._360data.radiusMax*a._360data.amplifier,10),a._360data.width=parseInt(a._360data.widthMax*a._360data.amplifier,10)}},this.getUIHTML=function(a){return['<canvas class="sm2-canvas" width="'+a+'" height="'+a+'"></canvas>',' <span class="sm2-360btn sm2-360btn-default"></span>',' <div class="sm2-timing'+(navigator.userAgent.match(/safari/i)?" alignTweak":"")+'"></div>',' <div class="sm2-cover"></div>']},this.uiTest=function(a){var e=document.createElement("div"),n,i,s,o,d,r,l,u,c;return e.className="sm2-360ui",n=document.createElement("div"),n.className="ui360"+(a?" "+a:""),i=n.appendChild(e.cloneNode(!0)),n.style.position="absolute",n.style.left="-9999px",s=document.body.appendChild(n),o=i.offsetWidth*f,d=t.getUIHTML(o),i.innerHTML=d[1]+d[2]+d[3],r=parseInt(o,10),l=parseInt(r/2,10),c=t.getElementsByClassName("sm2-timing","div",s)[0],u=parseInt(t.getStyle(c,"font-size"),10),isNaN(u)&&(u=null),n.parentNode.removeChild(n),d=n=i=s=null,{circleDiameter:r,circleRadius:l,fontSizeMax:u}},this.init=function(){n._writeDebug("threeSixtyPlayer.init()");var e=t.getElementsByClassName("ui360","div"),i,o,d=[],r=!1,l=0,c,m,h,g,p,v,y,_,C,D,M,N,T;for(i=0,o=e.length;o>i;i++)d.push(e[i].getElementsByTagName("a")[0]),e[i].style.backgroundImage="none";for(t.oUITemplate=document.createElement("div"),t.oUITemplate.className="sm2-360ui",t.oUITemplateVis=document.createElement("div"),t.oUITemplateVis.className="sm2-360ui",y=t.uiTest(),t.config.circleDiameter=y.circleDiameter,t.config.circleRadius=y.circleRadius,_=t.uiTest("ui360-vis"),t.config.fontSizeMax=_.fontSizeMax,t.oUITemplate.innerHTML=t.getUIHTML(t.config.circleDiameter).join(""),t.oUITemplateVis.innerHTML=t.getUIHTML(_.circleDiameter).join(""),i=0,o=d.length;o>i;i++)!n.canPlayLink(d[i])||t.hasClass(d[i],t.excludeClass)||t.hasClass(d[i],t.css.sDefault)||(t.addClass(d[i],t.css.sDefault),t.links[l]=d[i],t.indexByURL[d[i].href]=l,l++,r=t.hasClass(d[i].parentNode,"ui360-vis"),p=(r?_:y).circleDiameter,v=(r?_:y).circleRadius,C=d[i].parentNode.insertBefore((r?t.oUITemplateVis:t.oUITemplate).cloneNode(!0),d[i]),s&&"undefined"!=typeof a.G_vmlCanvasManager?(M=d[i].parentNode,N=document.createElement("canvas"),N.className="sm2-canvas",T="sm2_canvas_"+i+(new Date).getTime(),N.id=T,N.width=p,N.height=p,C.appendChild(N),a.G_vmlCanvasManager.initElement(N),m=document.getElementById(T),c=m.parentNode.getElementsByTagName("canvas"),c.length>1&&(m=c[c.length-1])):m=d[i].parentNode.getElementsByTagName("canvas")[0],f>1&&t.addClass(m,"hi-dpi"),g=t.getElementsByClassName("sm2-cover","div",d[i].parentNode)[0],D=d[i].parentNode.getElementsByTagName("span")[0],t.addEventHandler(D,"click",t.buttonClick),u?t.addEventHandler(g,"touchstart",t.mouseDown):t.addEventHandler(g,"mousedown",t.mouseDown),h=m.getContext("2d"),h.translate(v,v),h.rotate(t.deg2rad(-90)));l>0&&(t.addEventHandler(document,"click",t.handleClick),t.config.autoPlay&&t.handleClick({target:t.links[0],preventDefault:function(){}})),n._writeDebug("threeSixtyPlayer.init(): Found "+l+" relevant items."),t.config.useFavIcon&&"undefined"!=typeof this.VUMeter&&(this.vuMeter=new this.VUMeter(this))}}t.prototype.VUMeter=function(a){var t=a,e=this,n=document.getElementsByTagName("head")[0],i=navigator.userAgent.match(/opera/i),s=navigator.userAgent.match(/firefox/i);this.vuMeterData=[],this.vuDataCanvas=null,this.setPageIcon=function(a){if(!t.config.useFavIcon||!t.config.usePeakData||!a)return!1;var e=document.getElementById("sm2-favicon");e&&(n.removeChild(e),e=null),e||(e=document.createElement("link"),e.id="sm2-favicon",e.rel="shortcut icon",e.type="image/png",e.href=a,document.getElementsByTagName("head")[0].appendChild(e))},this.resetPageIcon=function(){if(!t.config.useFavIcon)return!1;var a=document.getElementById("favicon");a&&(a.href="/favicon.ico")},this.updateVU=function(a){soundManager.flashVersion>=9&&t.config.useFavIcon&&t.config.usePeakData&&e.setPageIcon(e.vuMeterData[parseInt(16*a.peakData.left,10)][parseInt(16*a.peakData.right,10)])},this.createVUData=function(){var a=0,t=0,n=e.vuDataCanvas.getContext("2d"),i=n.createLinearGradient(0,16,0,0),s=n.createLinearGradient(0,16,0,0),o="rgba(0,0,0,0.2)";for(i.addColorStop(0,"rgb(0,192,0)"),i.addColorStop(.3,"rgb(0,255,0)"),i.addColorStop(.625,"rgb(255,255,0)"),i.addColorStop(.85,"rgb(255,0,0)"),s.addColorStop(0,o),s.addColorStop(1,"rgba(0,0,0,0.5)"),a=0;16>a;a++)e.vuMeterData[a]=[];for(a=0;16>a;a++)for(t=0;16>t;t++)e.vuDataCanvas.setAttribute("width",16),e.vuDataCanvas.setAttribute("height",16),n.fillStyle=s,n.fillRect(0,0,7,15),n.fillRect(8,0,7,15),n.fillStyle=i,n.fillRect(0,15-a,7,16-(16-a)),n.fillRect(8,15-t,7,16-(16-t)),n.clearRect(0,3,16,1),n.clearRect(0,7,16,1),n.clearRect(0,11,16,1),e.vuMeterData[a][t]=e.vuDataCanvas.toDataURL("image/png")},this.testCanvas=function(){var a=document.createElement("canvas"),t=null,e;if(!a||"undefined"==typeof a.getContext)return null;if(t=a.getContext("2d"),!t||"function"!=typeof a.toDataURL)return null;try{e=a.toDataURL("image/png")}catch(n){return null}return a},this.init=function(){t.config.useFavIcon&&(e.vuDataCanvas=e.testCanvas(),e.vuDataCanvas&&(s||i)?e.createVUData():t.config.useFavIcon=!1)},this.init()},t.prototype.Metadata=function(a,t){soundManager._wD("Metadata()");var e=this,n=a._360data.oUI360,i=n.getElementsByTagName("ul")[0],s=i.getElementsByTagName("li"),o=navigator.userAgent.match(/firefox/i),d=!1,r,l;for(this.lastWPExec=0,this.refreshInterval=250,this.totalTime=0,this.events={whileplaying:function(){var n=a._360data.width,i=a._360data.radius,s=a.durationEstimate||1e3*e.totalTime,o=null,d,r,l;for(d=0,r=e.data.length;r>d;d++)o=d%2===0,t.drawSolidArc(a._360data.oCanvas,o?t.config.segmentRingColorAlt:t.config.segmentRingColor,o?n:n,o?i/2:i/2,t.deg2rad(360*(e.data[d].endTimeMS/s)),t.deg2rad(360*((e.data[d].startTimeMS||1)/s)),!0);l=new Date,l-e.lastWPExec>e.refreshInterval&&(e.refresh(),e.lastWPExec=l)}},this.refresh=function(){var t,e,n=null,i=a.position,s=a._360data.metadata.data;for(t=0,e=s.length;e>t;t++)if(i>=s[t].startTimeMS&&i<=s[t].endTimeMS){n=t;break}n!==s.currentItem&&n<s.length&&(a._360data.oLink.innerHTML=s.mainTitle+' <span class="metadata"><span class="sm2_divider"> | </span><span class="sm2_metadata">'+s[n].title+"</span></span>",s.currentItem=n)},this.strToTime=function(a){var t=a.split(":"),e=0,n;for(n=t.length;n--;)e+=parseInt(t[n],10)*Math.pow(60,t.length-1-n);return e},this.data=[],this.data.givenDuration=null,this.data.currentItem=null,this.data.mainTitle=a._360data.oLink.innerHTML,r=0;r<s.length;r++)this.data[r]={o:null,title:s[r].getElementsByTagName("p")[0].innerHTML,startTime:s[r].getElementsByTagName("span")[0].innerHTML,startSeconds:e.strToTime(s[r].getElementsByTagName("span")[0].innerHTML.replace(/[()]/g,"")),duration:0,durationMS:null,startTimeMS:null,endTimeMS:null,oNote:null};for(l=t.getElementsByClassName("duration","div",n),this.data.givenDuration=l.length?1e3*e.strToTime(l[0].innerHTML):0,r=0;r<this.data.length;r++)this.data[r].duration=parseInt(this.data[r+1]?this.data[r+1].startSeconds:(e.data.givenDuration?e.data.givenDuration:a.durationEstimate)/1e3,10)-this.data[r].startSeconds,this.data[r].startTimeMS=1e3*this.data[r].startSeconds,this.data[r].durationMS=1e3*this.data[r].duration,this.data[r].endTimeMS=this.data[r].startTimeMS+this.data[r].durationMS,this.totalTime+=this.data[r].duration},navigator.userAgent.match(/webkit/i)&&navigator.userAgent.match(/mobile/i)&&soundManager.setup({useHTML5Audio:!0}),soundManager.setup({html5PollingInterval:50,debugMode:a.location.href.match(/debug=1/i),consoleOnly:!0,flashVersion:9,useHighPerformance:!0}),soundManager.debugMode&&a.setInterval(function(){var t=a.threeSixtyPlayer;t&&t.lastSound&&t.lastSound._360data.fps&&"undefined"==typeof a.isHome&&(soundManager._writeDebug("fps: ~"+t.lastSound._360data.fps),t.lastSound._360data.fps=0)},1e3),a.ThreeSixtyPlayer=t}(window),threeSixtyPlayer=new ThreeSixtyPlayer,soundManager.onready(threeSixtyPlayer.init);