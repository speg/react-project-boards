'use strict';

const e = React.createElement;

function say(what) {
  return () => console.log(what);
}

function handleDragOver(e) {
  e.preventDefault();
  // console.log('Handling Drag Over', e);
  return false;
}

function handleDrag(e) {
  e.dataTransfer.setData("text/plain", "Dragging some text!");
}

function handleDrop(e) {
  e.preventDefault();
  console.log('Handling Drop', e.dataTransfer.getData("text/plain"));
  return false;
}

function ProjectContainer(props) {
  return e('div', {className: 'project-container'}, props.children);
}

function DragBox(props) {
  // console.log('rendering dragbox!')
  return e('div', {className: 'dragbox', draggable: true}, props.children);
  // return e('div', {className: 'dragbox', draggable: true, onDragStart: handleDrag}, props.children);
}

// function onDragEnd(e) {
//   console.log('drag ended', e)
// }

function AddButton(props){
    const text = props.text || "Add"
    return e('button', {...props}, text);
}

function ProjectColumn(props) {
  const [items, setItems] = React.useState(() => [...props.cards]);
  const [dragging, setDragging] = React.useState(() => null); // the current item being moved

  const handleDrop = React.useCallback(e => {
    e.preventDefault();
    setItems([...items, e.dataTransfer.getData('text/plain')]);
    return false;
    }, [items.length]);

   const onDragStart = React.useCallback(e => {
     e.dataTransfer.setData("text/plain", e.target.innerHTML);
     setDragging(e.target.innerHTML);
     console.log('Starting drag', props.name, e.target.innerHTML)
   }, [items.length])

   const onDragEnd = React.useCallback(e => {
     e.preventDefault();
     console.log('Drag ended. Remove item!', dragging, items, props.name, e);
     if (items.findIndex(i => i === dragging) >= 0) {
        let searching = true;
        setItems(items.filter(i => {
            if (searching && i === dragging) {
                searching = false;
                return false;
            }
            return true;
        }))
     }
     else {
         console.warn('Tried to remove item from column but it did not exist.')
     }
     setDragging(null);
     return false;
   }, [items.length, dragging]);

  const addItem = React.useCallback(() => {
      setItems([...items, prompt('New Card?')]);
  }, [items]);

  const boxes = React.useMemo(() => {
    return items.map(i => e(DragBox, {}, i));
  }, [items.length]);

  console.log('Rendering column', props.name, 'with items:', items, 'and dragging', dragging)
  return e('div', {
          className: 'project-column',
          onDragStart,
          onDragEnd,
          onDragOver: handleDragOver,
          onDrop: handleDrop
      },
      e(AddButton, {onClick: addItem}),
      ...boxes
    );
}

const domContainer = document.querySelector('#project-root');
const column1 = e(ProjectColumn, {cards: ["Hello World"], name: "first"});
const column2 = e(ProjectColumn, {cards: [], name: "second"});
const boards = e(ProjectContainer, {}, column1, column2);
ReactDOM.render(boards, domContainer);
