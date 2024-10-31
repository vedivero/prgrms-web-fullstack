import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.css';

const initialData = [
   { id: 'blue', name: 'Quinn Ergon' },
   { id: 'red', name: 'Little Cato' },
   { id: 'green', name: 'Avocato' },
   { id: 'purple', name: 'Mooncake' },
   { id: 'orange', name: 'Ash Graven' },
   { id: 'yellow', name: 'H.U.E.' },
];

function App() {
   const [characters, setCharacters] = useState(initialData);

   useEffect(() => {
      console.log(characters);
   }, [characters]);

   const handleEnd = (result) => {
      if (!result.destination) return;

      const items = Array.from(characters);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setCharacters(items);
   };

   return (
      <div className='App'>
         <header className='App-header'>
            <h1>React Beautiful DnD</h1>
            <DragDropContext onDragEnd={handleEnd}>
               <Droppable droppableId='characters'>
                  {(provided) => (
                     <ul className='characters' {...provided.droppableProps} ref={provided.innerRef}>
                        {characters.map(({ id, name }, index) => (
                           <Draggable key={id} draggableId={id} index={index}>
                              {(provided) => (
                                 <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                 >
                                    <p>{name}</p>
                                 </li>
                              )}
                           </Draggable>
                        ))}
                        {provided.placeholder}
                     </ul>
                  )}
               </Droppable>
            </DragDropContext>
         </header>
      </div>
   );
}

export default App;
