import NfcScan from "../../DB/models/nfcScanModel.js";
import CustomError from "../../utilities/customError.js";

/**
 * Get all NFC scans with pagination
 * GET /api/v1/nfc
 */
export const getAllScans = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        // Optional date filtering
        const filter = {};
        if (req.query.startDate) {
            filter.timestamp = { $gte: new Date(req.query.startDate) };
        }
        if (req.query.endDate) {
            filter.timestamp = {
                ...filter.timestamp,
                $lte: new Date(req.query.endDate)
            };
        }
        if (req.query.tagId) {
            filter.tagId = req.query.tagId;
        }

        const [scans, total] = await Promise.all([
            NfcScan.find(filter)
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            NfcScan.countDocuments(filter),
        ]);

        return res.status(200).json({
            success: true,
            data: scans,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }
};

/**
 * Get NFC scan statistics
 * GET /api/v1/nfc/stats
 */
export const getStats = async (req, res, next) => {
    try {
        const [totalScans, uniqueIps, scansByTag, recentScans] = await Promise.all([
            // Total scan count
            NfcScan.countDocuments(),

            // Unique IP addresses
            NfcScan.distinct("ip"),

            // Scans grouped by tag
            NfcScan.aggregate([
                {
                    $group: {
                        _id: "$tagId",
                        count: { $sum: 1 },
                        lastScan: { $max: "$timestamp" },
                    },
                },
                { $sort: { count: -1 } },
            ]),

            // Recent 5 scans
            NfcScan.find()
                .sort({ timestamp: -1 })
                .limit(5)
                .lean(),
        ]);

        // Get scans from last 7 days for chart
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailyScans = await NfcScan.aggregate([
            {
                $match: {
                    timestamp: { $gte: sevenDaysAgo },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalScans,
                uniqueVisitors: uniqueIps.length,
                uniqueTags: scansByTag.length,
                scansByTag,
                dailyScans,
                recentScans,
            },
        });
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }
};

/**
 * Get scans by tag ID
 * GET /api/v1/nfc/tag/:tagId
 */
export const getScansByTag = async (req, res, next) => {
    try {
        const { tagId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const [scans, total] = await Promise.all([
            NfcScan.find({ tagId })
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            NfcScan.countDocuments({ tagId }),
        ]);

        return res.status(200).json({
            success: true,
            data: scans,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }
};

/**
 * Delete a scan by ID
 * DELETE /api/v1/nfc/:id
 */
export const deleteScan = async (req, res, next) => {
    try {
        const { id } = req.params;

        const scan = await NfcScan.findByIdAndDelete(id);

        if (!scan) {
            return next(new CustomError("Scan not found", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Scan deleted successfully",
        });
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }
};

/**
 * Delete all scans (admin only)
 * DELETE /api/v1/nfc/all
 */
export const deleteAllScans = async (req, res, next) => {
    try {
        const result = await NfcScan.deleteMany({});

        return res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} scans`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }
};
