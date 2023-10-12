import { Category } from "@/types";

const URL =`${process.env.NEXT_PUBLIC_API_URL!}`;

const getCategories = async (storeId: string): Promise<Category[]> => {
    const res = await fetch(`${URL}/${storeId}/categories`);
    return res.json();
}

export default getCategories;