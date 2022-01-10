chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ enabled: false });
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
					pageUrl: {hostEquals: 'sorry.daldal.so'},
				})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});
