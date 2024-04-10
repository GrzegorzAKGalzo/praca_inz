import { Client } from "./client";

export interface Car {
    id?: number,
    mark?: string,
    model?: string,
    reg?: string,
    registration?: string,
    year?: number,
    client?: Client | undefined,
}
