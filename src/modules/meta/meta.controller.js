
import { sendMetaEvent } from "../../utilities/meta-capi.js";

/**
 * Handle Meta Event Request
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const trackMetaEvent = async (req, res, next) => {
    try {
        const { eventName, eventId, userData, customData, eventSourceUrl, testEventCode } = req.body;

        // Basic Validation
        if (!eventName || !eventId) {
            return res.status(400).json({ success: false, message: "Missing required fields: eventName, eventId" });
        }

        // Add server-side derived data if missing from frontend
        const enrichedUserData = {
            ...userData,
            clientIp: userData?.clientIp || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            userAgent: userData?.userAgent || req.headers['user-agent']
        };

        const result = await sendMetaEvent({
            eventName,
            eventId,
            userData: enrichedUserData,
            customData,
            eventSourceUrl,
            testEventCode
        });

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error("Meta API Controller Error:", error);
        // Don't block the frontend if tracking fails, just log it.
        // But for this API endpoint, we return the error state.
        res.status(500).json({ success: false, message: "Failed to send event to Meta", error: error.message });
    }
};
