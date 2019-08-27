import { createElement as e, memo } from 'react'
import AddButton from './AddButton'

function ColumnHeader (props) {
    const add = e(AddButton, {...props}, 'Add')
    return e('div', {className: 'column-header'}, add)
}

export default memo(ColumnHeader)