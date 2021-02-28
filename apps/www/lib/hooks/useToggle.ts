import { useState } from "react";

export const useToggle = () => {
    const [show, setShow] = useState(false);
    const toggle = () => setShow((prev) => !prev);
    return { show, toggle, setShow };
};
