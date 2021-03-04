import { useMemo, useState } from "react";

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

    return {
        next,
        prev,
        jump,
        currentData,
        currentPage,
        maxPage,
        paginationData,
    };
};
