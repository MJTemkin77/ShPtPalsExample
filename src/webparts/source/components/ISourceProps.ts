import { ICity } from "../../../data/ICity";

export interface ISourceProps {
  description: string;
  onCityChanged:(city:ICity) => void;
}
