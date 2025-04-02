import express from "express"
import { postDetails,fetchHomes, getHomeById, deleteHome, updateHome } from "../controllers/homes.controller.js"
import upload from "../middlewares/multer.js";


const router = express.Router()

// router.route('/postdetails').post(upload.fields([{ name: 'image' }, { name: 'thumbnail' }]), postDetails)
router.route('/postdetails').post(upload.array('images', 10), postDetails);
router.route('/fetchdetails').get(fetchHomes)
router.route('/fetchdetail/:id').get(getHomeById)
router.route('/deletedetail/:id').delete(deleteHome)
router.route('/updatedetail/:id').put(upload.array('images', 10), updateHome);


export default router