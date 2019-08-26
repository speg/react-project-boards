import { createElement as e, memo, useState } from 'react'
import ProjectColumn from "./ProjectColumn"

function ProjectContainer(props) {
  const cardRenderer = memo(props.renderer)    // useMemo this memo 🤔
  const [data, setData] = useState(() => {
    let count = 0
    return props.data.map(column => column.map(item => {item._id = count; count++; return item}))
  })
  const [nextIndex, setNext] = useState(() => props.data.reduce((acc, cur) => acc + cur.length, 0))
  const children = data.map((columnItems, columnIndex) => {
      // Each column is an array of columnItems.
      const moveItem = newItem => {
          setData(prevState => {
              const newState = prevState.map(c => c.map(i => i))    // need to copy the old state so we have a new object. OR DO WE?!
              newState[columnIndex] = [...prevState[columnIndex], newItem] // add the new item to this column
              const oldColumn = newItem.columnIndex
              newState[oldColumn] = prevState[oldColumn].filter(i => i._id !== newItem._id)
              return newState
          })
      }
      const addItem = newItem => {
          setData(prevState => {
              const newState = prevState.map(c => c.map(i => i))    // need to copy the old state so we have a new object. OR DO WE?!
              newState[columnIndex] = [...prevState[columnIndex], {...newItem, _id: nextIndex}]
              return newState
          })
          setNext(nextIndex + 1)
      }

      const cards = columnItems.map(cardInfo => e(cardRenderer, {...cardInfo, columnIndex}))

      return e(ProjectColumn, {key: columnIndex, cards, moveItem, columnIndex, addItem})
    })

  return e('div', {className: 'project-container'}, children);
}

export default ProjectContainer
