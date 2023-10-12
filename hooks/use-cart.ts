import { create } from "zustand";
import { Product } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "react-hot-toast";


interface CartStore {
    storeId: string
    items: Product[],
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
    setStoreId: (id: string) => void;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        storeId: "64f643b75c1b7956706aae36",
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);
            if(existingItem) {
                return toast("Item already in cart.");
            } 

            set({items: [...get().items, data]});
            toast.success("Item added to cart.");
        },
        removeItem:(id: string) => {
            set({items: [...get().items.filter((item) => item.id !== id)]});
            toast.success("Item removed from the cart.");
        },
        removeAll: () => set({items: []}),
        setStoreId: (id: string) => set({items: [...get().items], storeId: id})
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
);

export default useCart;