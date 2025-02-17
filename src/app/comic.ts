export interface ComicJson {
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
    owned: boolean[];

}
export type Dictionary<Comic> = {
    [id: number]: Comic;
}