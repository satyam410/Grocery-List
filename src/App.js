import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const[name , setName] =useState('');
  const[alert , setAlert]=useState({
    show:false,
    type:"",
    msg:""
  });
  const [list, setList] = useState([]);
  const[isedit, setisEdit] =useState(false);
  const[editID,setEditID] =useState(null);

  const handleSubmit =(e) =>{
    if(!name){
      showAlert(true,"danger","Please add an item");
    }
    else if(name && isedit){
      console.log(list)
      setList(list.map((item) => {
        if(item.id === editID){
          return {...item , name:name}
        }
        return item;
      }))
      setName('')
      setEditID(null)
      setisEdit(false);
      showAlert(true,"success","Value added" )
    }
    else{
      showAlert(true,"success","item Added")
      const newItems = {id:new Date().getTime().toString(), name}
      setList([...list,newItems]);
      setName('')

    }
    
    e.preventDefault();
  }

  const showAlert = (show=false ,type="",msg="") => {
    setAlert({show , type , msg});
  }
  const removeAll =()  =>{
    
    showAlert(true,"danger","Empty List")
    setList([]);
  }
  const removeItem = (id) => {
    showAlert(true,"danger","Item is removed")
    setList(list.filter((item) => item.id !== id))

  }
  const editItem =(id) => {
    const specificItem = list.find((item) => item.id === id)
    console.log(specificItem)
    setisEdit(true);
    setEditID(id);
    setName(specificItem.name)
  }

  return <>
    <section className="section-center">
      <form  className="grocery-form" onSubmit={handleSubmit} >
     {alert && <Alert {...alert} removeAlert={showAlert} list={list} />}  
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input type="text" value={name} placeholder="ex: eggs"
          onChange={(e)=> setName(e.target.value)} 
            className="grocery"
          />
          <button className='submit-btn'>{isedit ?  'edit':'submit' }</button>
        </div>
      </form>
      {list.length > 0 &&(
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem}  />
        <button className="clear-btn" onClick={removeAll}>Clear</button>
      </div>
      )}

    </section>
  </>
}

export default App
