let datas = localStorage.getItem('shoppingCart');
const table = document.querySelector('table');
const d2 = JSON.parse(datas);

const rows = d2.map(element => {
  console.log(element);
  return `<tr>
        <td>${element.title}</td>
        <td>${element.description}</td>
        <td>${element.rating.rate}</td>
        <td>${element.price}</td>
        <td>${element.count}</td>
        <td><img src="${element.image}"></td>
      </tr>`;
}).join('');

table.innerHTML = `
      <thead>
        <tr>
          <th>name</th>
          <th>description</th>
          <th>rate</th>
          <th>price</th>
          <th>count</th>
          <th>image</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>`;
