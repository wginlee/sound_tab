chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({audible: true, muted: false}, function(audibleTabs) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (cTabs) {
      let newIndex, startIndex = -1;
      let currentTab = cTabs[0];

      audibleTabs.push(currentTab);
      audibleTabs = audibleTabs.sort( (a, b) => {  return a.windowId - b.windowId || a.index - b.index; });
      startIndex = audibleTabs.findIndex(tab => tab === currentTab);

      if (audibleTabs[startIndex] === audibleTabs[startIndex+1]) {
        audibleTabs.splice(startIndex, 1);
      }

      newIndex = (startIndex >= audibleTabs.length - 1) ? 0 : startIndex + 1;

      chrome.windows.update(audibleTabs[newIndex].windowId, {focused: true});
      chrome.tabs.update(audibleTabs[newIndex].id, {active: true});

    });
  });
});