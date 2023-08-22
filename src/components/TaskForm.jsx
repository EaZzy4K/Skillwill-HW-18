import { useState } from "react"

const TaskForm = ({onFormSubmit}) => {
    const [taskName, setTaskName] = useState();

    const onSubmit = (e) => {
        e.preventDefault()
        onFormSubmit(taskName)

    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Add Task" 
                    onChange={e => setTaskName(e.target.value)}
                    />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default TaskForm
