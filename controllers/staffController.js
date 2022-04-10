const {
    showAllStaffModel,
    addNewStaffModel,
    showStaffByIdModel,
    deleteStaffModel
} = require('../models/staffModel')

const addNewStaffService = (req, res, next) => {
    try {
        const staff = req.body;
        const result = addNewStaffModel(staff)
        res.status(201).json({result})
    } catch (err) {
        next(err)
    }
}

const showAllStaffService = (request, response, next) => {
    showAllStaffModel(request.query)
        .then(res => response.status(200).json(res))
        .catch(err => next(err))
}

const showStaffByIdService = (request, response, next) => {
    const id = request.url.split('/')[2]
    showStaffByIdModel(id)
        .then(({staff_id, birth_date, first_name, last_name, position, salary}) => {
            return response.status(200).json({staff_id, birth_date, first_name, last_name, position, salary})
        })
        .catch(err => next(err))
}


const deleteStaffService = (request, response, next) => {

    const id = request.url.split('/')[2]

    deleteStaffModel(id)
        .then(_ => {
            return response.status(200).json({message: 'Success'})
        })
        .catch(err => next(err))
}

module.exports = {
    addNewStaffService,
    showAllStaffService,
    showStaffByIdService,
    deleteStaffService
}
