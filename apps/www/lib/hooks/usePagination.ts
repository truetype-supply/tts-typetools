import { useMemo, useState } from "react";

export type PaginationIndicator = {
    pageIndex: number;
    onClick: () => void;
    activaPage: boolean;
};

export const usePagination = <T extends unknown>(
    data: T[],
    itemsPerPage: number
) => {
    const memoizedData = useMemo(() => data, [data]);

    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(memoizedData.length / itemsPerPage);

    const currentData = () => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return memoizedData.slice(begin, end);
    };
    const paginationData = currentData();

    const next = () => setCurrentPage((prev) => Math.min(prev + 1, maxPage));
    const prev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const jump = (page: number) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage(() => Math.min(pageNumber, maxPage));
    };

    const pageArray = new Array(maxPage).fill(0);
    const pages: PaginationIndicator[] = pageArray.map((_, i) => ({
        pageIndex: i + 1,
        onClick: () => jump(i + 1),
        activaPage: i + 1 === currentPage,
    }));
    // .concat({
    //     pageIndex: maxPage,
    //     onClick: () => jump(maxPage),
    //     activaPage: maxPage === currentPage,
    // });

    return {
        next,
        prev,
        jump,
        currentData,
        currentPage,
        maxPage,
        paginationData,
        pages,
    };
};
