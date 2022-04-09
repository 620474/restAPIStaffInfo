const db = require('../db/db.js')

const addNewStaffModel = ({birth_date, first_name, last_name, position, salary}) => {
    return db('staff')
        .insert({
            birth_date: birth_date,
            first_name: first_name,
            last_name: last_name,
            position: position,
            salary: salary
        });
}

const showAllStaffModel = async ({sortBy, page = 1, sortByTitle = 'salary', filterBy,filterByValue}) => {
    let result

    console.log(filterBy,filterByValue)

    if (!filterBy) {
        result = await db('staff')
            .select()
            .orderBy(sortByTitle, sortBy);
    }

    if (filterBy) {
        result = await db('staff')
            .select()
            .orderBy(sortByTitle, sortBy)
            .where(filterBy, filterByValue)
    }

    const limit = 25;
    let paginationPagesQuantity = Math.ceil(result.length / 25);
    let paginationsPages = []
    for (let i = 1; i <= paginationPagesQuantity; i++) {
        paginationsPages.push(i)
    }
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
    return {
        result: results,
        pages: paginationsPages
    }
}

const showStaffByIdModel = async (id) => {
    const result = await db('staff')
        .where('staff_id', id);
    return result[0];
}

const deleteStaffModel = async (id) => {
    await db('staff')
        .where('staff_id', id)
        .del()

    return 'success'
}


module.exports = {
    showAllStaffModel,
    addNewStaffModel,
    showStaffByIdModel,
    deleteStaffModel
}
