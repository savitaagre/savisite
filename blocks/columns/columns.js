// import { fetchPlaceholders } from '/scripts/placeholders.js';
 
// export default async function decorate(block) {

//   const placeholders = await fetchPlaceholders();

//   //console.warn('placeholders', placeholders);
//  //console.warn('placeholders.testPage', placeholders.testpage);
//   const rows = [...block.children];
 
//   // Assume first row is text, second is image

//   const textCol = rows[0];

//   const imageCol = rows[1];
 
//   // Replace the paragraph with a placeholder

//   const p = textCol.querySelector('p');

//   if (p) {

//     p.textContent = placeholders.testpage ?? 'Default text';

//   }
 
//   // Remove any extra columns

//   rows.slice(2).forEach((row) => row.remove());
 
//   block.classList.remove(...[...block.classList].filter((c) => c.startsWith('columns-')));

//   block.classList.add('columns-2-cols');

// }

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}git
 