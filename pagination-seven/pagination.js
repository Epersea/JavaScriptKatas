class Pagination {

    pages = [];
    ellipsis = '...';

    constructor(totalPages, currentPage) {
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    pagination() {
        if (this.totalPages <= 7) {
            this.includeAllElements();
        } else {
            this.includeSelectedElements();
        }
        this.markCurrentPage();
        return this.pages.join(' ');
    }

    includeAllElements() {
        for (let i = 1; i <= this.totalPages; i++) {
            this.pages.push(i);
        }
    }

    includeSelectedElements() {
        if (this.currentPageIsAtTheBeginning()) {
            this.pages.push(1, 2, 3, 4, 5);
            this.pages.push(this.ellipsis);
            this.pages.push(this.totalPages);
        }

        else if(this.currentPageIsAtTheEnd()) {
            this.pages.push(1);
            this.pages.push(this.ellipsis);
            this.includeLastPages()
        }

        else {
            this.pages.push(1);
            this.pages.push(this.ellipsis);
            this.includeMiddlePages();
            this.pages.push(this.ellipsis);
            this.pages.push(this.totalPages);
        }
    }

    currentPageIsAtTheBeginning() {
        return this.currentPage < 5;
    }

    currentPageIsAtTheEnd() {
        return this.currentPage > this.totalPages - 4;
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
        this.pages = this.pages.map((element) => {
            return element === this.currentPage? element = `(${this.currentPage})` : element;
        })
    }

}

module.exports = Pagination;