const CareerApplication = require('../models/CareerApplication');
const fs = require('fs');
const path = require('path');

exports.submitApplication = async (req, res) => {
    try {
        const requiredFields = ['firstName', 'lastName', 'email', 'interests'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                missingFields
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        if (req.body.consent !== true && req.body.consent !== 'true') {
            return res.status(400).json({
                success: false,
                message: 'You must agree to the terms'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Resume file is required'
            });
        }

        const { firstName, lastName, email, phone, interests } = req.body;
        
        const application = new CareerApplication({
            firstName,
            lastName,
            email,
            phone: phone || null,
            interests,
            resumePath: `/uploads/resumes/${req.file.filename}`,
            consent: true
        });

        await application.save();

        res.status(201).json({ 
            success: true, 
            message: 'Application submitted successfully!',
            data: {
                id: application._id,
                firstName: application.firstName,
                lastName: application.lastName,
                email: application.email
            }
        });

    } catch (error) {
        if (req.file) {
            fs.unlink(path.join(__dirname, '../public', req.file.path), err => {
                if (err) console.error('Error deleting file:', err);
            });
        }

        console.error('Error submitting application:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error'
        });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await CareerApplication.find()
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error'
        });
    }
};