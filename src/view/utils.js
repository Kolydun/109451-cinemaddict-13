export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

const handler = {
  [RenderPosition.AFTEREND]: (container, element) => {
    container.after(element);
  },
  [RenderPosition.BEFOREEND]: (container, element) => {
    container.append(element);
  },
  [RenderPosition.AFTERBEGIN]: (container, element) => {
    container.prepend(element);
  },
};

export const render = (container, element, place) => {
  const handleRender = handler[place] || handler[RenderPosition.BEFOREEND];
  handleRender(container, element);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

