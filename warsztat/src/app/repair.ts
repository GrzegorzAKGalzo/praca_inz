import { Car } from "./car";
import { Client } from "./client";
import { Mechanic } from "./mechanic";

export interface Repair {
    id: number,
    descript: string,
    status: number,
    mechanic: Mechanic,
    client: Client,
    car: Car,
    entryDate: Date,
    leaveDate: Date
}
