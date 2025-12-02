import { careerModel } from "../../DB/models/careersModel.js";
import { careerApplicationModel } from "../../DB/models/careerApplicationsModel.js";
import CustomError from "../../utilities/customError.js";
import imagekit from "../../utilities/imagekitConfigration.js";
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);


export const createCareer = async (req, res, next) => {
    console.log("swsa");
    console.log(req.body);

    try {
        const { title_ar, title_en, department_ar, department_en, location_ar, location_en, type_ar, type_en, description_ar, description_en, requirements, responsibilities } = req.body;

        // Ensure arrays
        const requirementsArray = Array.isArray(requirements) ? requirements : [];
        const responsibilitiesArray = Array.isArray(responsibilities) ? responsibilities : [];

        const newCareer = new careerModel(
            {
                title_ar,
                title_en,
                department_ar,
                department_en,
                location_ar,
                location_en,
                type_ar,
                type_en,
                description_ar,
                description_en,
                requirements: requirementsArray,
                responsibilities: responsibilitiesArray
            }
        );

        await newCareer.save();

        res.status(201).json({ message: "Career created successfully", career: newCareer });
    } catch (error) {
        res.status(500).json({ message: "Error creating career", error: error.message });
    }
};

export const getCareers = async (req, res, next) => {
    try {
        const careers = await careerModel.find();


        if (!careers) {
            return next(new CustomError("No careers found", 404));
        }

        res.status(200).json({ success: true, message: "Careers retrieved successfully", careers });
    } catch (error) {
        return next(new CustomError("Error retrieving careers", 500));
    }
};

export const getCareerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const career = await careerModel.findById(id);
        if (!career) {
            return next(new CustomError("Career not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Career retrieved successfully",
            career
        });
    } catch (error) {
        return next(new CustomError("Error retrieving career", 500));
    }
};

export const updateCareer = async (req, res, next) => {

    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedCareer = await careerModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedCareer) {
            return next(new CustomError("Career not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "Career updated successfully",
            career: updatedCareer
        });
    } catch (error) {
        return next(new CustomError("Error updating career", 500));
    }
};

export const deleteCareer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCareer = await careerModel.findByIdAndDelete(id);

        if (!deletedCareer) {
            return next(new CustomError("Career not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Career deleted successfully",
            deletedCareer
        });

    } catch (error) {
        return next(new CustomError("Error deleting career", 500));
    }
};

export const multyDeleteCareer = async (req, res, next) => {
    const { ids } = req.body; // Expecting an array of IDs in the request body

    if (!Array.isArray(ids) || ids.length === 0) {
        return next(new CustomError("Please provide an array of IDs to delete", 400));
    }

    const Jobs = await careerModel.find({ _id: { $in: ids } });

    if (Jobs.length === 0) {
        return next(new CustomError("No Jobs found for the provided IDs", 404));
    }

    await careerModel.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
        success: true,
        message: "Jobs deleted successfully",
    });
};

export const applyToCareer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, phone, coverLetter } = req.body;

        // Validate career exists
        const career = await careerModel.findById(id);
        if (!career) {
            return next(new CustomError("Career position not found", 404));
        }

        // Validate required fields
        if (!name || !email || !phone) {
            return next(new CustomError("Name, email, and phone are required", 400));
        }

        // Validate file upload
        if (!req.file) {
            return next(new CustomError("Resume file is required", 400));
        }

        // Generate unique ID for this application
        const applicationId = nanoid();

        // Upload resume to ImageKit
        const uploadResult = await imagekit.upload({
            file: req.file.buffer,
            fileName: `${name.replace(/\s+/g, '_')}_${applicationId}_${req.file.originalname}`,
            folder: `${process.env.PROJECT_FOLDER}/CareerApplications/${applicationId}`,
        });

        // Create application record
        const application = new careerApplicationModel({
            careerId: id,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            resumeUrl: uploadResult.url,
            coverLetter: coverLetter || ""
        });

        await application.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application: {
                id: application._id,
                name: application.name,
                email: application.email,
                appliedAt: application.appliedAt
            }
        });
    } catch (error) {
        console.error("Error in applyToCareer:", error);
        return next(new CustomError(error.message || "Error submitting application", 500));
    }
};