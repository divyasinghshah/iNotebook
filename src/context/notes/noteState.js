import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState=(props)=>{
    const initialNotes=[
        {
          "_id": "62a2058a847b332ae5d39391",
          "user": "629e4852daaa9f31c5b42037",
          "title": "sdvndsodv",
          "description": "sodveovjoerjmgve",
          "tag": "study",
          "date": "2022-06-09T14:36:58.216Z",
          "__v": 0
        },
        {
          "_id": "62a2058b847b332ae5d39393",
          "user": "629e4852daaa9f31c5b42037",
          "title": "sdvndsodv",
          "description": "sodveovjoerjmgve",
          "tag": "study",
          "date": "2022-06-09T14:36:59.855Z",
          "__v": 0
        },
        {
          "_id": "62a2058f847b332ae5d39395",
          "user": "629e4852daaa9f31c5b42037",
          "title": "sdvndsodvsdg",
          "description": "sodveovjoerjmgve",
          "tag": "study",
          "date": "2022-06-09T14:37:03.771Z",
          "__v": 0
        }
      ];
      const [notes, setnotes] = useState(initialNotes);
      //Add note
      const addNote=(title,description,tag)=>{
          //todo
          const note={
            "_id": "62a2058f847b332ae5d39395",
            "user": "629e4852daaa9f31c5b42037",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-06-09T14:37:03.771Z",
            "__v": 0
          };
          setnotes(notes.concat(note));

      }

      //Delete Node
      const deleteNote=(id)=>{
        //TODO API CALL
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setnotes(newNotes);
          
    }


      // Edit Node
      const editNote=()=>{
          
    }

  
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;