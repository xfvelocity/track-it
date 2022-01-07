import { Meal } from "@/views/meal-prep/add-meal/create-meal/types/CreateMeal.types";

export type RecipeState = {
    recipes: Meal[];
    editingMeal: Meal;
}