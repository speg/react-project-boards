import { createElement as e, useState, useCallback, useMemo, memo } from 'react'
import DragBox from "./DragBox"
import ColumnHeader from "./ColumnHeader"

function dialog(text) {
  // A placeholder for a fancier dialog system. Maybe with a promise?
  // This is probably out of scope.
  return prompt(text)
}

function handleDragOver(ev) {
  ev.preventDefault();
  return false;
}

function cardToBox(renderedCard, index: number) {
  // put the renderedCard into a DragBox
  return e(DragBox, {index}, renderedCard)
}

function ProjectColumn(props) {
  const items = props.cards
  const handleDrop = useCallback(ev => {
    ev.preventDefault();
    const info = JSON.parse(ev.dataTransfer.getData('cardInfo'))
    info.spacerIndex = ev.spacerSlot
    if (info.columnIndex !== props.columnIndex) props.moveItem(info)

    return false
  }, [items.length]);

  const onDragEnd = useCallback(ev => {
     ev.preventDefault();
     return false;
  }, []);

  const onClick =  ev => {
    const title = dialog('New card?')
    if (title) props.addItem({title})
  }

  const boxes = useMemo(() => items.map(cardToBox), [items.length]);

  return e('div', {
          className: 'project-column',
          onDragEnd,
          onDragOver: handleDragOver,
          onDrop: handleDrop
      },
      e(ColumnHeader, {onClick}),
      ...boxes
    );
}

export default memo(ProjectColumn)
