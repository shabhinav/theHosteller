export interface ItabData {
  tabPanel: { name: string; description: string };
}


export type MyGroupType = {
    [key:string]: ItabData;
}