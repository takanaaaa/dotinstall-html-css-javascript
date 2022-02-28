'user strict';

{
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
  }
  const words = [
    'red',
    'blue',
    'pink',
  ];
  let loc = 0; // 1番目の文字、 2番目の文字という具合に再代入していく→letで宣言
  let startTime;
  let isPlaying = false;
  const target = document.getElementById('target');

  document.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;
    startTime = Date.now();
    setWord();
  })

  document.addEventListener('keydown', e => {
    if(e.key !== word[loc]) {
      return; //早期リターン
    }

    loc++;

    // 1: _ed
    // 2: __d
    // 3: ___
    // _をlocの個数分つなげる
    target.textContent = '_'.repeat(loc) + word.substring(loc);

    if(loc === word.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        return;
      }
      setWord();
    }
  });
}