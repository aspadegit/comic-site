import { offset } from "@popperjs/core";

export interface ComicJson {
    number_of_total_results : number;
    offset: number;
    results : Comic[];
}

export interface Comic {
    comicVineId:number;
    id: number;
    name:string;
    type:string;
    date: string;
    description: string;
    userRating: number;
    userDetails: string;
    image: string;
    ownedDigit: boolean;
    ownedPhysic : boolean;
}
export type Dictionary<Comic> = {
    [id: number]: Comic;
}

export interface QueryInfo {
    resource: string;
    sort: string;
    sortDirection: string;
    limit: number;
    dateStyle: string;
    offset: number;
    
}