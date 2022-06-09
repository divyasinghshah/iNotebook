import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItems from './NoteItems';
const Notes = () => {
    const context=useContext(noteContext);
    const {notes}=context;
  return (
    <div className="row my-3">
        <AddNote/>
    <h2>My Notes</h2>
        {notes.map((note)=>{
        return <NoteItems note={note}/>
    })}
</div>
  )
}

export default Notes