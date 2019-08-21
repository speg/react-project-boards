import { createElement as e, useState, useCallback, useMemo } from 'react'
import DragBox from "./DragBox"
import AddButton from "./AddButton"

function dialog(text) {
  // A placeholder for a fancier dialog system. Maybe with a promise?
  // This is probably out of scope.
  return prompt(text)
}

function handleDragOver(ev) {
  ev.preventDefault();
  return false;
}

function cardToBox(cardInfo) {
  let title;
  switch (typeof cardInfo) {
    case "string":
      title = cardInfo
      break;
    case "object":
      title = cardInfo.title || "UNTITLED"
      break;
    default:
      title = "EMPTY"
      break;
  }

  return e(DragBox, {}, title)
}

function ProjectColumn(props) {
  const [items, setItems] = useState(() => [...props.cards]);
  const [dragging, setDragging] = useState(() => null); // the current item being moved

  const handleDrop = useCallback(ev => {
    ev.preventDefault();
    setItems([...items, ev.dataTransfer.getData('text/plain')]);
    return false;
    }, [items.length]);

   const onDragStart = useCallback(ev => {
     ev.dataTransfer.setData("text/plain", ev.target.innerText);
     setDragging(ev.target.innerText);
   }, [items.length])

   const onDragEnd = useCallback(ev => {
     ev.preventDefault();
     if (items.findIndex(i => i === dragging) >= 0) {
        let searching = true;
        setItems(items.filter(i => {
            if (searching && i === dragging) {
                searching = false;
                return false;
            }
            return true;
        }))
     }
     else {
         console.warn('Tried to remove item from column but it did not exist.')
     }
     setDragging(null);
     return false;
   }, [items.length, dragging]);

  const onClick = useCallback(() => setItems([...items, dialog('New card?')]), [items]);
  const boxes = useMemo(() => items.map(cardToBox), [items.length]);

  return e('div', {
          className: 'project-column',
          onDragStart,
          onDragEnd,
          onDragOver: handleDragOver,
          onDrop: handleDrop
      },
      e(AddButton, {onClick}),
      ...boxes
    );
}

export default ProjectColumn
