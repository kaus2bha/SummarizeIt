/* ==============================
   Inject Floating Button Styles
================================ */

const style = document.createElement("style");
style.textContent = `
.ai-summarize-btn {
    position: absolute;
    z-index: 9999;
    padding: 8px 14px;
    border-radius: 20px;
    border: none;
    font-size: 13px;
    font-weight: 500;
    background: linear-gradient(135deg,#6366f1,#8b5cf6);
    color: white;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
    transition: all 0.2s ease;
    animation: fadeIn 0.2s ease;
}

.ai-summarize-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

@keyframes fadeIn {
    from {
        opacity:0;
        transform:scale(0.9);
    }
    to {
        opacity:1;
        transform:scale(1);
    }
}
`;

(document.head || document.documentElement).appendChild(style);


/* ==============================
   1. Extract Article Text
================================ */

function getArticleText() {

    // Try common article containers
    const selectors = [
        "article",
        "main",
        "[role='main']",
        ".article",
        ".post",
        ".content",
        ".blog",
        ".entry-content"
    ];

    for (let selector of selectors) {
        const element = document.querySelector(selector);
        if (element && element.innerText.length > 200) {
            return element.innerText;
        }
    }

    // Fallback: collect all paragraphs
    const paragraphs = document.querySelectorAll("p");

    let text = "";

    paragraphs.forEach(p => {
        if (p.innerText.length > 50) {
            text += p.innerText + "\n\n";
        }
    });

    return text;
}


/* ==============================
   2. Respond to Extension Requests
================================ */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "getArticleText") {

        const articleText = getArticleText();

        sendResponse({
            text: articleText
        });

    }

});


/* ==============================
   3. Floating Summarize Button
================================ */

let floatingButton = null;

document.addEventListener("mouseup", () => {

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString().trim();

    if (selectedText.length > 20) {

        if (!floatingButton) {

            floatingButton = document.createElement("button");
            floatingButton.className = "ai-summarize-btn";
            floatingButton.innerText = "⚡ Summarize";

            document.body.appendChild(floatingButton);
        }

        const rect = selection.getRangeAt(0).getBoundingClientRect();

        floatingButton.style.top = `${window.scrollY + rect.bottom + 8}px`;
        floatingButton.style.left = `${window.scrollX + rect.left}px`;

        floatingButton.onclick = () => {

            const selectedText = window.getSelection().toString().trim();

           chrome.runtime.sendMessage({
            action: "summarizeSelection",
            text: selectedText
        });
        };

    } else {

        removeFloatingButton();

    }

});


// Remove button when scrolling
window.addEventListener("scroll", () => {
    removeFloatingButton();
});


// Remove button when clicking elsewhere
document.addEventListener("mousedown", (event) => {

    if (floatingButton && !floatingButton.contains(event.target)) {
        removeFloatingButton();
    }

});


function removeFloatingButton() {

    if (floatingButton) {
        floatingButton.remove();
        floatingButton = null;
    }

}