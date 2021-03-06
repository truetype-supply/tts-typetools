import { useState } from "react";

export type PaginationIndicator = {
    onClick: () => void;
    type: string | number;
    page: string | number;
    selected: boolean;
    disabled: boolean;
};

const boundaryCount = 1;

function range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}

export const usePagination = <T extends unknown>(
    data: T[],
    itemsPerPage: number,
    siblingCount?: number
) => {
    const newSiblingsCount = siblingCount ? siblingCount : 0;
    const [page, setCurrentPage] = useState<number>(1);
    const count = Math.ceil(data.length / itemsPerPage);

    function currentData() {
        const begin = (page - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    const paginationData = currentData();

    const next = () => setCurrentPage((prev) => Math.min(prev + 1, count));
    const prev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const jump = (toPage: number) => {
        const pageNumber = Math.max(1, toPage);
        setCurrentPage(() => Math.min(pageNumber, count));
    };

    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(
        Math.max(count - boundaryCount + 1, boundaryCount + 1),
        count
    );

    const siblingsStart = Math.max(
        Math.min(
            page - newSiblingsCount,
            count - boundaryCount - newSiblingsCount * 2 - 1
        ),
        boundaryCount + 2
    );

    const siblingsEnd = Math.min(
        Math.max(
            page + newSiblingsCount,
            boundaryCount + newSiblingsCount * 2 + 2
        ),
        endPages[0] - 2
    );

    const buttonPage = (type: string) => {
        switch (type) {
            case "first":
                return 1;
            case "prev":
                return page - 1;
            case "next":
                return page + 1;
            case "last":
                return count;
            default:
                return 1;
        }
    };

    const itemList = [
        // ...["first"],
        ...["prev"],
        ...startPages,
        ...(siblingsStart > boundaryCount + 2
            ? ["start-ellipsis"]
            : boundaryCount + 1 < count - boundaryCount
            ? [boundaryCount + 1]
            : []),
        ...range(siblingsStart, siblingsEnd),
        ...(siblingsEnd < count - boundaryCount - 1
            ? ["end-ellipsis"]
            : count - boundaryCount > boundaryCount
            ? [count - boundaryCount]
            : []),
        ...endPages,
        ...["next"],
        // ...["last"],
    ];

    const paginationIndicators: PaginationIndicator[] = itemList.map((item) => {
        return typeof item === "number"
            ? {
                  onClick: () => setCurrentPage(item),
                  type: "page",
                  page: item,
                  selected: item === page,
                  disabled: false,
              }
            : {
                  onClick: () => setCurrentPage(buttonPage(item)),
                  type: buttonPage(item),
                  page: item,
                  selected: false,
                  disabled:
                      item.indexOf("ellipsis") === -1 &&
                      (item === "next" || item === "last"
                          ? page >= count
                          : page <= 1),
              };
    });

    return {
        paginationData,
        paginationIndicators,
        page,
        maxPage: count,
        jump,
        next,
        prev,
    };
};
