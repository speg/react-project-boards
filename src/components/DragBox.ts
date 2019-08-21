import { createElement as e, memo } from 'react'


const DragBox = memo(function DragBox(props) {
  const onDragStart = (ev) => {
    ev.projectBoard = {id: 42}
  }
  const title = e('h1', {}, props.children)
  return e('div', {className: 'dragbox', draggable: true, onDragStart}, title);
})

export default DragBox
