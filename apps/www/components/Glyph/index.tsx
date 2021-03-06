import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useGlyph, useFont, Glyph as GlyphType } from "@pulipola/typetools";
import { usePagination, PaginationIndicator } from "lib/hooks/usePagination";
import { Grid } from "components/Layouts";
import { Header } from "./Header";
import { List } from "./List";

interface ContextGlyphDisplayProps {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;

    pagination: {
        data: GlyphType[];
        currentPage: number;
        maxPage: number;
        indicators: PaginationIndicator[];
        next: () => void;
        prev: () => void;
        jump: (p: number) => void;
    };
}

const initialState: ContextGlyphDisplayProps = {
    search: "",
    setSearch: (val) => val,
    pagination: {
        data: [],
        currentPage: 1,
        maxPage: 1,
        indicators: [],
        next: () => ({}),
        prev: () => ({}),
        jump: () => ({}),
    },
};

const ContextGlyphDisplay = createContext<ContextGlyphDisplayProps>(
    initialState
);
export const useGlyphDisplay = () => useContext(ContextGlyphDisplay);

export const Glyph = () => {
    const [search, setSearch] = useState("");
    const { font } = useFont();
    const { glyphs } = useGlyph();
    const filteredGlyph = glyphs.filter(({ character, name }) => {
        const newRegex = new RegExp(search, "gi");
        return character?.match(newRegex) || name.match(newRegex);
    });

    const {
        currentPage,
        paginationData,
        maxPage,
        pages,
        jump,
        next,
        prev,
    } = usePagination(filteredGlyph, 100);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: "smooth"
        });
    }, [currentPage, font]);

    useEffect(() => {
        if (!font) return;
        if (filteredGlyph.length === 0) return;
        setSearch("");
        jump(1);
    }, [font]);

    const glyphDisplayState = {
        search,
        setSearch,
        pagination: {
            data: paginationData,
            currentPage,
            maxPage,
            indicators: pages,
            next,
            prev,
            jump,
        },
    };

    return (
        <ContextGlyphDisplay.Provider value={glyphDisplayState}>
            <Grid section="Glyphs" style={{ position: "relative" }}>
                <Header />
                <List />
            </Grid>
        </ContextGlyphDisplay.Provider>
    );
};
