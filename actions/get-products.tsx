import { Product } from "@/types";
import qs from "query-string";

const URL =`${process.env.NEXT_PUBLIC_API_URL!}`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFearuted?: boolean
}

const getProducts = async (storeId: string, query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: `${URL}/${storeId}/products`,
        query:  {
        colorId: query.colorId,
        sizeId: query.sizeId,
        categoryId: query.categoryId,
        isFeatured: query.isFearuted
       }
    }
    );
  
    const res = await fetch(url);
    
    return res.json();
}

export default getProducts;