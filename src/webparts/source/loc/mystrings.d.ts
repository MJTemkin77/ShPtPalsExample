declare interface ISourceWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  CountryFieldLabel: string;
}

declare module 'SourceWebPartStrings' {
  const strings: ISourceWebPartStrings;
  export = strings;
}
