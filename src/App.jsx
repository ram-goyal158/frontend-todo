import { useState } from "react"
import ToDo from "./components/ToDo"
import { useEffect} from "react"
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi"


function App() {//database
    const[toDo, setToDo]=useState([])
    const[text, setText]=useState("")
    const[isUpdating, setIsUpdating]=useState(false)
    const[toDoId, setToDoId]=useState([])

    useEffect(()=>{//database
      getAllToDo(setToDo)
    }, [])
     
    const updateMode=(_id, text)=>{
      setIsUpdating(true)
      setText(text)
      setToDoId(_id)
    }

  return (
    <>
      <div>
       <div className="container">

      <h1>ToDo App</h1>
      <div className="top">

        <input
         type="text"
          placeholder="Add ToDos..." 
          value={text}
          onChange={(e)=>setText(e.target.value)}
          />
        <div
         className="add" 
         onClick={isUpdating ?
          ()=>updateToDo(toDoId, text, setToDo, setText, setIsUpdating):
         ()=>addToDo(text, setText, setToDo)}>
          {isUpdating? "update" : "Add"}
          </div>
      </div>
      <div className="list">
        {toDo.map((item)=> <ToDo 
        key={item._id} 
        text={item.text}
        updateMode={()=>updateMode(item._id, item.text)}
        deleteToDo={()=>deleteToDo(item._id, setToDo)}/>)}

      </div>
       </div>
      </div>
      
    </>
  )
}

export default App
