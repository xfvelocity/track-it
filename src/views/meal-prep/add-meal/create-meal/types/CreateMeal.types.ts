export type Meal = {
    id?: number;
    name: string;
    img: string;
    nutrients: MealNutrients;
    ingredients: MealIngredientss[];
    instructions: string[];
}

export type MealIngredientss = {
    amount: number;
    unit: string;
    name: string;
}

export type MealNutrients = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}