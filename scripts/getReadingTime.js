// Gathering all elements likely to contain words
const containers = Array.from(document.querySelectorAll('article, section'));

const headings = containers
  .map((container) =>
    Array.from(container.querySelectorAll(':scope h1, h2, h3, h4, h5, h6'))
  )
  .flat();
const uniqueHeadings = new Set(headings);

const paragraphs = containers
  .map((container) => Array.from(container.querySelectorAll(':scope p')))
  .flat();
const uniqueParagraphs = new Set(paragraphs);

const others = containers
  .map((container) => Array.from(container.querySelectorAll(':scope code')))
  .flat();
const uniqueOthers = new Set(others);

const elements = [...uniqueHeadings, ...uniqueParagraphs, ...uniqueOthers];

// `document.querySelector` may return null if the selector doesn't match anything.
if (elements) {
  const wordMatchRegExp = /[^\s]+/g;
  let wordsCount = 0;

  // Counting words on the page
  elements.forEach((element) => {
    const text = element.textContent;
    const words = text.matchAll(wordMatchRegExp);
    wordsCount += [...words].length;
  });
  console.log('🧮 Words count: ', wordsCount);

  // Calculating reading time based on the amount of words
  // and the average reading speed of most adults which is
  // around 200 to 250 words per minute.
  const readingTimeInMinutes = Math.round(wordsCount / 250);
  const unit = readingTimeInMinutes > 1 ? 'minutes' : 'minute';

  // Logging reading time in the console
  console.log(`⏱️ ${readingTimeInMinutes} ${unit} read`);
}
