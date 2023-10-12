import { Billboard } from "@/types";

const URL =`${process.env.NEXT_PUBLIC_API_URL!}`;

const getBillboards = async (storeId: string): Promise<Billboard> => {
    const res = await fetch(`${URL}/${storeId}/billboards`);
    
    return res.json();
}

export default getBillboards;