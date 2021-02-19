import styles from "./aside.module.scss";
import { AsideContent } from "./Content";
import { AsideFooter } from "./Footer";
import { AsideHeader } from "./Header";

export const Aside = () => {
    return (
        <aside className={styles.container}>
            <div className={styles.sticky}>
                <AsideHeader />
                <AsideContent />
                <AsideFooter />
            </div>
        </aside>
    );
};
