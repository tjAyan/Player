function qtWaveformDebug(e){if(jQuery("#qtmusicplayer").data("debug")){var t=jQuery("#qtmPlayerDebugger");t.length>0&&t.append(e+"<br>")}}jQuery.storedPeaks=[];const drawAudio=e=>{if(0!==jQuery("#qtKenthaPlayerWaveform").length){if(jQuery("#qtKenthaPlayerWaveform canvas").remove(),jQuery("#qtKenthaPlayerWaveform").append('<canvas id="qtwaveformOriginal"></canvas><canvas id="qtwaveformClone"></canvas>'),jQuery.qtmplayerCanvas=jQuery("#qtKenthaPlayerWaveform #qtwaveformOriginal"),jQuery.qtmplayerCanvasClone=jQuery("#qtKenthaPlayerWaveform #qtwaveformClone"),jQuery.qtmplayerCanvasCloneColor=jQuery("#qtKenthaPlayerWaveform").data("color"),void 0!==jQuery.storedPeaks[e])return draw(e,jQuery.storedPeaks[e],!1),!0;var t=jQuery("#qtmusicplayer").data("siteurl");jQuery.ajax({type:"get",url:t,data:{kentha_spectrum_url:e},success:function(t){qtWaveformDebug("Waveform cache response success");var a=0;if(void 0!==t&&"error"!==t)try{"object"==typeof(r=jQuery.parseJSON(t))&&(a=1)}catch(e){console.log(e)}if(1===a){qtWaveformDebug("Use DB peaks");var r=jQuery.parseJSON(t);jQuery.storedPeaks[e]=r,draw(e,r,!1)}else{qtWaveformDebug("Calculate peaks new"),window.AudioContext=window.AudioContext||window.webkitAudioContext;const t=new AudioContext;fetch(e).then(e=>e.arrayBuffer()).then(e=>t.decodeAudioData(e)).then(t=>draw(e,normalizeData(filterData(t)),!0))}return!0},fail:function(e){qtWaveformDebug(e),qtWaveformDebug("Ajax FAIL")}})}},filterData=e=>{const t=e.getChannelData(0),a=Math.floor(t.length/500),r=[];for(let e=0;e<500;e++){let o=a*e,n=0;for(let e=0;e<a;e++)n+=Math.abs(t[o+e]);r.push(n/a)}return r},normalizeData=e=>{const t=Math.pow(Math.max(...e),-1);return e.map(e=>e*t)},draw=(e,t,a)=>{const r=jQuery.qtmplayerCanvas[0],o=window.devicePixelRatio||1;r.width=r.offsetWidth*o,r.height=(r.offsetHeight+4)*o;const n=r.getContext("2d");n.scale(o,-o),n.translate(0,-r.offsetHeight-2-2);const l=Math.round(r.offsetWidth/t.length);jQuery.storedPeaks[e]=t,qtWaveformDebug("Store data:"+a),1==a&&jQuery.ajax({type:"post",url:ajax_var.url,data:{action:"qtmplayer-store-peaks",nonce:ajax_var.nonce,url:e,peaks:t},success:function(e){return qtWaveformDebug("Data stored: "+e),!0},fail:function(e){return qtWaveformDebug("Data not stored: "+response),!1}});n.beginPath(),n.moveTo(0,0);for(let e=0;e<t.length;e++){let a=Math.round(l*e),o=t[e]*r.offsetHeight-2;n.moveTo(a,0),n.lineTo(a,o),n.lineTo(Math.round(l-1+a),o),n.lineTo(Math.round(l-1+a),0),n.lineTo(l+a,0)}n.moveTo(0,0),n.strokeStyle="#FFFFFF",n.fillStyle="#FFFFFF",n.fill();const s=jQuery.qtmplayerCanvasClone[0];s.width=s.offsetWidth*o,s.height=(s.offsetHeight+4)*o;const u=s.getContext("2d");u.scale(o,-o),u.translate(0,-s.offsetHeight-2-2),u.beginPath(),u.moveTo(0,0);for(let e=0;e<t.length;e++){let a=l*e,o=t[e]*r.offsetHeight-2;u.moveTo(a,0),u.lineTo(a,o),u.lineTo(Math.round(l-1+a),o),u.lineTo(Math.round(l-1+a),0),u.lineTo(l+a,0)}u.moveTo(0,0),u.strokeStyle=jQuery.qtmplayerCanvasCloneColor,u.fillStyle=jQuery.qtmplayerCanvasCloneColor,u.fill()};
//# sourceMappingURL=kenthaplayer-waveform-min.js.map