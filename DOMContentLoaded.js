document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Visitor!')
  
  // affect every element with the class 'load'
  const linksToModify = document.querySelectorAll('.load');
  linksToModify.forEach((link) => {

    const url = link.attributes.href.value;

    // onHover
    link.addEventListener("mouseenter", function (event) {
      event.preventDefault();
      // i think centering it around the element is smarter / looks better than centering it around the mouse
      const { x, y } = getCenterCoordinatesOfElement(link);
      createPreview(url, x, y);
      link.style.cursor = "pointer";
      console.log('preview', url)
    });
  });
});
