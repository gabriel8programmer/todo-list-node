const taskModel = require("../models/task-model");

module.exports = {

    new: async (req, res)=> {
        try {
            const task = await taskModel.prepareNewTask()
            res.status(200).render("tasks/new", {checklistId: req.params.id, task});
        } catch (error) {
            res.status(422).render("pages/error", {error: "Erro ao criar nova tarefa!"});
        }
    },

    add: (req, res)=> {
        const { name } = req.body.task;
        const task = new Task({ name, checklist: req.params.id });
    
        try {
            const checklist = taskModel.createTask(task)
            res.redirect(`/checklists/${checklist._id}`);
        } catch (error) {
            const errors = error.errors;
            res.status(422).render("/tasks/new", {task: {...task, errors}, checklistId: req.params.id})
        }
    },

    delete: (req, res)=> {
        try {
            const checklist = taskModel.deleteTask(req.params.id)
            res.redirect(`/checklists/${checklist._id}`);
        } catch (error) {
            res.status(422).render("pages/error", {error: "Erro ao remover a tarefa!"});
        }
    },

    update: (req, res)=> {
        const id = req.params.id
        const { task } = req.body
        try {
            const task = taskModel.updateTask(id, task)
            res.status(200).json({task});
        } catch (error) {
            const errors = error.errors;
            res.status(422).json({task: {...errors}});
        }
    }

}