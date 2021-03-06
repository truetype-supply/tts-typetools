import styles from "./header.module.scss";
import { useGlyphDisplay } from "../index";

export const Search = () => {
    const { search, setSearch } = useGlyphDisplay();
    return (
        <>
            <div className={styles.search}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Glyphs"
                />
            </div>
        </>
    );
};
