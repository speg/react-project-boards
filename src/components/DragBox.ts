import { createElement as e, memo } from 'react'


function DragBox(props) {
  const onDragStart = (ev) => {
    const info = JSON.stringify({...props.children.props})
    ev.dataTransfer.setData("cardInfo", info)
  }
  return e('div', {className: 'dragbox', draggable: true, onDragStart}, props.children);
}

export default memo(DragBox)
