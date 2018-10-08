(function() {
  const quoteBox = document.querySelector('.quote-box');
  //new quote button
  const changeQuote = document.querySelector('.newQuote');
  //make an API request from quotesondesign.com to get random quotes
  function requestQuote() {
    $.ajax({
            url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
        }).done(addQuote)
        .fail(errorFun);
  }
  requestQuote();

  function addQuote(data) {
    if (data && data[0]) {
      htmlContent = `${data[0].content}<span id="author">${data[0].title}</span>`;
    } else {
      htmlContent = '<p class="error-no-image">No quotes available. Try again</p>';
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
    //get new quote
    requestQuote();
    //get tweet button and add an event listener
    const tweetButton = document.getElementById('tweet');
    tweetButton.addEventListener('click', quoteTweet);
    //get the quote and tweet it
     function quoteTweet(){
       const twQuote = document.querySelector(".quote-box p").textContent;
       const twAuthor = document.getElementById("author").textContent;
       window.open(`https://twitter.com/intent/tweet?text="${twQuote}" ${twAuthor}&hashtags=Inspiring`);
    }
  });

})();
