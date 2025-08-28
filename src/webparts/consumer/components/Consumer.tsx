/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';
import styles from './Consumer.module.scss';
import type { IConsumerProps } from './IConsumerProps';


import { IConsumerState } from './IConsumerState';
import { ICity } from '../../../data/ICity';
export default class Consumer extends React.Component<IConsumerProps, IConsumerState> {

  constructor(props: IConsumerProps | Readonly<IConsumerProps>) {
    super(props);
    this.state = {
      temperature: "",
      city: "",
      country: ""
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async componentDidMount() {

    const { city, country } = this.props;
    const cityData: ICity | undefined = city.tryGetValue();
    const countryData: ICity | undefined = country.tryGetValue();
    console.log(cityData);
    console.log(countryData);
    //debugger;

    const temp = cityData ? await this.getTemperature(cityData.key) : await this.getTemperature("Chennai");
    // eslint-disable-next-line no-unused-expressions
    cityData ? this.setState({ city: cityData.key }) : this.setState({ city: "chennai" });
    this.setState({
      temperature: temp.main.temp,
      country: countryData ? countryData.key : "India",
      city: cityData ? cityData.key : "chennai"
    });
  }

  public getTemperature = async (cityName:string): Promise<any> => {
    
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d067cb9214c75b57b78285f2c5bfad10`)
      .then(res => res.json())
      .then(res => {
        return res;
      })
  }

  public async componentDidUpdate?(prevProps: IConsumerProps, prevState: IConsumerState, snapshot: any): Promise<void> {
    

    console.log(this.props);
    const { city, country } = this.props;
    const cityData: ICity | undefined = city.tryGetValue();
    const countryData: ICity | undefined = country.tryGetValue();
    //const { city } = this.props;
    //const cityData: ICity | undefined = city.tryGetValue();
    console.log(cityData);
    console.log(countryData);
    if (cityData !== undefined && prevState.city !== cityData.text) {
      //const temp = await this.getTemperature(cityData.key);
      this.setState({
       // temperature: temp.main.temp,
        city:cityData.text
       // country: ""
      });
    }
    if (countryData !== undefined && prevState.country !== countryData.text) {
      
      this.setState({
        country:countryData.text
      });
    }

  }

  public render(): React.ReactElement<IConsumerProps> {
    return (
      <div className={ styles.consumer }>
         <div> Temperature in the City {this.state.city} is {this.state.temperature}</div>
         <div> Country name is {this.state.country}</div>
      </div>
    );
  }


}
