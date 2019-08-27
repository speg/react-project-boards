import { createElement as e, memo, useState } from 'react'
import ProjectColumn from "./ProjectColumn"
import { useCardsInColumns } from "../hooks/cards"

function ProjectContainer(props) {
  const cardRenderer = memo(props.renderer)    // useMemo this memo 🤔
  const columns = useCardsInColumns(props.data, cardRenderer)

  return e('div', {className: 'project-container'}, columns);
}

export default ProjectContainer
