const quotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Unknown" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" }
];

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuote');
const saveQuoteBtn = document.getElementById('saveQuote');
const shareQuoteBtn = document.getElementById('shareQuote');
const favoriteList = document.getElementById('favoriteList');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function getDailyQuote() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem('quoteDate');
  const savedQuote = JSON.parse(localStorage.getItem('dailyQuote'));

  if (savedQuote && savedDate === today) {
    displayQuote(savedQuote);
  } else {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    localStorage.setItem('dailyQuote', JSON.stringify(newQuote));
    localStorage.setItem('quoteDate', today);
    displayQuote(newQuote);
  }
}

function displayQuote(quote) {
  quoteText.textContent = "${quote.text}";
  quoteAuthor.textContent = — ${quote.author};
}

function newQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  displayQuote(randomQuote);
  localStorage.setItem('dailyQuote', JSON.stringify(randomQuote));
}

function saveFavorite() {
  const currentQuote = {
    text: quoteText.textContent.replace(/"/g, ""),
    author: quoteAuthor.textContent.replace("— ", "")
  };
  favorites.push(currentQuote);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
}

function renderFavorites() {
  favoriteList.innerHTML = '';
  favorites.forEach((quote, index) => {
    const li = document.createElement('li');
    li.innerHTML = "${quote.text}" — ${quote.author};
    favoriteList.appendChild(li);
  });
}

function shareQuote() {
  const text = ${quoteText.textContent} ${quoteAuthor.textContent};
  if (navigator.share) {
    navigator.share({
      title: "Inspiring Quote",
      text: text,
      url: window.location.href
    }).catch(console.error);
  } else {
    alert("Sharing is not supported on this device.");
  }
}

newQuoteBtn.addEventListener('click', newQuote);
saveQuoteBtn.addEventListener('click', saveFavorite);
shareQuoteBtn.addEventListener('click', shareQuote);

renderFavorites();
getDailyQuote();