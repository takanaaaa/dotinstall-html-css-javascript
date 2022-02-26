'user strict';

{
  function createColumn(col) {
    const source = [];
    for (let i = 0; i < 15; i++) {
      source[i] = i + 1 + 15 * col;
    }
    const column = [];
    // b[0] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    // b[1] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    // b[2] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    // b[3] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    // b[4] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    for (let i = 0; i < 5; i++){
      column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    }

    return column;
  }

  function createColumns() {
    const columns = [];
    // columns[0] = createColumn(0);
    // columns[1] = createColumn(1);
    // columns[2] = createColumn(2);
    // columns[3] = createColumn(3);
    // columns[4] = createColumn(4);

    for (let i = 0; i < 5; i++) {
      columns[i] = createColumn(i);
    }
    columns[2][2] = 'FREE';
    return columns;
  }
  
  //ページに反映
  function renderBingo(columns) {
    for (let row = 0; row < 5; row++) {
      const tr = document.createElement('tr');
      for(let col = 0; col < 5; col++) {
        const td = document.createElement('td');
        td.textContent = columns[col][row];
        tr.appendChild(td);
      }
      document.querySelector('tbody').appendChild(tr);
    }
  }

  const columns = createColumns();
  renderBingo(columns);
}