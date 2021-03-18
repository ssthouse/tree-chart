export interface Data {
    name: string;
    title: string;
    children: any;
}
export declare function generateOrgChartData(depth: number): Data;
export declare function generateOrgChartDataFolded(depth: any, foldDepth: number): any;
