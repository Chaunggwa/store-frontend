import { Category } from "@/types";

const URL =`${process.env.NEXT_PUBLIC_API_URL!}`;

const getCategory = async (storeId: string, categoryId: string): Promise<Category> => {
    const res = await fetch(`${URL}/${storeId}/categories/${categoryId}`);
    return res.json();
}

export default getCategory;