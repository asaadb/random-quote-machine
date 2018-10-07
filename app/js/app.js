(function() {
  const quoteBox = document.querySelector('.quote-box');
  //new quote button
  const changeQuote = document.querySelector('.newQuote');
  //make an API request from quotesondesign.com to get random quotes
  function requestQuote() {
  const quoteRequest = new XMLHttpRequest();
  quoteRequest.open('GET', 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1');
  quoteRequest.onload = addQuote;
  quoteRequest.onerror = errorFun;
  quoteRequest.send();
  }
  requestQuote();

  function addQuote() {
    let htmlContent;
    const data = JSON.parse(this.responseText);

    if (data && data[0]) {
      htmlContent = `${data[0].content}<span class="author">${data[0].title}</span>`;

    } else {
      htmlContent = '<div class="error-no-image">No images available</div>';
    }
    quoteBox.insertAdjacentHTML('afterbegin', htmlContent);
  }

  function errorFun() {
    alert('Sorry, we are unable to load quote');
  }
  //event listener to get a new quote
  document.addEventListener('click', () => {
    //remove previous quote
    while (quoteBox.hasChildNodes()) {
    quoteBox.removeChild(quoteBox.firstChild);
    }
    requestQuote();
  });

})();
