import { createElement as e, memo, useState } from 'react'
import ProjectColumn from '../components/ProjectColumn'

export const useCardsInColumns = function useCardsInColumns(rawCardData, renderer) {
    // Given some raw card data: [[{}],[{}], ...]
    // and a renderer.

    // Return an array of project columns, each filled with an array of rendered data which have callbacks for moving
    // and adding.

    const [data, setData] = useState(() => {
        let count = 0
        return rawCardData.map(column => column.map(item => {item._id = count; count++; return item}))
    })

    const [nextIndex, setNext] = useState(() => rawCardData.reduce((acc, cur) => acc + cur.length, 0))

    const columnsOfCards = data.map((columnItems, columnIndex) => {
        const moveItem = item => {
          setData(prevState => {
              const oldColumn = item.columnIndex
              if (oldColumn === columnIndex) return prevState

              const newState = prevState.map(c => c.map(i => i))    // need to copy the old state so we have a new object. OR DO WE?!
              if (item.spacerIndex !== false) {
                // splice it in
                newState[columnIndex].splice(item.spacerIndex + 1, 0, item)
              } else {
                newState[columnIndex] = [...prevState[columnIndex], item] // add the new item to this column
              }

              // remove item from old column
              newState[oldColumn] = prevState[oldColumn].filter(i => i._id !== item._id)
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
        const cards = columnItems.map(cardInfo => e(renderer, {...cardInfo, columnIndex}))
        return e(ProjectColumn, {key: columnIndex, cards, moveItem, columnIndex, addItem})
    })

    return columnsOfCards
}