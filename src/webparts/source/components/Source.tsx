import * as React from 'react';
import styles from './Source.module.scss';
import type { ISourceProps } from './ISourceProps';
import { ISourceState } from './ISourceState';
//import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, 
//  DropdownMenuItemType, 
  IDropdownStyles, 
  //IDropdownOption 
} from '@fluentui/react/lib/Dropdown';


const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

 
export default class Source extends React.Component<ISourceProps, ISourceState> {
  selectedCity: number;
    constructor(props: ISourceProps | Readonly<ISourceProps>) {
    super(props);
    this.selectedCity = 0;
    this.state = {
      cities: [],
      city: "",
      countries: [],
      country: ""
    };
  }

  public componentDidMount(): void {
    this.setState({
      cities: [{ key: 'chennai', text: 'Chennai' },
      { key: 'mumbai', text: 'Mumbai' },
      { key: 'london', text: 'London' },
      { key: 'paris', text: 'Paris' }],
      countries: [{ key: 'India', text: 'India' },
      { key: 'USA', text: 'USA' },
      { key: 'UK', text: 'UK' }]
    });
  }



  
  public render(): React.ReactElement<ISourceProps> {
   

    return (
      <div className={styles.source}>
        <Dropdown
          label="City"
          options={this.state.cities}
          styles={dropdownStyles}
          onChanged={(_e, selectedCity : number) => {
            this.props.onCityChanged(this.state.cities[selectedCity]);
          }}
        />
        <Dropdown
          label="Country"
          options={this.state.countries}
          styles={dropdownStyles}
          onChanged={(_e, selectedCountry : number) => {
            this.props.onCountryChanged(this.state.countries[selectedCountry]);
          }}
        />
      </div>
    );
  }
}
