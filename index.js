const rl = require('readline').createInterface({input: process.stdin, output: process.stdout});
const g = Array(3).fill().map(() => Array(3).fill(null));
const p = ['X', 'O'];
let t = p[Math.random() < 0.5 ? 0 : 1];
const win = player => g.some(r => r.every(c => c === player)) || g.some((r, i) => g.every(r => r[i] === player)) ||
  g[0][0] === player && g[1][1] === player && g[2][2] === player || g[0][2] === player && g[1][1] === player && g[2][0] === player;
const n = () => {
  console.log(` ${g[0][0] || 1} | ${g[0][1] || 2} | ${g[0][2] || 3}\n---+---+---\n` + 
  ` ${g[1][0] || 4} | ${g[1][1] || 5} | ${g[1][2] || 6}\n---+---+---\n` + ` ${g[2][0] || 7} | ${g[2][1] || 8} | ${g[2][2] || 9}\n`);
  rl.question(`${t} (1-9): `, input => {
    let i = input - 1;
    let [r, c] = [Math.floor(i / 3), i % 3]; 
    if (input < 1 || input > 9) {
      console.log('1 and 9, try again.');
      n();
      return;
    }
    if (g[r][c] === null) {
      g[r][c] = t;
      if (win(t)) console.log(`${t} win!`), rl.close();
      else if (g.flat().every(c => c)) console.log('Draw.'), rl.close();
      else t = t === 'X' ? 'O' : 'X', n();
    } else console.log('Taken, try again.'), n();
  });
};
n();
