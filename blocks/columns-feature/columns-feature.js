import { groupActions } from '../../scripts/actions.js';

export default function decorate(block) {
  const section = block.closest('.section');
  // Explicit block options override section metadata. A neutral section uses light.
  if (!block.classList.contains('light') && !block.classList.contains('dark')) {
    block.classList.add(section?.classList.contains('dark') ? 'dark' : 'light');
  }
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      const picture = cell.querySelector('picture, img');
      const onlyMedia = picture && !cell.textContent.trim();
      cell.classList.add(onlyMedia ? 'columns-feature-media' : 'columns-feature-copy');
      if (!onlyMedia) groupActions(cell, 'columns-feature');
    });
  });
}
