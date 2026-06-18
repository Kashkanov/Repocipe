import type {ingredient} from "./ingredient";

export type recipe = {
    _id: string;
    title: string;
    prep_time: number;
    cook_time: number;
    picture: string;
    description: string;
    ingredients: ingredient[];
    steps: string[];
    datetime_added: Date;
    uploader: string;
}
