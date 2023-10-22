document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Visitor!')
  
  // affect every element with the class 'load'
  const linksToModify = document.querySelectorAll('.load');
  linksToModify.forEach((link) => {

    const url = link.attributes.href.value;

    // onHover
    link.addEventListener("mouseenter", function (event) {
      event.preventDefault();

      createPreview(url, event.clientX, event.clientY);
      link.style.cursor = "pointer";
      console.log('preview', url)
    });
  });
});
