import { Router } from "express";
import {
    getAllScans,
    getStats,
    getScansByTag,
    deleteScan,
    deleteAllScans,
} from "./nfc.controller.js";

const nfcRouter = Router();

/**
 * @swagger
 * tags:
 *   name: NFC
 *   description: NFC Scan Tracking & Analytics
 */

/**
 * @swagger
 * /api/v1/nfc:
 *   get:
 *     summary: Get all NFC scans with pagination
 *     tags: [NFC]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page (default 20)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter scans from this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter scans until this date
 *       - in: query
 *         name: tagId
 *         schema:
 *           type: string
 *         description: Filter by NFC tag ID
 *     responses:
 *       200:
 *         description: List of NFC scans
 *       500:
 *         description: Server error
 */
nfcRouter.get("/", getAllScans);

/**
 * @swagger
 * /api/v1/nfc/stats:
 *   get:
 *     summary: Get NFC scan statistics
 *     tags: [NFC]
 *     responses:
 *       200:
 *         description: NFC statistics including total scans, unique visitors, scans by tag
 *       500:
 *         description: Server error
 */
nfcRouter.get("/stats", getStats);

/**
 * @swagger
 * /api/v1/nfc/tag/{tagId}:
 *   get:
 *     summary: Get scans for a specific NFC tag
 *     tags: [NFC]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *         description: The NFC tag identifier
 *     responses:
 *       200:
 *         description: List of scans for the tag
 *       500:
 *         description: Server error
 */
nfcRouter.get("/tag/:tagId", getScansByTag);

/**
 * @swagger
 * /api/v1/nfc/{id}:
 *   delete:
 *     summary: Delete a specific scan
 *     tags: [NFC]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The scan document ID
 *     responses:
 *       200:
 *         description: Scan deleted successfully
 *       404:
 *         description: Scan not found
 *       500:
 *         description: Server error
 */
nfcRouter.delete("/:id", deleteScan);

/**
 * @swagger
 * /api/v1/nfc/all:
 *   delete:
 *     summary: Delete all scans (admin only)
 *     tags: [NFC]
 *     responses:
 *       200:
 *         description: All scans deleted
 *       500:
 *         description: Server error
 */
nfcRouter.delete("/all", deleteAllScans);

export default nfcRouter;
