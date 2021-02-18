import { AsideContent } from "./Content";
import { AsideFooter } from "./Footer";
import { AsideHeader } from "./Header";

export const Aside = () => {
    return (
        <aside
            style={{
                width: "var(--aside-width)",
                backgroundColor: "var(--aside-backround)",
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <AsideHeader />
                <AsideContent />
                <AsideFooter />
            </div>
        </aside>
    );
};
