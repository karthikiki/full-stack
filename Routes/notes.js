import express from "express"
import { Notes } from "../models/notes.js";

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        const notes = await Notes.find().populate("user", "name email")
        if (!notes) {
            return res.status(400).json({ message: "Couldn't find any Info" })
        }
        res.status(200).json({
            message: "Sucessfully got your data",
            data: notes
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/user", async (req, res) => {
    try {
        const notes = await Notes
            .find({ user: req.user._id })
            .populate("user", "name email")
        if (!notes) {
            return res.status(400).json({ message: "Couldn't any Document" })
        }
        res.status(200).json({ message: "Sucessfully got your data", data: notes })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/add", async (req, res) => {
    // new date logic
    try {
        const postedDate = new Date().toJSON().slice(0, 10);
        const notes = await new Notes(
            {
                ...req.body,
                date: postedDate,
                user: req.user._id
            }
        ).save()
        if (!notes) {
            return res.status(400).json({ message: "Error in saving the notes" })
        }
        res.status(200).json({ message: "Notes saved Successfully", data: notes })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.put("/edit/:id", async (req, res) => {
    try {
        const updatedNotes = await Notes.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (!updatedNotes) {
            return res
                .status(400)
                .json({ message: "Error Occured" })
        }
        res.status(200).json({ message: "Sucessfully updated", data: updatedNotes })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const deletedNotes = await Notes.findByIdAndDelete({
            _id: req.params.id
        })
        if (!deletedNotes) {
            return res
                .status(400)
                .json({ message: "Error Occured" })
        }
        res.status(200).json({ message: "Sucessfully Deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

export const notesRouter = router