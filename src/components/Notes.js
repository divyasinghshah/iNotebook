import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItems from './NoteItems';
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    getNotes();

  }, []);
  const ref = useRef(null);
  const refClose=useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({ id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

  }

  const [note, setnote] = useState({ id:"",etitle: "", edescription: "", etag: "" });
  
  const handleClick = (e) => {
    
    console.log("Updating the note",note);
    editNote(note.id,note.etitle,note.edescription,e.tag);
    refClose.current.click();

  }
  const onChange = (e) => {
    //whatever changes update that
    setnote({ ...note, [e.target.name]: e.target.value });

  }


  return (
    <div className="row my-3">
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Node</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
               
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary"  onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <h2>My Notes</h2>
      {notes.map((note) => {
        return <NoteItems key={note._id} updateNote={updateNote} note={note} />
      })}
    </div>
  )
}

export default Notes