import { createElement as e, useState, useCallback, useMemo } from 'react'
import DragBox from "./DragBox"
import AddButton from "./AddButton"

function handleDragOver(ev) {
  ev.preventDefault();
  // console.log('Handling Drag Over', e);
  return false;
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
     ev.dataTransfer.setData("text/plain", ev.target.innerHTML);
     setDragging(ev.target.innerHTML);
     console.log('Starting drag', props.name, ev.target.innerHTML)
   }, [items.length])

   const onDragEnd = useCallback(ev => {
     ev.preventDefault();
     console.log('Drag ended. Remove item!', dragging, items, props.name, ev);
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

  const addItem = useCallback(() => {
      setItems([...items, prompt('New Card?')]);
  }, [items]);

  const boxes = useMemo(() => {
    return items.map(i => e(DragBox, {}, i));
  }, [items.length]);

  console.log('Rendering column', props.name, 'with items:', items, 'and dragging', dragging)
  return e('div', {
          className: 'project-column',
          onDragStart,
          onDragEnd,
          onDragOver: handleDragOver,
          onDrop: handleDrop
      },
      e(AddButton, {onClick: addItem}),
      ...boxes
    );
}

export default ProjectColumn
