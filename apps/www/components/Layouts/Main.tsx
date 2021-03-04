import type { FC } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

export const Main: FC = ({ children }) => {
    const { pathname } = useRouter();
    return (
        <>
            <main
                style={{
                    color: "var(--accents-16)",
                    backgroundColor: "var(--accents-1)",
                    borderLeft: "1px solid",
                }}
            >
                <header
                    className="app-header"
                    style={{
                        justifyContent: "flex-start",
                        gap: "var(--grid-gap)",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "var(--accents-2)",
                        zIndex: 10,
                    }}
                >
                    <NextLink href="/">
                        <a
                            data-active={pathname === "/"}
                            style={{
                                color:
                                    pathname === "/"
                                        ? "currentcolor"
                                        : "var(--accents-6)",
                            }}
                        >
                            Typetester
                        </a>
                    </NextLink>
                    <NextLink href="/glyph">
                        <a
                            data-active={pathname === "/glyphs"}
                            style={{
                                color:
                                    pathname === "/glyph"
                                        ? "currentcolor"
                                        : "var(--accents-6)",
                            }}
                        >
                            Glyph
                        </a>
                    </NextLink>
                </header>
                {children}
            </main>
        </>
    );
};
