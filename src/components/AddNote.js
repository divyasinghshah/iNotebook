import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title:"",description:"",tag:"default"});
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description,note.tag);
    }
    const onChange=(e)=>{
        //whatever changes update that
        setnote({...note,[e.target.name]:e.target.value});

    }
    return (
        <div className="container my-3">
            <h2>Add Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description"  onChange={onChange} />
                </div>
                <button className="btn btn-primary" type='submit' onClick={handleClick}>Submit</button>
            </form>

        </div>
    )
}

export default AddNote;