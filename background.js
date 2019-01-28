chrome.webRequest.onBeforeRequest.addListener(	
	function(info) {
		console.log(info);
		if (info.url.endsWith(".m3u8")) {
			var playerUrl = chrome.runtime.getURL('player.html') + "#" + info.url;
			return { redirectUrl:  playerUrl }      
		}
	},
	{urls: ["*://*/*.m3u8*"], types:["main_frame"]},
	["blocking"]
);

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({ 'url': chrome.extension.getURL('player.html') + '#' }, function(tab){ });
});