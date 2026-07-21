import { fetchPlaceholders } from '/scripts/placeholders.js';
 
export default async function decorate(block) {

  const placeholders = await fetchPlaceholders();

  //console.warn('placeholders', placeholders);
 //console.warn('placeholders.testPage', placeholders.testpage);
  const rows = [...block.children];
 
  // Assume first row is text, second is image

  const textCol = rows[0];

  const imageCol = rows[1];
 
  // Replace the paragraph with a placeholder

  const p = textCol.querySelector('p');

  if (p) {

    p.textContent = placeholders.testpage ?? 'Default text';

  }
 
  // Remove any extra columns

  rows.slice(2).forEach((row) => row.remove());
 
  block.classList.remove(...[...block.classList].filter((c) => c.startsWith('columns-')));

  block.classList.add('columns-2-cols');

}
 