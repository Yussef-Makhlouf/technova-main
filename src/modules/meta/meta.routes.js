
import { Router } from "express";
import { MQ } from "../../utilities/mq.js"; // In case we want to use queue later, but for now direct import
import { trackMetaEvent } from "./meta.controller.js";

const metaRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Meta CAPI
 *   description: Meta Server-Side API integration
 */

/**
 * @swagger
 * /api/v1/meta/events:
 *   post:
 *     summary: Send an event to Meta Conversions API
 *     tags: [Meta CAPI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventName
 *               - eventId
 *             properties:
 *               eventName:
 *                 type: string
 *               eventId:
 *                 type: string
 *               userData:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *               customData:
 *                 type: object
 *               eventSourceUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event sent successfully
 *       500:
 *         description: Server error
 */
metaRouter.post("/events", trackMetaEvent);

export default metaRouter;
