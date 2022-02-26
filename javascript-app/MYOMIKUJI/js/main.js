'user strict';

{
  const btn = document.getElementById('btn');

  btn.addEventListener('click', () => {
    // const results = ['大吉', '中吉', '凶', '末吉'];
    // const n = Math.floor(Math.random() * results.length);
    // btn.textContent = results[n];
    // btn.textContent = results[Math.floor(Math.random() * results.length)];

    // switch(n) {
    //   case 0:
    //     btn.textContent = '大吉'
    //     break;
    //   case 1:
    //     btn.textContent = '中吉'
    //     break;
    //   case 2:
    //     btn.textContent = '凶'
    //     break;
    // }

    // 確率を操作
    const n = Math.random();
    if (n < 0.8) {
      btn.textContent = '大吉'; // 80%
    } else if (n < 0.2) {
      btn.textContent = '中吉'; // 15%
    } else {
      btn.textContent = '凶'; // 5%
    }
  });
}