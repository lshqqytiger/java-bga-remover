chrome.storage.local.get("enabled", ({ enabled }) => {
  (<HTMLInputElement>document.getElementById("state")).checked = !!enabled;
});

(document.getElementById("state") as HTMLInputElement).addEventListener(
  "change",
  () => {
    chrome.storage.local.set({
      enabled: (<HTMLInputElement>document.getElementById("state")).checked,
    });
    if ((<HTMLInputElement>document.getElementById("state")).checked)
      chrome.tabs.executeScript({
        code: `(${() => {
          const style = document.createElement("style");
          style.id = "__EX__CUSTOM__STYLE__";
          style.innerHTML = ".player{ opacity: 0; !important; }";
          document.body.appendChild(style);
        }})();`,
      });
    else
      chrome.tabs.executeScript({
        code: `(${() => {
          const script = document.createElement("script");
          script.innerHTML =
            "document.getElementById('__EX__CUSTOM__STYLE__').remove();";
          script.addEventListener("load", () => {
            script.remove();
          });
          document.body.appendChild(script);
        }})();`,
      });
  }
);
