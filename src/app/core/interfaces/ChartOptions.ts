export interface ChartOptions {
    colors: string[],
    legend: { position: string },
    hAxis: {
      title: string,
      titleTextStyle: {
        italic: boolean,
      }
    },
    vAxis: {
      title: string,
      titleTextStyle: {
        italic: boolean,
      }
    }
}