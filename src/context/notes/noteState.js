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
      const addNote=async(title,description,tag)=>{
          //todo
          const response= await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZTQ4NTJkYWFhOWYzMWM1YjQyMDM3In0sImlhdCI6MTY1NDc4NTM4Mn0.42leA9VXdMtBnyptSnEMmyZOzS-HX1O9cnEUQBPeh9c"
            },
            body:JSON.stringify({title,description,tag})
        });
        const json= await response.json();
        console.log(json);
         
          setnotes(notes.concat(json.notes));

      }

      //Delete Node
      const deleteNote=async(id)=>{
        //TODO API CALL
        const response= await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZTQ4NTJkYWFhOWYzMWM1YjQyMDM3In0sImlhdCI6MTY1NDc4NTM4Mn0.42leA9VXdMtBnyptSnEMmyZOzS-HX1O9cnEUQBPeh9c"
            }
            
        });
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