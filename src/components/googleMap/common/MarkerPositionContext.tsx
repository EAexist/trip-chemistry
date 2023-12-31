import { PropsWithChildren, createContext, useContext } from "react";
import { MarkerPositionList, Position } from "./types";

interface MarkerPositionContextProps {
  positions: MarkerPositionList;
  setPositions: (func: (prev: MarkerPositionList) => MarkerPositionList) => void;
  refPosition: Position | undefined
}

const MarkerPositionContext = createContext<MarkerPositionContextProps>({} as MarkerPositionContextProps);

function MarkerPositionContextProvider({value, children}: PropsWithChildren<{value: MarkerPositionContextProps}>) {
  console.log(`MarkerPositionContextProvider-${JSON.stringify(value)}`);
  return (
      <MarkerPositionContext.Provider value={value}>
          {children}
      </MarkerPositionContext.Provider>
  );
}

const useSetPositions = () => useContext(MarkerPositionContext).setPositions;

export { useSetPositions, MarkerPositionContextProvider };