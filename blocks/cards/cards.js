import { createOptimizedPicture } from '../../scripts/aem.js';
import { fetchPlaceholders } from '/scripts/placeholders.js';

export default async function decorate(block) {

const placeholders = await fetchPlaceholders();

  //console.warn('placeholders', placeholders);
 //console.warn('placeholders.testPage', placeholders.testpage);
 //console.warn('placeholders.Click', placeholders.click);

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';

      const rows = [...li.children];
 
      // Assume first row is text, second is image
      const textCol = rows[1];

      //const imageCol = rows[1];    
      // Replace the paragraph with a placeholder

      const p = textCol.querySelectorAll('p')[1];

      if (p) {
        p.textContent = placeholders.click ?? 'Default text';
      }

    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);

  
}
