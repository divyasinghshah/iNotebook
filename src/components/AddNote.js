import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title:"",description:"",tag:""});
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description,note.tag);
        setnote({title:"",description:"",tag:""});
        props.showAlert("New Note Added","success");
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
                    <input type="text" className="form-control" id="title" name="title" minLength={5} required onChange={onChange} value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" minLength={5} required onChange={onChange} value={note.description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag"  onChange={onChange} value={note.tag}/>
                </div>
                <button className="btn btn-primary" type='submit'disabled={note.title.length<5 || note.description.length<5} onClick={handleClick}>Add Note</button>
            </form>

        </div>
    )
}

export default AddNote;