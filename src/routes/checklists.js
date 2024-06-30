
const express = require("express");
const Checklist = require("../models/checklist");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const checklists = await Checklist.find({});
        res.status(200).render("checklists/index", {checklists});
    } catch(error){
        res.status(500).render("pages/error", {error: "Erro ao exibir as listas!"});
    }
});

router.get("/new", async (req, res) => {
    try {
        const checklist = new Checklist();
        res.status(200).render("checklists/new", {checklist});
    } catch (error) {
        res.status(500).render("pages/error", {error: "Erro ao carregar formulário!"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id);
        res.status(200).render("checklists/show", {checklist});
    } catch(error){
        res.status(422).render("pages/error", {error: "Erro ao exibir lista de tarefas!"});
    }
});

router.get("/:id/edit", async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id);
        res.status(200).render("checklists/edit", {checklist});
    } catch (error) {
        res.status(422).render("pages/error", {error: "Erro ao exibir a edição de lista de tarefas!"});
    }
});

router.post("/", async (req, res) => {
    const { name } = req.body.checklist;
    const checklist = new Checklist({name});
    
    try{
        await checklist.save();
        res.status(200).redirect("/checklists");
    } catch(error){
        res.status(422).render("checklists/new", {checklists: {...checklist, error}});
    }
});

router.put("/:id", async (req, res) => {
   const { name } = req.body.checklist;
   const checklist = await Checklist.findById(req.params.id);

   try {
    await checklist.updateOne({name});
    res.redirect("/checklists");
   } catch (error) {
    const errors = error.errors;
    res.status(422).render("checklists/edit", {checklist: {...checklist, error: errors}});
   }
});

router.delete("/:id", async (req, res) => {
    try{
        const checklist = await Checklist.findByIdAndDelete(req.params.id);
        res.redirect("/checklists");
    } catch(error){
        res.status(422).render("pages/error", {error: "Erro ao deletar a lista de tarefas!"});
    }
});

module.exports = router;