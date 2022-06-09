import React,{useContext,useEffect} from 'react'
import NoteContext from '../context/notes/noteContext';
export const About = () => {
    const a=useContext(NoteContext);
    useEffect(() => {
      a.update();    
      //eslint-disable-next-line
    }, [])
    
  return (
    <div>About {a.state.name}</div>
  )
}
