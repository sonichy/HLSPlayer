chrome.webRequest.onBeforeRequest.addListener(	
	function(info) {
		console.log(info);
		if (info.url.indexOf(".m3u8") != -1) {
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

function captureClicked(info, tab) {
	chrome.tabs.sendRequest(tab.id, {capture: "capture start"}, function(response) {
		console.log(response.capture);
	});
}

function propertyClicked(info, tab) {
	chrome.tabs.sendRequest(tab.id, {property: "property start"}, function(response) {
		console.log(response.property);
	});
}

chrome.contextMenus.create({ id : "capture" , title: "Capture", contexts : ["video"], onclick : captureClicked });

chrome.contextMenus.create({ id : "property", title : "Property", contexts : ["video"], onclick : propertyClicked });
