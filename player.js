var url = document.URL;
var video = document.getElementById('video');
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