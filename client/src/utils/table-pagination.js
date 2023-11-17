const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
}

const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}

const nextPage = (currentPage, totalPages, setCurrentPage) => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
}

const prevPage = (currentPage, setCurrentPage) => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
}

export {
    calculateRange,
    sliceData,
    nextPage,
    prevPage
};
