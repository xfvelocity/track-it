export type Recipe = {
    id?: number;
    name: string;
    img: string;
    nutrients: RecipeNutrients;
    ingredients: string[];
    instructions: string[];
}

export interface RecipeNutrients {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}