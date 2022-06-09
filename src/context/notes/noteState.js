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
  
    return (
        <NoteContext.Provider value={{notes,setnotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;