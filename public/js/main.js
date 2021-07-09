const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const whatsappBtn = document.getElementById('whatsapp');
const telegramBtn = document.getElementById('telegram');
const newQuoteBtn = document.getElementById('new-quote');
const newTriviaBtn = document.getElementById('new-trivia');
const loader = document.getElementById('loader');
let apiQuotes = [];
let apiTrivia = []
// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();

  // Pick a random quote from array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.innerHTML = 'Unknown';
  } else {
    authorText.innerHTML = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getTrivia() {
  loading();

  // Pick a random quote from array
  const trivia = apiTrivia[Math.floor(Math.random() * apiTrivia.length)];

  authorText.innerHTML = trivia.correct_answer;
  
  if (trivia.question.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.innerHTML = trivia.question;
  complete();
}

async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  const triviaUrl = 'https://opentdb.com/api.php?amount=10'
  try {
    const responseQuote = await fetch(apiUrl);
    const responseTrivia = await fetch(triviaUrl);
    apiQuotes = await responseQuote.json();
    const triviaResponse = await responseTrivia.json();
    console.log('URL',triviaResponse);
    apiTrivia = triviaResponse.results;
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
async function tweetMsg() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText} 
   \u270D For more visit: https://dailymantra.herokuapp.com/`;
  window.open(twitterUrl, '_blank');
  
}
async function whatsappMsg() {
   const whatsappUrl = `https://api.whatsapp.com/send?text=${quoteText.innerText} - ${authorText.innerText}
   \n| \u270D For more visit: https://dailymantra.herokuapp.com/ |`;
   window.open(whatsappUrl, '_blank');
  
}

async function telegramMsg() {
   const telegramUrl = `https://telegram.me/share/url?url=&text=${quoteText.innerText} \n - \n ${authorText.innerText}
   \n| \u270D For more visit: https://dailymantra.herokuapp.com/ |`;
   window.open(telegramUrl, '_blank');
  
}
// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetMsg);
whatsappBtn.addEventListener('click', whatsappMsg);
telegramBtn.addEventListener('click', telegramMsg);
newTriviaBtn.addEventListener('click', getTrivia);

// On Load
getQuotes();
