import { Position as GoogleMapPosition } from "google-map-react";

// interface GoogleMapPosition extends Position{};
interface Position{
    x:number, y:number
};
type MarkerPositionList = (Position | undefined)[][];

export type { 
    GoogleMapPosition, Position, MarkerPositionList
}
