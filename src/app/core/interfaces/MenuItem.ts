export interface MenuItem {
    iconName: string,
    title: string,
    name: string,
    link: string,
    unit?: string,
    minSliderValue?: number,
    maxSliderValue?: number,
    category: string,
    color?: string,
    backgroundColor?: string
}