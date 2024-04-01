import { Client } from "./client";

export interface Car {
    id: number,
    mark: string,
    model: string,
    reg: string,
    year: number,
    client: Client | undefined,
}
