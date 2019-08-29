import { createElement as e, memo, useState } from 'react'



function Spacer(props) {
  const [grow, setGrow] = useState(false)
  const onDragOver = ev => {
    ev.preventDefault();
    return false
  }

  const onDragEnter = ev => {
    setGrow(true)
  }

  const onDragLeave = ev => {
    setGrow(false)
  }

  const onDrop = ev => {
    // if dropped directly on a spacer: moveItem to that slot. bypassing column drop handler
    ev.preventDefault()
    setGrow(false)
    const info = JSON.parse(ev.dataTransfer.getData('cardInfo'))
    ev.spacerSlot = props.slotIndex
    return false
  }

  const className = 'pb-spacer' + (grow ? ' grow' : '')
  return e('div', {className, onDragOver, onDrop, onDragEnter, onDragLeave})
}


function DragBox(props) {
  const onDragStart = (ev) => {
    const info = JSON.stringify({...props.children.props})
    ev.dataTransfer.setData("cardInfo", info)
  }

    const spacer = e(Spacer, {className: 'pb-spacer', slotIndex: props.index})

  return e('div', {className: 'dragbox', draggable: true, onDragStart, index: props.index}, props.children, spacer);
}

export default memo(DragBox)
