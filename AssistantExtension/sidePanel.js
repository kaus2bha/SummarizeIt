document.addEventListener("DOMContentLoaded", async () => {

    const summarizeBtn = document.getElementById("summarizeBtn");
    const summarizePageBtn = document.getElementById("summarizePageBtn");
    const notesField = document.getElementById("notes");
    const saveNotesBtn = document.getElementById("saveNotesBtn");
    const inputTextField = document.getElementById("inputText");
    const summaryOutput = document.getElementById("summaryOutput");

    /* ==============================
       Summarize Selected / Input Text
    ============================== */

    let isLoading = false;

if (summarizeBtn) {

    summarizeBtn.addEventListener("click", async () => {

        if (isLoading) return;

        isLoading = true;
        summarizeBtn.innerText = "Summarizing...";
        summarizeBtn.disabled = true;

        const inputText = document.getElementById("inputText").value.trim();
        const summaryOutput = document.getElementById("summaryOutput");

        if (!inputText) {
            alert("Please paste or select some text to summarize.");
            summarizeBtn.innerText = "Summarize";
            summarizeBtn.disabled = false;
            isLoading = false;
            return;
        }

        // Loading message
        summaryOutput.innerText = "Generating AI summary...";

        try {

            const apiResponse = await fetch("http://localhost:8080/api/research/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: inputText,
                    operation: "summarize"
                })
            });

            const data = await apiResponse.json();

            summaryOutput.innerText = data.data;

        } catch (error) {

            console.error(error);
            summaryOutput.innerText = "Backend connection error";

        }

        summarizeBtn.innerText = "Summarize";
        summarizeBtn.disabled = false;
        isLoading = false;

    });

}


    /* ==============================
       Summarize Full Page
    ============================== */

    summarizePageBtn.addEventListener("click", async () => {

        const tabs = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        const tab = tabs[0];

        chrome.tabs.sendMessage(tab.id, { action: "getArticleText" }, async (response) => {

            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                alert("Extension could not access this page.");
                return;
            }

            if (!response || !response.text) {
                alert("No article content found.");
                return;
            }

            const articleText = response.text;

            inputTextField.value = articleText;

            try {

                const apiResponse = await fetch("http://localhost:8080/api/research/process", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content: articleText,
                        operation: "summarize"
                    })
                });

                const data = await apiResponse.json();

                summaryOutput.innerText = data.data;

            } catch (error) {

                console.error(error);
                summaryOutput.innerText = "Backend connection error";

            }

        });

    });


    /* ==============================
       Notes Section
    ============================== */

    saveNotesBtn.addEventListener("click", async () => {

        const notes = notesField.value;

        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        const url = tab.url;

        chrome.storage.local.set({
            [url]: notes
        });

        alert("Notes saved!");

    });


    /* ==============================
       Load Saved Notes
    ============================== */

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    const url = tab.url;

    chrome.storage.local.get([url], (result) => {

        if (result[url]) {
            notesField.value = result[url];
        }

    });

    chrome.storage.local.get(["selectedText"], (result) => {

        if (result.selectedText) {
            inputTextField.value = result.selectedText;
        }

    });

});