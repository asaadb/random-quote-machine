$(document).ready(() => {
  const quoteBox = $(".quote-box");
  //new quote button
  const changeQuote = $("#newQuote");
  //make an API request from quotesondesign.com to get random quotes
  function requestQuote() {
    $.ajax({
      url:
        "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      success: addQuote,
      error: errorFun
    });
  }
  requestQuote();

  function addQuote(data) {
    htmlContent = `${data[0].content}<span id="author">- ${
      data[0].title
    }</span>`;
    quoteBox.prepend(htmlContent);
    $(".quote-box p").prepend('<i class="fas fa-quote-left"></i>');
    $(".quote-box p").append('<i class="fas fa-quote-right"></i>');
  }

  function errorFun() {
    alert("Sorry, we are unable to load quote");
  }
  //event listener to get a new quote
  changeQuote.click(() => {
    //remove previous quote
    quoteBox.empty();
    //get new quote
    requestQuote();
  });
  //get tweet button and add an event listener
  const tweetButton = $("#tweet");
  tweetButton.click(quoteTweet);
  //get the quote and tweet it
  function quoteTweet() {
    const twQuote = $(".quote-box p").text();
    const twAuthor = $("author").text();
    window.open(
      `https://twitter.com/intent/tweet?text="${twQuote}" ${twAuthor}&hashtags=Inspiring`
    );
  }
});
