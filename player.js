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