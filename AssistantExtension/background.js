chrome.runtime.onInstalled.addListener(() => {

    chrome.contextMenus.create({
        id: "summarizeSelection",
        title: "Summarize with SummarizeIt",
        contexts: ["selection"]
    });

});


chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.menuItemId === "summarizeSelection") {

        chrome.storage.local.set({
            selectedText: info.selectionText
        });

        chrome.sidePanel.open({ tabId: tab.id });

    }

});


chrome.runtime.onMessage.addListener((message, sender) => {

    if (message.action === "summarizeSelection") {

        chrome.storage.local.set({
            selectedText: message.text
        });

        chrome.sidePanel.open({
            tabId: sender.tab.id
        });

    }

});


/* Open sidepanel when extension icon clicked */

chrome.action.onClicked.addListener((tab) => {
    chrome.sidePanel.open({ tabId: tab.id });
});