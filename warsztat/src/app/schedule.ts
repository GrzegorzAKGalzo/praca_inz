import { Mechanic } from "./mechanic";

export interface Schedule {
    id:number,
    workDay: string,
    startTime: string,
    endTime: string,
    mechanic: Mechanic
}
