function createPreview(src, left, top) {
  destroyPreview();
  // can you write me a javascript function that generates the following element structure:  <div class="iframe-container">  <iframe src="second.html"></iframe>  </div>. the src="" must be a parameter, and the style 'top' and 'left' should be a parameter too.
  // Create the container div element
  const container = document.createElement('div');
  container.className = 'iframe-container';
  
  // Create the iframe element
  const iframe = document.createElement('iframe');
  iframe.src = src;

  // Set the top and left styles
  container.style.left = left >= (previewBox.width / 2) ? left - (previewBox.width / 2) + 'px' : '1px';
  container.style.top = top >= (previewBox.height / 2) ? top - (previewBox.height / 2) + 'px' : '1px';

  // the rules are the rules
  container.style.width = previewBox.width + 'px';
  container.style.height = previewBox.height + 'px';

  // onNotHoverAnymore
  container.addEventListener("mouseleave", function (event) {
    event.preventDefault();
    // if the mouse (clientY) is above the container (container.getBoundingClientRect().top) and the height of the previewHint (querySelector('.iframe-container-hint').getBoundingClientRect().height)
    if (event.clientY < container.getBoundingClientRect().top + document.querySelector('.iframe-container-hint').getBoundingClientRect().height) {
      container.classList.add('accept');
      acceptPreview(src)
    }
    else {
      destroyPreview();
    }
  });

  // render the container
  container.appendChild(iframe);
  document.body.appendChild(container);

  // in html/javascript, how do i insert a type of 'preview' for another html page? my goal is to have an area in my html page, which is the content of a diffrent html page, but that diffrent html page is zoomed in a way to match the position and size of the area in my initial html page. i hope i explained it well enough.
  // this is not quiet the goal i was reaching. the different page should think the viewport is the same exact as my webpage. the point is, this area in my webpage, acts as some kind of window to a different page. this is not supposed to be very functional or userfriendly, it should look like a puzzle. does that prompt help you?
  
  // make sure the frame matches with the external page
  const elementRect = container.getBoundingClientRect();
  iframe.style.top = `-${elementRect.top + parseFloat(window.getComputedStyle(iframe.parentElement).borderWidth)}px`; // Change the "y" view
  iframe.style.left = `-${elementRect.left + Math.round(parseFloat(window.getComputedStyle(iframe.parentElement).borderWidth))}px`; // Change the "x" view
  iframe.style.width = window.innerWidth + 'px'
  iframe.style.height = window.innerHeight + 'px'

  createPreviewHint((previewBox.width / 2), 2);

  container.classList.add('animate');
}



function acceptPreview(src) {
  console.log('test')
  history.pushState('i have tried the following solutions:', "", src);

  // copies the dom of the iframe, javascript of the second page stops working entirely but also not, hm. ///////////////////////////////////////
  // var iframeDoc  = iframe.contentDocument;    
  // var iframeContent = new XMLSerializer().serializeToString(iframeDoc);
  // // Replace the entire current document with the iframe's content
  // document.open();
  // document.write(iframeContent);
  // document.close();
  // reloadAllScripts();

  // copies the dom of the iframe, does not copy javascript, nor css ///////////////////////////////////////
  // var iframeContent = document.querySelector('.iframe-container iframe').contentDocument.body.innerHTML;
  // document.body.innerHTML = iframeContent;
  // reloadAllScripts();

  // fetches the new index2.html, resetting all values, does fetch css, but javascript of the second page stops working entirely, inline js works ///////////////////////////////////////
  // fetch(src)
  //     .then(response => response.text())
  //     .then(content => {
  //         document.documentElement.innerHTML = content;
  //         reloadAllScripts();
  //     })
  //     .catch(error => {
  //         document.documentElement.innerHTML = 'Failed to load content';
  //         console.error('Error fetching second.html:', error);
  //     });

  // [best option] copies the dom of the iframe, only loads the css? thus javascript of the second page stops working entirely ///////////////////////////////////////
  // // Assuming you have only one iframe, or get the specific iframe you want.
  // let iframe = document.querySelector(".iframe-container iframe");
  // // Check if the iframe content is accessible (same-origin policy)
  // if (iframe.contentDocument) {
  //   // Get iframe content
  //   let iframeContent = iframe.contentDocument.documentElement.outerHTML;
  //   // Replace the current page content
  //   document.documentElement.innerHTML = iframeContent;
  //   // Change the URL in the browser without refreshing the page
  //   history.pushState(null, null, iframe.src);
  //   reloadAllScripts();
  // } else {
  //   console.error(
  //     "Cannot access iframe content due to cross-origin restrictions."
  //   );
  // }

  // opens up a literal blob hahaha ///////////////////////////////////////
  // const iframeContent = document.querySelector(".iframe-container iframe").contentDocument.documentElement.outerHTML;
  // const blob = new Blob([iframeContent], { type: 'text/html' });
  // const url = URL.createObjectURL(blob);
  // window.open(url, '_blank');

  // fetches the new index2.html, resetting all values, does not reload javascript, only the inline javascript will continue to work ///////////////////////////////////////
  // fetch(src).then((res) => {return res.text();}).then(data => {document.open(); document.write(data); document.close(); reloadAllScripts();})

  
      
  // single best option ///////////////////////////////////////
  setTimeout(() => {
    window.location.href = src;
  }, 70);
}

function destroyPreview() {
  destroyPreviewHint();
  const element = document.querySelector('.iframe-container');
  if (element) element.remove();
}
