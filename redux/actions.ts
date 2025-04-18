import Anime from "@/types/anime";
import ShopItemType from "@/types/shopItemType";


export const addToWatchList = (item: Anime) => ({
    type: "ADD_TO_WATCHLIST",
    item
})

export const removeFromWatchList = (item: Anime) => ({
    type: "REMOVE_FROM_WATCHLIST",
    item
})

export const clearWatchList = () => ({
    type: 'CLEAR_WATCHLIST'
})

export const addToCart = (item: ShopItemType) => ({
    type: "ADD_TO_CART",
    item
})

export const removeFromCart = (item: ShopItemType) => ({
    type: "REMOVE_FROM_CART",
    item
})

export const clearCart = () => ({
    type: "CLEAR_CART"
})

export const increaseQuantity = (item: ShopItemType) => ({
    type: "INCREASE_QUANTITY",
    item,
});

export const decreaseQuantity = (item: ShopItemType) => ({
    type: "DECREASE_QUANTITY",
    item,
});