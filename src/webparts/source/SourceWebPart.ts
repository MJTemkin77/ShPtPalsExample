import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SourceWebPartStrings';
import Source from './components/Source';

import { ISourceProps } from './components/ISourceProps';
import { ICity } from '../../data/ICity';

import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';

export interface ISourceWebPartProps {
  description: string;
}

export default class SourceWebPart extends 
BaseClientSideWebPart<ISourceWebPartProps> 
implements IDynamicDataCallables {

  //private _isDarkTheme: boolean = false;
  //private _environmentMessage: string = '';

 private _selectedCity: ICity;

  private onCityChange = (city: ICity): void => {
    alert(city.key);
    
    this._selectedCity = city;
    this.context.dynamicDataSourceManager.notifyPropertyChanged('city');
  }

    public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: 'city',
        title: 'City'
      }
    ];
  }

  /**
   * Return the current value of the specified dynamic data set
   * @param propertyId ID of the dynamic data set to retrieve the value for
   */
  public getPropertyValue(propertyId: string): ICity {
    if (propertyId === "city") {
      
      return this._selectedCity ? {key : this._selectedCity.key,text : this._selectedCity.text} : {key:"", text:""};
    }

    throw new Error('Bad property id');
  }


  public render(): void {
    const element: React.ReactElement<ISourceProps> = React.createElement(
      Source,
      {
        
        description: this.properties.description,
        //onCityChanged: this.onCityChange.bind(this)
        onCityChanged: this.onCityChange
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this.context.dynamicDataSourceManager.initializeSource(this);
    return Promise.resolve();
  }







  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
