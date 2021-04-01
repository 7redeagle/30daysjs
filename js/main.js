// generate random background color for each div element
function randomColor() {
  // Threshold can be between 0 and 127: 
  //    the higher it is, the more colors are considered to be too grey-like.
  const threshold = 50;
  // Generate three color parts randomly
  const parts = Array.from(Array(3), _ =>
    Math.floor(Math.random() * 256)
  ).sort((a, b) => a - b);

  // Check whether they are too close to the same value:
  if (parts[2] - parts[0] < threshold) { // color is too greyish
    // Replace the middle one with a random value outside of the "too close" range
    const exclude = Math.min(255, parts[0] + threshold) -
      Math.max(0, parts[2] - threshold);
    parts[1] = Math.floor(Math.random() * (256 - exclude));
    if (parts[1] >= parts[2] - threshold) parts[1] += exclude;
  }
  // Shuffle and format the color parts and return the resulting string
  return parts
    .sort((a, b) => Math.random() < 0.5)
    .map(p => ('0' + p.toString(16)).substr(-2))
    .join('');
}



// generate card data from object challenges
const projectSection = document.querySelector(".grid");
challenges.forEach(challenge =>
  projectSection.insertAdjacentHTML("beforeend",
    `<div class="card">
      <i class="fas ${challenge.logo} fa-2x"></i>
      <h3>${challenge.name}</h3>
      <a class="card__demo" href="${challenge.demo}">Demo</a>
      <a class="card__code" href="${challenge.code}">Code</a>
    </div>`)
)

// Generate random colors for each div 
const cards = document.querySelectorAll('.card');
for (const card of cards) {
  card.style.background = '#' + randomColor();
  console.log(card.style.background);
}