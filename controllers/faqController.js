const FAQ = require('../models/faqModel');

const { createFAQValidation } = require('../validations/faqValidation');




exports.createFAQ = async (req, res) => {
    try {
        const { error } = createFAQValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { question, answer } = req.body;

        const newFAQ = new FAQ({ question, answer });

        await newFAQ.save();
        return res.status(201).json({ status: 201, message: 'FAQ created successfully', data: newFAQ });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create FAQ', error: error.message });
    }
};


exports.listFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        return res.status(200).json({ status: 200, message: 'FAQs retrieved successfully', data: faqs });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve FAQs', error: error.message });
    }
};


exports.updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        const updatedFAQ = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });

        if (!updatedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        res.status(200).json({ message: 'FAQ updated successfully', data: updatedFAQ });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update FAQ', error: error.message });
    }
};


exports.deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFAQ = await FAQ.findByIdAndRemove(id);

        if (!deletedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        res.status(200).json({ message: 'FAQ deleted successfully', data: deletedFAQ });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete FAQ', error: error.message });
    }
};
