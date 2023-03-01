# The challenge

This kata recreates a pagination system for a webpage, with the following requirements:

- The user should be able to see the first and last pages.

- The current page should be highlighted (in this case, using parentheses).

- The user should be able to navigate to the previous and next pages, where possible.

- The pagination should have 7 elements maximum, including ellipsis (represented here by three dots).


# Notes

I tried to simplify the system so all cases followed the previous rules while avoiding excessive complexity. In the end, I came up with the following classification of scenarios:

- If the total number of pages is 7 or less, all pages are shown.

- If the total number of pages is more than 7, the elements to display depend on the current page's position:

    - At the beginning (first 4 pages): the first 5 pages are shown, then an ellipsis, then the last one.

    - At the end (last 4 pages): the first page is shown, then an ellipsis, then the last 5 ones.

    - In the middle: the first page is shown, then and ellipsis, then the previous, current and next, an ellipsis and the last page.

As always, I tried to focus on clarity when naming variables and functions.
