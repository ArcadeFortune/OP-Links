// deprecated
function reloadAllScripts() {
  // Get all script tags in the document
  var scriptTags = document.getElementsByTagName("script");

  for (var i = 0; i < scriptTags.length; i++) {
    var script = scriptTags[i];
    if (script.src) {
      // Create a new script tag
      var newScript = document.createElement("script");
      newScript.src = script.src;

      // Optionally: bust the cache to ensure fresh copy is fetched
      var cacheBuster = Date.now();
      newScript.src = script.src.split("?")[0] + "?" + cacheBuster;

      // Remove the old script tag
      script.parentNode.removeChild(script);

      // Append the new script tag to the document head
      document.head.appendChild(newScript);
    }
    // Check if it's an inline script (i.e., no src attribute)
    if (!scriptTags[i].src) {
      var inlineContent = scriptTags[i].textContent;

      // Create a new script tag, populate it with the inline content
      var newScript = document.createElement("script");
      newScript.textContent = inlineContent;

      // Append it to the body to execute it
      document.body.appendChild(newScript);

      // Optionally, remove the newly created script element after execution
      document.body.removeChild(newScript);
    }
  }
}
