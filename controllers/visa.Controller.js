const Visa = require('../models/visa.Model')
const { uploadPDF } = require('../utils/Cloudnary')


exports.CreateVisa = async (req, res) => {
    try {
        console.log(req.body)
        const emptyField = []
        const { VisaRecordNumber, PasswordNumber, Country, dateofbirth, VisaStatus, Name, VisaType, Validity, IssuedDate, EnterBefore } = req.body

        if (!VisaRecordNumber) {
            emptyField.push("Please fill the VisaRecordNumber")
        }
        if (!PasswordNumber) {
            emptyField.push("Please fill the PasswordNumber")
        }
        if (!Country) {
            emptyField.push("Please fill the Country")
        }
        if (!dateofbirth) {
            emptyField.push("Please fill the dateofbirth")
        }
        if (!VisaStatus) {
            emptyField.push("Please fill the VisaStatus")
        }
        if (!Name) {
            emptyField.push("Please fill the Name")
        }
        if (!VisaType) {
            emptyField.push("Please fill the VisaType")
        }
        if (!Validity) {
            emptyField.push("Please fill the Validity")
        }
        if (!IssuedDate) {
            emptyField.push("Please fill the IssuedDate")
        }
        if (!EnterBefore) {
            emptyField.push("Please fill the EnterBefore")
        }

        if (emptyField.length > 0) {
            return res.status(400).json({
                success: false,
                message: emptyField.join(', ')
            })
        }


        const visa = await Visa.create({
            VisaRecordNumber,
            PasswordNumber,
            Country,
            dateofbirth,
            VisaStatus,
            Name,
            VisaType,
            Validity,
            IssuedDate,
            EnterBefore
        })
        console.log(req.file, 'my file')
        if (req.file) {
            visa.pdf = req.file.path
        }

        await visa.save()

        return res.status(200).json({
            success: true,
            message: "Visa Created Successfully",
            data: visa
        })

    } catch (error) {
        console.log(error)
    }
}

exports.getAllVisa = async (req, res) => {
    try {
        const visa = await Visa.find()
        if (!visa) {
            return res.status(400).json({
                success: false,
                message: "No Visa Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Visa Found Successfully",
            data: visa
        })
    } catch (error) {
        console.log(error)
    }
}

exports.singleDeleteVisa = async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(_id)
        const visa = await Visa.findByIdAndDelete({ _id: _id });
        if (!visa) {
            return res.status(404).json({
                success: false,
                message: "No Visa Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Visa Deleted Successfully",
            data: visa
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.searchVisa = async (req, res) => {
    try {
        console.log(req.body)
        const { PasswordNumber,VisaRecordNumber } = req.body;
        const visa = await Visa.findOne({
            $or: [
                { VisaRecordNumber: VisaRecordNumber },
                { PasswordNumber: PasswordNumber },
            ]
        });
        

        if (!visa) {
            return res.status(404).json({ message: 'Visa record not found' });
        }

        res.status(200).json({
            success: true,
            message: "Visa Found Successfully",
            data: visa
        });
    } catch (error) {
        console.error('Error searching for visa record:', error);
        res.status(500).json({ message: 'Server error' });
    }
};