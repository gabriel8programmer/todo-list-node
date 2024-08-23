
const mongoose = require("mongoose")
const { taskSchema, checklistSchema } = require("./Schema.js")

const Task = mongoose.model("Task", taskSchema)
const Checklist = mongoose.model("Checklist", checklistSchema)

module.exports = {

    getTaskById: async (id)=> {
        const task = await Task.findById(id)
        return task
    },

    prepareNewTask: ()=> {
        const task = new Task()
        return task
    },

    createTask: async ({name}, checklistId)=> {
        const task = new Task({ name, checklist: checklistId });
        await task.save();
        const checklist = await Checklist.findById(checklistId);
        checklist.tasks.push(task);
        await checklist.save();
        return checklist
    },

    updateTask: async (id, taskUpdated)=> {
        const task = await Task.findById(id);
        task.set(taskUpdated)
        await task.save();
        return task
    },

    deleteTask: async (id)=> {
        const task = await Task.findByIdAndDelete(id);
        const checklist = await Checklist.findById(task.checklist);
        const taskToRemove = checklist.tasks.indexOf(task._id);
        checklist.tasks.splice(taskToRemove, 1);
        checklist.save();
        return checklist
    }

}