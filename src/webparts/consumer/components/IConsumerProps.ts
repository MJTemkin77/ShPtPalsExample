import { DynamicProperty } from "@microsoft/sp-component-base";
import { ICity } from "../../../data/ICity";

export interface IConsumerProps {
  description: string;
  city:DynamicProperty<ICity>;
  country:DynamicProperty<ICity>;
}
