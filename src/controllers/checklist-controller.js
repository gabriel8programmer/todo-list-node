const checklistModel = require("../models/checklist-model");

module.exports = {

    index: async (req, res)=> {
        try {
            const checklists = await checklistModel.getAllChecklists()
            res.status(200).render("checklists/index", {checklists});
        } catch(error){
            res.status(500).render("pages/error", {error: "Erro ao exibir as listas!"});
        }
    },

    new: async (req, res)=> {
        try {
            const checklist = await checklistModel.prepareNewChecklist()
            res.status(200).render("checklists/new", {checklist});
        } catch (error) {
            res.status(500).render("pages/error", {error: "Erro ao carregar formulário!"});
        }
    },

    show: async (req, res)=> {
        try {
            const checklist = await checklistModel.getChecklistById(req.params.id)
            res.status(200).render("checklists/show", {checklist});
        } catch(error){
            res.status(422).render("pages/error", {error: "Erro ao exibir lista de tarefas!"});
        }
    },

    edit: async (req, res)=> {
        try {
            const checklist = await checklistModel.prepareEditChecklist(req.params.id)
            res.status(200).render("checklists/edit", {checklist});
        } catch (error) {
            res.status(422).render("pages/error", {error: "Erro ao exibir a edição de lista de tarefas!"});
        }
    },

    add: (req, res)=> {
        try{
            checklistModel.createChecklist(req.body.checklist)
            res.status(200).redirect("/checklists");
        } catch(error){
            res.status(422).render("checklists/new", {checklists: {...checklist, error}});
        }
    },

    update: (req, res)=> {
        const id = req.params.id
        const {checklist} = req.body
        try {
            checklistModel.updateChecklist(id, checklist)
            res.redirect("/checklists");
        } catch (error) {
            const errors = error.errors;
            res.status(422).render("checklists/edit", {checklist: {...checklist, error: errors}});
        }
    },

    delete: (req, res)=> {
        try{
            checklistModel.deleteChecklist(req.params.id)
            res.redirect("/checklists");
        } catch(error){
            res.status(422).render("pages/error", {error: "Erro ao deletar a lista de tarefas!"});
        }
    }
    
}