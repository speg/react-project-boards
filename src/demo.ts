import {render} from 'react-dom'
import { createElement as e } from 'react'
import ProjectColumn from './components/ProjectColumn'
import ProjectContainer from './components/ProjectContainer'

const node = document.getElementById('project-root');
const data = [
  [{title:"Hello World"}],
  ["Nice to meet you"]
]
const board = e(ProjectContainer, {data});
render(board, node)

