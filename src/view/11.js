export const AFTERBEGIN = `afterbegin`;
export const AFTEREND = `afterend`;
export const BEFOREND = `beforeend`;

const handler = {
  [AFTEREND]: (container, element) => {
    container.after(element);
  },
  [BEFOREND]: (container, element) => {
    container.append(element);
  },
  [AFTERBEGIN]: (container, element) => {
    container.prepend(element);
  },
};

export const render = (container, element, place) => {
  const handleRender = handler[place] || handler[BEFOREND];
  handleRender(container, element);
};
