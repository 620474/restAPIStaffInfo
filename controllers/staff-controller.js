const db = require('../db/db.js')

const addNewStaff = async (request, response) => {
    await db('staff')
        .insert({
            birth_date: request.body.birth_date,
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            position: request.body.position,
            salary: request.body.salary
        })
    return response.status(200).json({
        success: true,
        text: 'Success'
    })
}

const showAllStaff = async (request, response) => {
    let {page, sortBy, filterByFirstName, filterByLastName} = request.query;
    let result
    result = await db('staff')
        .select()
        .orderBy('salary', `${sortBy}`)

    const limit = 25;
    let paginationPagesQuantity = Math.ceil(result.length / 25);
    let paginationsPages = []
    for (let i = 1; i <= paginationPagesQuantity; i++) {
        paginationsPages.push(i)
    }
    if (!page) page = 1;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < result.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }
    results.results = result.slice(startIndex, endIndex);
    response.paginatedResults = results;
    return response.status(200).json({
        result: results,
        pages: paginationsPages
    })
}

const showStaffById = async (request, response) => {
    const id = request.url.split('/')[2]
    const result = await db('staff')
        .where('staff_id', id)
    const {staff_id, birth_date, first_name, last_name, position, salary} = result[0]
    return response.status(200).json({staff_id, birth_date, first_name, last_name, position, salary})
}

const deleteStaff = async (request, response) => {
    const id = request.url.split('/')[2]
    await db('staff')
        .where('staff_id', id)
        .del()
    return response.status(200).json("Staff delete")
}

module.exports = {
    showAllStaff,
    addNewStaff,
    showStaffById,
    deleteStaff
}
