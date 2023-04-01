const heading = document.querySelector('h1');
const words = heading.textContent.split(' ');

let display = [];
let letterCase = [];

words.forEach(function(w,i){
	const letters = w.split('');
	letters.forEach(function(l){
		letterCase.push(`<span class="letter">${l}</span>`);
	})
  display.push(`<span class="word" style="--cols:${letters.length}">${letterCase.join('')}</span>`);
  letterCase.length = 0;
})

heading.innerHTML = display.join('');

setTimeout(showText,400);

function showText(){
  heading.classList.add('show');
}