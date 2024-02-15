import { Router } from "express";
import { isAuthenticated, isOwner } from "../middlewares";
import { createNewResearch, deleteResearch, fetchResearch, getAllResearches, updateResearch } from "../controllers/researches";

export default (router: Router) => {
    //GET
    router.get('/researches', isAuthenticated, getAllResearches);
    router.get('/research/:id', isAuthenticated, fetchResearch);

    //POST
    router.post('/research/create', isAuthenticated, createNewResearch);

    //PATCH
    router.patch('/research/update/:id', isAuthenticated, isOwner, updateResearch);

    //DELETE
    router.delete('/research/delete/:id', isAuthenticated, isOwner, deleteResearch);
    
}