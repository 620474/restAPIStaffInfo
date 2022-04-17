const {
    showAllStaffModel,
    addNewStaffModel,
    showStaffByIdModel,
    deleteStaffModel
} = require('../models/staffModel');

const showAllStaffService = (props) => {
    return showAllStaffModel(props);
}

const addNewStaffService = (props) => {

    return addNewStaffModel(props);
}

const showStaffByIdService = (id) => {
    return showStaffByIdModel(id);
}

const deleteStaffService = (id) => {
    return deleteStaffModel(id);
}

module.exports = {
    addNewStaffService,
    showAllStaffService,
    showStaffByIdService,
    deleteStaffService
}
