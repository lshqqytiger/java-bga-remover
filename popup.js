const exec = (str, isTemp) => {
	const func = (_, isTemp) => {
		const script = document.createElement("script");
		script.innerHTML = _;
		if(isTemp) setTimeout(() => {
			script.remove();
		}, 500);
		document.body.appendChild(script);
	};
	chrome.tabs.executeScript({
		code: `(${func})(\`${str}\`, ${isTemp});`
	});
}
const appendStyle = (css) => {
	const func = (_) => {
		const style = document.createElement("style");
		style.id = "__EX__CUSTOM__STYLE__";
		style.innerHTML = _;
		document.body.appendChild(style);
	};
	chrome.tabs.executeScript({
		code: `(${func})(\`${css}\`);`
	});
}

chrome.storage.local.get("enabled", ({ enabled }) => {
	document.getElementById("state").checked = !!enabled;
});

document.getElementById("state").addEventListener("change", () => {
	chrome.storage.local.set({ enabled: document.getElementById("state").checked });
	if(document.getElementById("state").checked) appendStyle(`
	.player{
		opacity: 0; !important;
	}`); 
	else exec(`document.getElementById("__EX__CUSTOM__STYLE__").remove();`, true);
});
