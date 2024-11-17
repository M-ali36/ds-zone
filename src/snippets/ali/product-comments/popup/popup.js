document.getElementById("extract").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extractComments" }, (response) => {
      const output = document.getElementById("output");
      if (response && response.extractedData) {
        output.value = response.extractedData;
      } else {
        output.value = "Error: Unable to extract data.";
      }
    });
  });
});

document.getElementById("copy").addEventListener("click", () => {
  const output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
});
