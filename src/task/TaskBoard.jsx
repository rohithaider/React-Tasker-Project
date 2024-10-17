import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

export default function TaskBoard() {
  //creating this default data object so that i can initialize it to the tasks initial state instead
  //of undefined.
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to learn react so that I can be a successful front-end developer",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModal(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }
  function handleCloseClick(){
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleDelete(deleteTask){
    setTasks(
      tasks.filter((task)=>{
        return (task.id!== deleteTask.id)
      })
    )
  }

function handleDeleteAll(){
  setTasks(
    tasks.filter(task=>false)
  )
}
function handleFav(taskId){
  const taskIndex = tasks.findIndex(task=> task.id === taskId);
  const newTasks = [...tasks];
  newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite 
  setTasks(newTasks)

}

function handleSearch(searchTerm){
  console.log(searchTerm);
  const filtered = tasks.filter((task)=>{
    return task.title.toLowerCase().includes(searchTerm.toLowerCase())
  })

  setTasks([...filtered])

}



  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal onSave={handleAddEditTask} taskToUpdate={taskToUpdate} onCloseClick={handleCloseClick}/>
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch}/>
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions onAddClick={() => setShowAddModal(true)} onDeleteAll={handleDeleteAll}/>


          {
            tasks.length > 0? <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDelete} onFav={handleFav}/>:<NoTaskFound/>
          }
        </div>
      </div>
    </section>
  );
}
