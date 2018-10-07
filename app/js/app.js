(function() {
  const quoteContainer = document.querySelector('.quote-container');
  const quoteRequest = new XMLHttpRequest();
  quoteRequest.open('GET', 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1');
  quoteRequest.onload = addQuote;
  quoteRequest.onerror = errorFun;
  quoteRequest.send();

  function addQuote() {
    let htmlContent;
    const data = JSON.parse(this.responseText);

    if (data && data[0]) {
      htmlContent = `${data[0].content}<span class="author">${data[0].title}</span>`;

    } else {
      htmlContent = '<div class="error-no-image">No images available</div>';
    }
    quoteContainer.insertAdjacentHTML('beforeend', htmlContent);
  }

  function errorFun() {
    alert('Sorry, we are unable to load quotes');
  }

})();
