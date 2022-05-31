import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items , removeItem , editItem}) => {
  return <>
    {items.map((item) => {
      const{id, name} = item;
      return(
        <div className="grocery-list" key={id}>
          <article className="grocery-item" >
            <p className="title">{name}</p>
          
          <div className="btn-container">
            <button className="edit-btn"
            onClick={() => editItem(id)}>
              <FaEdit />
            </button>
            <button className="delete-btn" onClick={()=>removeItem(id)} >
              <FaTrash />
            </button>
          </div>
          </article>
        </div>
      )
    })}
  </>
}

export default List
