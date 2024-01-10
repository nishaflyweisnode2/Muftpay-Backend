const AboutUs = require('../models/aboutUsModel');

const { createOrUpdateAboutUsValidation } = require('../validations/aboutUsValidation');


exports.createOrUpdateAboutUs = async (req, res) => {
    try {
        const { error } = createOrUpdateAboutUsValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { title, content } = req.body;
        let aboutUs = await AboutUs.findOne();

        if (!aboutUs) {
            aboutUs = new AboutUs({ title, content });
        } else {
            aboutUs.title = title;
            aboutUs.content = content;
        }

        await aboutUs.save();
        return res.status(200).json({ status: 200, message: 'About Us content updated successfully', data: aboutUs });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create/update About Us content', error: error.message });
    }
};


exports.getAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findOne();
        return res.status(200).json({ status: 200, data: aboutUs });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch About Us content', error: error.message });
    }
};
