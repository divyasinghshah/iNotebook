import React from 'react'

const NoteItems = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3'>

            <div className="card" >
                <div class="card-body">
                    <div className="d-flex justify-content-between">
                    <h5 class="card-title">{note.title}</h5>
                    <div>
                        <i className="fa-solid fa-trash-can mx-2"></i>
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