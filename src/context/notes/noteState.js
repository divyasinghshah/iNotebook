import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState=(props)=>{
    const host="http://localhost:5000";
    const initialNotes=[ ];
      const [notes, setnotes] = useState(initialNotes);
      //getNotes
      const getNotes=async()=>{
        const response= await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZTQ4NTJkYWFhOWYzMWM1YjQyMDM3In0sImlhdCI6MTY1NDc4NTM4Mn0.42leA9VXdMtBnyptSnEMmyZOzS-HX1O9cnEUQBPeh9c"
            }
            
        });
        const json=await response.json();
        console.log(json);
        setnotes(json);
      }
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
      const editNote= async (id,title,description,tag)=>{
        const response= await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZTQ4NTJkYWFhOWYzMWM1YjQyMDM3In0sImlhdCI6MTY1NDc4NTM4Mn0.42leA9VXdMtBnyptSnEMmyZOzS-HX1O9cnEUQBPeh9c"
            },
            body:JSON.stringify({title,description,tag})
        });
        const json=response.json();
        for(let i=0;i<notes.length;i++){
            const element=notes[i];
            if(element._id===id){
                element.title=title;
                element.description=description;
                element.tag=tag;
            }

        }
          
    }

  
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;