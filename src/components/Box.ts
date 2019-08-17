import { useState, createElement as e } from 'react';

const Box = props => {
    const [count, setCount] = useState(0);

    return e('div', {onClick: e => setCount(c => c + 1)}, count, 'This is a pretty box.');
}

export default Box;
