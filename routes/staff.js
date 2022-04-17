const {
    addNewStaffService,
    showAllStaffService,
    showStaffByIdService,
    deleteStaffService
} = require('../services/staffServices')

const addNewStaff = (req, res, next) => {
    try {
        const staff = req.body;
        const result = addNewStaffService(staff)
        res.status(201).json({result})
    } catch (err) {
        next(err)
    }
}

const showAllStaff = (request, response, next) => {
    showAllStaffService(request.query)
        .then(res => response.status(200).json(res))
        .catch(err => next(err))
}

const showStaffById = (request, response, next) => {
    const id = request.url.split('/')[2]
    showStaffByIdService(id)
        .then(({staff_id, birth_date, first_name, last_name, position, salary}) => {
            return response.status(200).json({staff_id, birth_date, first_name, last_name, position, salary})
        })
        .catch(err => next(err))
}


const deleteStaff = (request, response, next) => {

    const id = request.url.split('/')[2]

    deleteStaffService(id)
        .then(_ => {
            return response.status(200).json({message: 'Success'})
        })
        .catch(err => next(err))
}

module.exports = {
    addNewStaff,
    showAllStaff,
    showStaffById,
    deleteStaff
}
