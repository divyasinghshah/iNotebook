import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const NoteItems = (props) => {
    const context=useContext(noteContext);
    const {deleteNote}=context;
    const { note } = props;
    return (
        <div className='col-md-3'>

            <div className="card" >
                <div class="card-body">
                    <div className="d-flex justify-content-between">
                    <h5 class="card-title">{note.title}</h5>
                    <div>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>deleteNote(note._id)}></i>
                        <i className="fa-solid fa-pen-to-square mx-2"></i>
                    </div>
                    

                    </div>
                  
                    <p class="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItems