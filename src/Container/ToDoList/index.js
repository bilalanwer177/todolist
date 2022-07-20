import React from "react"
import { useEffect, useState } from "react"
import Header from "./Views/temp"
import '../../Styles/todo.css'


// 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
export function ToDoList() {
    // function : state, Object
    const [inputValue, setInputValue] = useState({
        itemName: '',
        isEdited: false,
        createdAt: new Date(),
        id: Math.random() * 1000,
    })
    const [isEdit, setIsEdit] = useState(false)
    const [editedIndex, setEditedIndex] = useState('')
    const [showError, setShowError] = useState(false)
    const [todoItems, setToDoItems] = useState([])
    // const a = 5
    // const b = a

    useEffect(() => {
        let storedTodos = localStorage.getItem('todos')
        storedTodos ? setToDoItems(JSON.parse(storedTodos)) : setToDoItems([])
    }, [])


    const addToDos = () => {
        if
            (inputValue.itemName === '') { setShowError(true) }
        else {
            let tempData = [...todoItems] // Spread Operater to Spread reference from one value to 2nd value to diffreciate the forcefully relation from Values.
            tempData.push(inputValue)
            setToDoItems(tempData)
            setInputValue({ ...inputValue, itemName: '' })
            localStorage.setItem('todos', JSON.stringify(tempData))
            setShowError(false)
        }
    }
    // console.log(todoItems)
    const changeHandler = (event) => {
        let name = event.target.name
        let value = event.target.value
        setInputValue({ ...inputValue, [name]: value })
    }
    let dlt = (index) => {
        let tempData = [...todoItems]
        tempData.splice(index, 1)
        setToDoItems(tempData)
        // console.log(index)   
        localStorage.setItem('todos', JSON.stringify(tempData)) // stringfy to convert JSON from JS

    }
    let editHandler = (index) => {
        let tempData = [...todoItems]
        setInputValue({ ...inputValue, itemName: tempData[index].itemName })
        setIsEdit(true)
        setEditedIndex(index)
        // tempData.splice(index, 1, inputValue)
        // setToDoItems(tempData)
        // console.log(index)   
        // localStorage.setItem('todos', JSON.stringify(tempData)) // stringfy to convert JSON from JS
    }
    let Edit = () => {
        if
            (inputValue.itemName === '') {
            setShowError(true)
        }
        else {
            let tempData = [...todoItems]
            tempData.splice(editedIndex, 1, inputValue)
            //  console.log(tempData.indexOf(inputValue.itemName))   
            setToDoItems(tempData)
            // console.log(index)   
            localStorage.setItem('todos', JSON.stringify(tempData)) // stringfy to convert JSON from JS
            setInputValue({ ...inputValue, itemName: '' })
            setIsEdit(false)
            setShowError(false)
        }
    }

    return (
        // setToDoItems([...todoItems, inputValue])
        <div>
            <div>
                <div class="form">
                <Header
                    showError={showError}
                    changeHandler={changeHandler}
                    inputValue={inputValue}
                    isEdit={isEdit}
                    Edit={Edit}
                    addToDos={addToDos}
                />
                    {/* <div class="title">To Do List</div> */}
                    {/* <div class="subtitle">Add Your Whole day Work !</div> */}
                 
                    <ul>
                        {
                            todoItems.map((item, index) => <li className="todos" key={item.itemName + index}>
                                <div className="div-items">{item.itemName}</div>
                                <div className="icons"><button className="delete-btn" onClick={() => dlt(index)}>x</button>
                                <button className="edit-btn" onClick={() => editHandler(index)}>     Edit</button>
                                </div>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
      )
}
