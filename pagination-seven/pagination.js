class Pagination {
    constructor(totalPages, currentPage) {
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    pagination() {
        if (this.totalPages <= 7) {
            return this.paginateSevenOrLess();
        } else {
            return this.paginateMoreThanSeven();
        }
    }

    paginateSevenOrLess() {
        let pagination = '';
        for (let i = 1; i <= this.totalPages; i++) {
            if (i === this.currentPage) {
                pagination += `(${i}) `;
            } else {
                pagination += `${i} `;
            }
        }
        return pagination.trim();
    }

    paginateMoreThanSeven() {
        if (this.currentPageIsAtBeginning()) {
            let pagination = [];
            pagination.push(1, 2, 3, 4, 5);
            pagination.push('...');
            pagination.push(this.totalPages);
            pagination = pagination.join(' ');
            pagination = pagination.replace(`${this.currentPage}`, `(${this.currentPage})`)
            return pagination;
        }

        if (this.currentPageIsInTheMiddle()) {
            let pagination = [];
            pagination.push(1);
            pagination.push('...');
            pagination.push(this.currentPage - 1);
            pagination.push(this.currentPage);
            pagination.push(this.currentPage + 1);
            pagination.push('...');
            pagination.push(this.totalPages);
            pagination = pagination.join(' ');
            pagination = pagination.replace(`${this.currentPage}`, `(${this.currentPage})`)
            return pagination;
        }

        if(this.currentPageIsAtTheEnd()) {
            let pagination = [];
            pagination.push(1);
            pagination.push('...');
            pagination.push(this.totalPages - 4);
            pagination.push(this.totalPages - 3);
            pagination.push(this.totalPages - 2);
            pagination.push(this.totalPages - 1);
            pagination.push(this.totalPages);
            pagination = pagination.join(' ');
            pagination = pagination.replace(`${this.currentPage}`, `(${this.currentPage})`)
            return pagination;
        }
    }

    currentPageIsAtBeginning() {
        return this.currentPage < 5;
    }

    currentPageIsAtTheEnd() {
        return this.currentPage > this.totalPages - 5;
    }

    currentPageIsInTheMiddle() {
        return !this.currentPageIsAtBeginning() && !this.currentPageIsAtTheEnd();
    }
}


module.exports = Pagination;