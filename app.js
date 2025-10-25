// app.js — Kickoff: where JavaScript runs and how it connects to the page

// 1) Proof the JS file loaded and runs after HTML (thanks to defer)
console.log('app.js loaded');
const messageEl = document.querySelector('#message');
const testBtn = document.querySelector('#testBtn');

messageEl.textContent = 'JavaScript is running in the browser and can update the DOM.';

// 2) Event-driven behavior: react to a user action
testBtn.addEventListener('click', () => {
  const now = new Date().toLocaleTimeString();
  messageEl.textContent = `Button clicked at ${now}. JS handled the event.`;
  console.log('Button click handled:', now);
});

// 3) Quick type tour (browser Console will show the results)
const samples = [42, '42', true, undefined, null, Symbol('x'), 123n];
for (const value of samples) {
  console.log('typeof', value, '=>', typeof value);
}

// 4) Browser vs Node mental model (try these in Console and Node REPL)
console.log('In browser: typeof window =', typeof window);     // object
console.log('In browser: typeof document =', typeof document); // object
// In Node REPL, document is undefined: try typing `typeof document`
// Note: document and window are provided by the browser (the DOM), not by Node.

// 5) Where code runs summary (read-only comments):
// - This file runs in the browser because of <script defer src="app.js"></script> in index.html
// - You can also run JavaScript snippets in the DevTools Console (View > Developer > Console).
// - Node.js runs JavaScript outside the browser (no DOM). Use: `node` in your terminal.