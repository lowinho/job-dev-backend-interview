import { Router } from 'express';
import { ScheduleController } from "../controller/ScheduleController";

const scheduleRoutes = Router();
const scheduleController = new ScheduleController();

scheduleRoutes.get("/", scheduleController.index);
scheduleRoutes.get("/:id", scheduleController.show);
scheduleRoutes.post("/", scheduleController.store);
scheduleRoutes.put("/:id", scheduleController.update);
scheduleRoutes.delete("/:id", scheduleController.delete);

export { scheduleRoutes };
