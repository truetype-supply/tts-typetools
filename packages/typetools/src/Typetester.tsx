import type { TypetesterState, TypetesterAction } from "./types";
import type { Dispatch, FC } from "react";
import React, { createContext, useContext, useReducer } from "react";
import { INITIAL_TYPETESTER } from "./lib/contants";

interface ContextTypetester {
    state: TypetesterState;
    dispatch: Dispatch<TypetesterAction>;
    readonly initialState: TypetesterState;
}

const ContextTypetester = createContext<ContextTypetester>({
    state: INITIAL_TYPETESTER,
    dispatch: (val) => val,
    initialState: INITIAL_TYPETESTER,
});

export const useTypetester = () => useContext(ContextTypetester);

type ProviderTypetesterProps = {
    initialState: TypetesterState;
};
export const ProviderTypetester: FC<ProviderTypetesterProps> = ({
    children,
    initialState,
}) => {
    const reducers = (state: TypetesterState, action: TypetesterAction) => {
        switch (action.type) {
            case "text":
                return { ...state, [action.type]: action.payload };
            case "textReset":
                return { ...state, text: initialState.text };
            case "textAlign":
                return { ...state, [action.type]: action.payload };
            case "letterCase":
                return { ...state, [action.type]: action.payload };
            case "fontSize":
                return { ...state, [action.type]: action.payload };
            case "fontLeading":
                return { ...state, [action.type]: action.payload };
            case "fontTracking":
                return { ...state, [action.type]: action.payload };
            case "fontOutline":
                return { ...state, [action.type]: !state.fontOutline };
            case "resetAll":
                return action.payload === true ? initialState : state;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducers, initialState);

    return (
        <ContextTypetester.Provider value={{ state, dispatch, initialState }}>
            {children}
        </ContextTypetester.Provider>
    );
};
