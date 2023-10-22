// can you write me a javascript function that takes two arguments top and left, in order to create a text at that precise position, which will be always visible to the user.
function createPreviewHint(top, left) {
  // Create a new <div> element for the text
  const textElement = document.createElement('div');
  textElement.className = 'iframe-container-hint';
  // Set the position style to fixed
  textElement.style.position = 'fixed';
  
  // Set the top and left positions based on the arguments
  
  textElement.style.top = top + 'px';
  textElement.style.left = left + 'px';

  // gpt sir u forgot the z index
  textElement.style.zIndex = '1000';

  // Set the text content
  textElement.textContent = previewBox.hint;

  // Append the text element to the document body
  document.body.appendChild(textElement);

  // make sure to center the text horizontally
  const elementRect = textElement.getBoundingClientRect();
  textElement.style.left = left - (elementRect.width / 2) + 'px';  
}

function destroyPreviewHint() {
  const element = document.querySelector('.iframe-container-hint');
  if (element) element.remove();
}