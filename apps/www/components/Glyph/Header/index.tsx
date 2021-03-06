import styles from "./header.module.scss";
import { useGlyphDisplay } from "..";
import { Pagination } from "./Pagination";
import { Search } from "./Search";

export const Header = () => {
    const { totalGlyphs, searchResults } = useGlyphDisplay();
    return (
        <header className={styles.container}>
            <Search />
            <Pagination />

            <div className={styles.counter}>
                <span>
                    {searchResults} / {totalGlyphs}
                </span>
            </div>
        </header>
    );
};
