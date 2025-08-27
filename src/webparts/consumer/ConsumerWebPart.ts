import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  //PropertyPaneTextField,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ConsumerWebPartStrings';
import Consumer from './components/Consumer';
import { IConsumerProps } from './components/IConsumerProps';
import { DynamicProperty } from '@microsoft/sp-component-base';
import { ICity } from '../../data/ICity';

export interface IConsumerWebPartProps {
  description: string;
  city:DynamicProperty<ICity>;
}

export default class ConsumerWebPart extends 
BaseClientSideWebPart<IConsumerWebPartProps> {

  //private _isDarkTheme: boolean = false;
  //private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IConsumerProps> = React.createElement(
      Consumer,
      {
        description: this.properties.description,
        city:this.properties.city
      }
    );

    ReactDom.render(element, this.domElement);
  }

  





  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    //this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

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
              groupFields: [
                PropertyPaneDynamicFieldSet({
                  label: 'Select event source',
                  fields: [
                    PropertyPaneDynamicField('city', {
                      label: 'Event source'
                    })
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}


