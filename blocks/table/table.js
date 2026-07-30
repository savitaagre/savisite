/*
 * Table Block
 * Recreate a table
 * https://www.hlx.live/developer/block-collection/table
 */

function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

// export default async function decorate(block) {
//   const table = document.createElement('table');
//   const thead = document.createElement('thead');
//   const tbody = document.createElement('tbody');

//   const header = !block.classList.contains('no-header');
//   if (header) table.append(thead);
//   table.append(tbody);

//   [...block.children].forEach((child, i) => {
//     const row = document.createElement('tr');
//     if (header && i === 0) thead.append(row);
//     else tbody.append(row);
//     [...child.children].forEach((col) => {
//       const cell = buildCell(header ? i : i + 1);
//       const align = col.getAttribute('data-align');
//       const valign = col.getAttribute('data-valign');
//       if (align) cell.style.textAlign = align;
//       if (valign) cell.style.verticalAlign = valign;
//       cell.innerHTML = col.innerHTML;
//       row.append(cell);
//     });
//   });
//   block.innerHTML = '';
//   block.append(table);
// }

async function createTableHeader(table) {
  let tr = document.createElement('tr');
  let name = document.createElement('th');name.appendChild(document.createTextNode("Name"));
  let department = document.createElement('th');department.appendChild(document.createTextNode("Department"));
  let location = document.createElement('th');location.appendChild(document.createTextNode("Location"));
  tr.append(name);
  tr.append(department);
  tr.append(location);
  table.append(tr);
}
  
async function createTableRow(table, row, i) {
  let tr = document.createElement('tr');
  let name = document.createElement('td');name.appendChild(document.createTextNode(row.Name));
  let department = document.createElement('td');department.appendChild(document.createTextNode(row.Department));
  let location = document.createElement('td');location.appendChild(document.createTextNode(row.Location));
  tr.append(name);
  tr.append(department);
  tr.append(location);
  table.append(tr);
}

async function createTable(jsonUrl, val){ 
  let pathname = null;
  if(val){
    pathname = jsonUrl;
  }else{
    pathname = new URL(jsonUrl);
  }

  const resp = await fetch(pathname);
  const json = await resp.json();
  console.log("========json========{} ", json);
  const table = document.createElement('table');
  createTableHeader(table);
  json.data.forEach((row, i) => {
    createTableRow(table, row, (i+1));
  });
  return table;
}

export default async function decorate(block) {
  const data = block.querySelector('a[href$=".json"]');
  console.log(data);
  const parentDiv= document.createElement('div');
  parentDiv.classList.add('data-block');
  if(data){

      parentDiv.append(await createTable(data.href, null));
      data.replaceWith(parentDiv);
  }
  
}