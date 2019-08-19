import {render} from 'react-dom'
import { createElement as e } from 'react'

const node = document.getElementById('project-root');

const Box = props => e('div', {}, 'Demo!')

render(e(Box, {}), node)

