function container(className) {
  const node = document.createElement('div');
  node.className = `hero-dark-${className}`;
  return node;
}

function standaloneLink(paragraph) {
  const links = paragraph.querySelectorAll('a[href]');
  const [link] = links;
  if (links.length !== 1 || paragraph.querySelector('img, picture')
    || paragraph.textContent.trim() !== link.textContent.trim()) return null;
  return link;
}

export default function decorate(block) {
  const previous = block.parentElement.previousElementSibling;
  if (previous?.matches('.default-content-wrapper') && previous.children.length === 1
    && previous.firstElementChild.matches('p') && previous.textContent.trim() === 'Home'
    && !previous.querySelector('a, img')) previous.classList.add('hero-dark-breadcrumb');
  const heading = block.querySelector('h1, h2, h3');
  const image = block.querySelector('picture, img');
  const copy = container('copy');
  const media = container('media');
  const actions = container('actions');
  const cells = [...block.children].flatMap((row) => [...row.children]);
  const imageCell = cells.find((cell) => image && cell.contains(image));
  const hasCaption = cells.length > 1 && imageCell && !imageCell.querySelector('h1, h2, h3')
    && ![...imageCell.querySelectorAll('p')].some(standaloneLink);

  if (heading) {
    heading.classList.add('hero-dark-heading');
    heading.remove();
  }
  if (image) {
    media.append(image);
    const img = image.matches('img') ? image : image.querySelector('img');
    // Eager loading is only appropriate for the first section's hero image.
    if (img && block.closest('.section') === document.querySelector('main > .section')) {
      img.loading = 'eager';
      img.setAttribute('fetchpriority', 'high');
    }
  } else block.classList.add('no-image');

  cells.forEach((cell) => {
    [...cell.childNodes].forEach((node) => {
      if (!node.textContent.trim() && !node.querySelector?.('img, picture')) return;
      // Copy next to an image in its own cell is an authored media caption.
      (hasCaption && cell === imageCell ? media : copy).append(node);
    });
  });

  // Only standalone links are CTAs. Inline links stay in the supporting copy.
  [...copy.querySelectorAll('p')].forEach((paragraph) => {
    const link = standaloneLink(paragraph);
    if (!link) return;
    const primary = !actions.children.length;
    link.className = `hero-dark-${primary ? 'primary' : 'secondary'}`;
    link.removeAttribute('role');
    link.querySelectorAll('em, i, .icon').forEach((icon) => {
      if (icon.textContent.trim() === 'arrow_forward'
        || icon.classList.contains('icon-arrow-forward')) icon.remove();
    });
    if (link.title.includes('arrow_forward')) {
      link.title = link.title.replace('arrow_forward', '').trim();
    }
    if (!primary) link.append(document.createTextNode(' '));
    const action = container('action');
    action.append(link);
    actions.append(action);
    paragraph.remove();
  });
  if (actions.children.length) copy.append(actions);

  // Reading order stays heading, copy, links, image at every screen size.
  block.replaceChildren();
  if (heading) block.append(heading);
  else block.classList.add('no-heading');
  if (copy.childNodes.length) block.append(copy);
  else block.classList.add('no-copy');
  if (media.children.length) block.append(media);
}
