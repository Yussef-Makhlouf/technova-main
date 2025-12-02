import { Router } from "express"
import * as careerCon from "./jobs.controller.js";
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utilities/allowedExtensions.js";

const careerRouter = Router();

careerRouter.post("/", careerCon.createCareer);
careerRouter.get("/", careerCon.getCareers);
careerRouter.get("/:id", careerCon.getCareerById);
careerRouter.put("/:id", careerCon.updateCareer);
careerRouter.delete("/:id", careerCon.deleteCareer);
careerRouter.post("/multy", careerCon.multyDeleteCareer);

// Career application endpoint with file upload
careerRouter.post("/:id/apply",
    multerCloudFunction(allowedExtensions.Document).single('resume'),
    careerCon.applyToCareer
);

export default careerRouter;
