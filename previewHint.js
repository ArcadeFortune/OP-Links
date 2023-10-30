// can you write me a javascript function that takes two arguments top and left, in order to create a text at that precise position, which will be always visible to the user.
function createPreviewHint(left, top) {
  // iframe with 'iframe-container' class needs to be present in the DOM
  const div = document.querySelector('.iframe-container');

  // Create a new <div> element for the text
  const textElement = document.createElement('div');
  textElement.className = 'iframe-container-hint'; // need this to destroy it later

  // Set the position style to fixed
  textElement.style.position = 'fixed';
  
  // Set the top and left positions based on the arguments  
  textElement.style.left = left + 'px';
  textElement.style.top = top + 'px';

  // gpt sir u forgot the z index
  textElement.style.zIndex = '1000';

  // Set the text content
  textElement.textContent = previewBox.hint; // the rules are the rules

  // Append the text element to the preview container
  div.appendChild(textElement);

  // make sure to center the text horizontally
  const elementRect = textElement.getBoundingClientRect();
  textElement.style.left = left - (elementRect.width / 2) + 'px';  
}

function destroyPreviewHint() {
  const element = document.querySelector('.iframe-container-hint');
  if (element) element.remove();
}
