import { RepairType } from "./repairType";

export interface Invoice {
    name: string,
    client: string,
    phone: string,
    email: string,
    nip: string,
    repairs: RepairType[],
    total: number,
    date: Date,
}
