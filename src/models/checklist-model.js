
const mongoose = require("mongoose")
const { checklistSchema } = require("./Schema.js")

const Checklist = mongoose.model("Checklist", checklistSchema) 

module.exports = {

    getAllChecklists: async ()=> {
        const checklists = await Checklist.find({}).populate("tasks");
        return checklists
    },

    getChecklistById: async (id)=> {
        const checklist = await Checklist.findById(id).populate("tasks");
        return checklist
    },

    prepareNewChecklist: ()=> {
        const checklist = new Checklist()
        return checklist
    },

    prepareEditChecklist: async (id)=> {
        const checklist = await Checklist.findById(id)
        return checklist
    },

    createChecklist: async ({name})=> {
        const checklist = new Checklist({name});
        await checklist.save();
        return checklist
    },

    updateChecklist: (id, checklistUpdated)=> {
        const { name } = checklistUpdated
        const checklist = this.getChecklistById(id)
        checklist.updateOne({name})
        return checklist
    },

    deleteChecklist: async (id)=> {
        const checklist = await Checklist.findByIdAndDelete(id);
        return checklist
    }

}