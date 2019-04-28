var url = document.URL;
var video = document.getElementById('video');
video.oncanplay = function(){
	document.title = 'HLSPlayer (' + video.videoWidth + ' X ' + video.videoHeight + ')';
}

if(Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(url.split('#')[1]);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
		video.play();
	});
}

document.onkeydown = function(event){
	//console.log(event.keyCode);
	if(event.keyCode == 32){
		if(video.paused) {
			video.play();
		}else{
			video.pause();
		}
	}else if(event.keyCode == 39){
		video.currentTime += 5;
	}else if(event.keyCode == 37){
		video.currentTime -= 5;
	}else if(event.keyCode == 38){
		if(video.volume < 1)
			video.volume += 0.1;
	}else if(event.keyCode == 40){
		if(video.volume > 0)
			video.volume -= 0.1;
	}else if(event.keyCode == 77){		
		video.muted = !video.muted;
	}else if(event.keyCode == 70){		
		video.requestFullscreen();
	}
};

video.onclick = function(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function filename() {
	var d = new Date();
	var y = d.getFullYear();
	var m = d.getMonth()+1;
	var date = d.getDate();
	var h = d.getHours();
	var min = d.getMinutes();
	var s = d.getSeconds();
	var mo = m<10 ? '0' + m : '' + m;
	var dd = date<10 ? '0' + date : '' + date;
	var hh = h<10 ? '0' + h : '' + h;
	var mm = min<10 ? '0' + min : '' + min;
	var ss = s<10 ? '0' + s : '' + s;      
	var fn = 'HLS' + y + mo + dd + hh + mm + ss + '.jpg';
	return fn;
}

function capture(){
	if(video.videoWidth != 0 || video.videoHeight != 0){
		var canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		canvas.getContext('2d').drawImage(video, 0, 0);    
		var link = document.createElement('a');
		link.download = filename();
		link.href = canvas.toDataURL('image/jpeg');
		link.click();
	}
}

function property(){
	alert('Resolution: ' + video.videoWidth + ' X ' + video.videoHeight);
}

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		console.log(request);
		if (request.resize == "resize 0.5X"){
			chrome.windows.getCurrent(function(wind) {
				console.log(wind);
				var dw = wind.width - document.body.clientWidth;
				var dh = wind.height - document.body.clientHeight;
				var updateInfo = {
					left: wind.left,
					top: wind.top,
					width: video.videoWidth/2 + dw,
					height: video.videoHeight/2 + dh
				};
				chrome.windows.update(wind.id, updateInfo);
			});
		} else if (request.resize == "resize 1X") {
			chrome.windows.getCurrent(function(wind) {
				console.log(wind);
				var dw = wind.width - document.body.clientWidth;
				var dh = wind.height - document.body.clientHeight;
				var updateInfo = {
					left: wind.left,
					top: wind.top,
					width: video.videoWidth + dw,
					height: video.videoHeight + dh
				};
				chrome.windows.update(wind.id, updateInfo);
			});
		} else if (request.capture == "capture start"){
			capture();
			sendResponse({capture: "capture done"});
		} else if (request.property == "property start"){
			property();
			sendResponse({property: "property done"});
		} else {
			sendResponse({});
		}
	}
);
