export default function decorate(block) {
  const rows = [...block.children];

  console.log(rows);

  const imageContainer = rows[0];
  const textContainer = rows[1];

  block.textContent = '';

  if (imageContainer) {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'banner-image-wrapper';
    imgWrapper.append(...imageContainer.childNodes);
    block.append(imgWrapper);
  }

  if (textContainer) {
    const textWrapper = document.createElement('div');
    textWrapper.className = 'banner-text-wrapper';
    textWrapper.append(...textContainer.childNodes);
    block.append(textWrapper);
  }
}