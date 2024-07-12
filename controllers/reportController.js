const Report = require('../models/report');
const User = require('../models/user');
const Asset = require('../models/asset');
const AssetHistory = require('../models/assetHistory');

exports.generateReport = async (req, res) => {
    try {
        const { userIdentifier } = req.body;
        const user = await User.findOne({
            $or: [
                { name: userIdentifier },
                { email: userIdentifier }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userAssets = await Asset.find({ assigned_to: user.name });
        const userAssetHistory = await AssetHistory.find({ user_id: user._id });

        const reportData = {
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                age: user.age,
                gender: user.gender
            },
            assets: userAssets,
            assetHistory: userAssetHistory
        };

        const newReport = new Report({
            type: 'User Report',
            data: reportData,
            generatedBy: req.user.id
        });

        await newReport.save();
        res.status(201).json({ message: 'Report generated successfully', report: newReport });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: 'Error generating report' });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().populate('generatedBy', 'name');
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Error fetching reports' });
    }
};

exports.downloadReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id).populate('generatedBy', 'name');
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        console.error('Error downloading report:', error);
        res.status(500).json({ message: 'Error downloading report' });
    }
};
