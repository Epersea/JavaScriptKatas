class Pagination {
    constructor(totalPages, currentPage) {
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    pages = [];
    ellipsis = '...';

    pagination() {
        if (this.totalPages <= 7) {
            this.includeAllElements();
        } else {
            this.includeSelectedElements();
        }
        this.markCurrentPage();
        return this.pages;
    }

    includeAllElements() {
        for (let i = 1; i <= this.totalPages; i++) {
            this.pages.push(i);
        }
    }

    includeSelectedElements() {
        if (this.currentPageIsAtBeginning()) {
            this.pages.push(1, 2, 3, 4, 5);
            this.pages.push(this.ellipsis);
            this.pages.push(this.totalPages);
        }

        if (this.currentPageIsInTheMiddle()) {
            this.pages.push(1);
            this.pages.push(this.ellipsis);
            this.includeMiddlePages();
            this.pages.push(this.ellipsis);
            this.pages.push(this.totalPages);
        }

        if(this.currentPageIsAtTheEnd()) {
            this.pages.push(1);
            this.pages.push(this.ellipsis);
            this.includeLastPages()
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

    includeMiddlePages() {
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
            this.pages.push(i)
        }
    }

    includeLastPages() {
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
            this.pages.push(i);
        }
    }

    markCurrentPage() {
        this.pages = this.pages.join(' ')
        this.pages = this.pages.replace(`${this.currentPage}`, `(${this.currentPage})`)
    }

}


module.exports = Pagination;