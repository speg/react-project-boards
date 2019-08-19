import { createElement as e, memo } from 'react'


const DragBox = memo(function DragBox(props) {
  const onDragStart = (ev) => {
    console.log('Dragbox DragStart', ev);
    ev.projectBoard = {id: 42}
  }

  return e('div', {className: 'dragbox', draggable: true, onDragStart}, props.children);
})

export default DragBox
