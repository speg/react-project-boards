import { createElement as e } from 'react'

function AddButton(props){
    const text = props.text || "Add"
    return e('button', {...props}, text);
}

export default AddButton
