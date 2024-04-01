import { Car } from "./car";
import { Client } from "./client";
import { Mechanic } from "./mechanic";

export interface Repair {
    id: number,
    descript: string,
    status: number,
    mechanic: Mechanic | undefined,
    client: Client | undefined,
    car: Car | undefined,
    entryDate: Date,
    leaveDate: Date
}
