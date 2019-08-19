import { createElement as e } from 'react'
import ProjectColumn from "./ProjectColumn"

function ProjectContainer(props) {
  const children = props.data.map(cards => e(ProjectColumn, {cards}))
  return e('div', {className: 'project-container'}, children);
}

export default ProjectContainer
