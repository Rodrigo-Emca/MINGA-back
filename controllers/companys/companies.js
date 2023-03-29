import  Company from '../../models/Company.js'
import  User  from '../../models/User.js'

const controller = {
    create: async (req, res, next) => {
        const { user } = req
        req.body.user_id = req.user._id
        req.body.active = true
        try {
            await Company.create(req.body)
            return res.status(200).json({
                success: true,
                message: 'New company created succesfuly',
                data: req.body
            })
        } catch (error) {
            next(error)
        }
    },
    read_all_active: async (req, res, next) => {
        try {
            let companyActive = await Company.find({ active: true })
            let companyInactive = await Company.find({ active: false })
            return res.status(200).json({
                success: true,
                companyActive,
                companyInactive,
            })
        } catch (error) {
            next(error);
        }
    },
    read_all: async (req, res, next) => {
        try {
            let company = await Company.find()
            if (company) {
                return res.status(200).json({
                    success: true,
                    company,
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Company not found"
                })
            }
        } catch (error) {
            next(error);
        }
    },
    update_active: async (req, res, next) => {
        try {
            let company = await Company.findOneAndUpdate(
                { _id: req.params.id },
                { active: req.body.active },
                { new: true },
            )
            if (company) {
                let user = await User.findOneAndUpdate(
                    { _id: company.user_id },
                    { is_company: req.body.active },
                    { new: true }
                )
                return res.status(200).json({
                    success: true,
                    company,
                })
            } else {
                return res.status(404).json({
                    success: false
                })
            }
        } catch (error) {
            next();
        }
    }
}

export default controller
