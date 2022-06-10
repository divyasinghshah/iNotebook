import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState=(props)=>{
    const host="http://localhost:5000";
    const initialNotes=[];
      const [notes, setnotes] = useState(initialNotes);
      //getNotes
      const getNotes=async()=>{
        const response= await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            }
            
        });
        const json=await response.json();
       
        setnotes(json);
      }

      //Add note
      const addNote=async(title,description,tag)=>{
          //todo
          const response= await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json= await response.json();        
         
          setnotes(notes.concat(json));

      }

      //Delete Node
      const deleteNote=async(id)=>{
        //TODO API CALL
        const response= await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            }
            
        });
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setnotes(newNotes);
          
    }


      // Edit Node
      const editNote= async (id,title,description,tag)=>{
        const response= await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json=await response.json();
        let newNotes=JSON.parse(JSON.stringify(notes));
        for(let i=0;i<newNotes.length;i++){
            const element=newNotes[i];
            if(element._id===id){
                newNotes[i].title=title;
                newNotes[i].description=description;
                newNotes[i].tag=tag;
                break;
            }
            

        }
        setnotes(newNotes);
          
    }

  
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;