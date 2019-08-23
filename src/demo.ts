import {render} from 'react-dom'
import { createElement as e, memo } from 'react'
import ProjectColumn from './components/ProjectColumn'
import ProjectContainer from './components/ProjectContainer'

const node = document.getElementById('project-root');
const data = [
  [{title: "Hello World", text: "What a nice day."}],
  [{title: "Nice to meet you", text: "I like your shoes."}]
]

function renderer(props) {
    const className = 'demo-card'
    const h1 = e('h1', {}, props.title)
    const body = e('p', {}, props.text)
    return e('div', {className}, h1, body)
}

const board = e(ProjectContainer, {data, renderer});
render(board, node)

