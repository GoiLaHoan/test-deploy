export default function listenForOutsideClick(
  listening: boolean,
  setListening: (arg0: boolean) => void,
  menuRef: { current: any },
  setIsOpen: (arg0: boolean) => void,
) {
  if (listening) return;
  if (!menuRef.current) return;
  setListening(true);
  [`click`, `touchstart`].forEach(() => {
    document.addEventListener(`click`, (evt) => {
      const cur = menuRef.current;
      const node = evt.target;
      if (cur?.contains(node)) return;
      setIsOpen(true);
    });
  });
}
