declare module 'hsl-to-hex' {
    export default function hsl(hue: number, saturation: number, luminosity: number): string
}

declare module 'qs' {
    const qs: {
        stringify(value: any, options?: any): string
    }
    export default qs
}
