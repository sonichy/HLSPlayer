var playerUrl = chrome.runtime.getURL('player.htm');

chrome.webRequest.onBeforeRequest.addListener(
	function(info) {
		console.log(info);
		if (info.url.indexOf(".m3u8") != -1) {
			var url = playerUrl + "#" + info.url;
			return { redirectUrl: url }
		}
	},
	{urls: ["*://*/*.m3u8*"], types:["main_frame"]},
	["blocking"]
);

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({ 'url': playerUrl + '#' }, function(tab){ });
});

function resize0_5XClicked(info, tab) {
	chrome.tabs.sendRequest(tab.id, { resize: "resize 0.5X" }, function(response) {

	});
}

function resize1XClicked(info, tab) {
	chrome.tabs.sendRequest(tab.id, { resize: "resize 1X" }, function(response) {

	});
}

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

showForPages = [ playerUrl + "*" ];

chrome.contextMenus.create({
	id : "resize0_5X",
	title: "Resize 0.5X",
	contexts : ["video"],
	documentUrlPatterns : showForPages,
	onclick : resize0_5XClicked
});

chrome.contextMenus.create({
	id : "resize1X",
	title: "Resize 1X",
	contexts : ["video"],
	documentUrlPatterns : showForPages,
	onclick : resize1XClicked
});

chrome.contextMenus.create({
	id : "capture",
	title: "Capture",
	contexts : ["video"],
	documentUrlPatterns : showForPages,
	onclick : captureClicked
});

chrome.contextMenus.create({
	id : "property",
	title : "Property",
	contexts : ["video"],
	documentUrlPatterns : showForPages,
	onclick : propertyClicked
});
