import { PropsWithChildren, createContext, useContext } from "react";

const LevelContext = createContext({} as {level:number});

const LevelContextProvider = ({level, children}:PropsWithChildren<{level: number}>) => (
    <LevelContext.Provider
        value = {{level:level}}
    >{children}</LevelContext.Provider>
);

const useLevelContext = () => (
    useContext(LevelContext)
);

export { LevelContextProvider, useLevelContext };
