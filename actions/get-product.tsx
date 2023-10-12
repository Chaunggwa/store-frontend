import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getProduct =async (storeId: string, productId: string) => {
    const res = await fetch(`${URL}/${storeId}/products/${productId}`);

    return res.json();
}

export default getProduct;