import React from "react"
export default function Header({
    showError,
    changeHandler,
    isEdit,
    Edit,
    addToDos,
    inputValue
}) {
    return (
        <div className="main-header-container">
            <div className="todo-header">
                <h3 class="title">To Do List</h3>
                <div class="subtitle">
                    Add Your Whole day Work !
                </div>
                {showError &&
                    <div className="error">Can't add empty to dos!</div>
                }
            </div>
            <div className="input-container">
                <input id="input-field" className="Input-field"  type="text" placeholder=" Add Todo's "
                    name="itemName"
                    onChange={(e) => changeHandler(e)}
                    value={inputValue.itemName}
                />
                <button className="button"
                    onClick={isEdit ? Edit : addToDos}
                > 
                    {isEdit ? 'Update' : '+'}
                </button>
            </div>
        </div>
    )
}