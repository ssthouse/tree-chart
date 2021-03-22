declare function text(ctx: any, text: any, x: any, y: any, fontSize: any, fontColor: any): void;
declare function wrapText(context: any, text: string, x: number, y: number, maxWidth: number, lineHeight: number, fontColor: string): void;
declare function roundRect(context: any, x: any, y: any, width: any, height: any, radius: any, fill: any, stroke: any): void;
declare const _default: {
    text: typeof text;
    wrapText: typeof wrapText;
    roundRect: typeof roundRect;
    randomColor(): string;
    getColorStrFromCanvas(context: any, xIndex: number, yIndex: number): string;
};
export default _default;
