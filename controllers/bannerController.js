const Banner = require('../models/bannerModel');

const { createBannerValidation } = require('../validations/bannerValidation');



exports.createBanner = async (req, res) => {
    try {
        const { error } = createBannerValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        if (!req.file) {
            return res.status(400).json({ status: 400, error: "Image file is required" });
        }

        const { title, description } = req.body;

        const banner = new Banner({ title, image: req.file.path, description, });

        await banner.save();
        return res.status(201).json({ status: 201, message: 'Banner created successfully', data: banner });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create banner', error: error.message });
    }
};


exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        return res.status(200).json({ status: 200, data: banners });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch banners', error: error.message });
    }
};
