import Box from "./components/Box"

import {render} from 'react-dom'
import { createElement as e } from 'react'

const node = document.getElementById('project-root');

render(e(Box, {}), node)

