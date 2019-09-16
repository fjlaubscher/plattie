export const bindButtonEvents = (
  id: string,
  onPointerDown: Function,
  onPointerUp?: Function
) => {
  const button = document.getElementById(id);
  if (button) {
    // cant use pointer events
    // ios safari doesn't support it
    button.addEventListener('touchstart', () => onPointerDown());
    button.addEventListener('mouseup', () => onPointerDown());

    if (onPointerUp) {
      button.addEventListener('mousedown', () => onPointerUp());
      button.addEventListener('touchend', () => onPointerUp());
    }
  }
};
