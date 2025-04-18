import { combineReducers } from 'redux';
import Anime from "@/types/anime";
import ShopItemType from '@/types/shopItemType';


interface WatchListAction {
    type: string;
    item: Anime;
}

interface CartAction {
    type: string;
    item: ShopItemType
}

const initialWatchListState: Anime[] = [];

const watchlistState = (state: Anime[] = initialWatchListState, action: WatchListAction) => {
    switch (action.type) {
        case 'ADD_TO_WATCHLIST':
            return [...state, action.item]; // Create a new array
        case 'REMOVE_FROM_WATCHLIST':
            return state.filter(item => item.id !== action.item.id); // Compare by id
        case 'CLEAR_WATCHLIST':
            return initialWatchListState
        default:
            return state;
    }
};

const initialCartState: ShopItemType[] = []

const cartState = (state: ShopItemType[] = initialCartState, action: CartAction) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItemIndex = state.findIndex(item => item.id === action.item.id);

            if (existingItemIndex !== -1) {
                // If item already in cart, increment quantity
                const updatedState = [...state];
                const existingItem = updatedState[existingItemIndex];

                updatedState[existingItemIndex] = {
                    ...existingItem,
                    quantity: (existingItem.quantity ?? 1) + 1,
                };

                return updatedState;
            } else {
                // Add new item with quantity = 1
                return [...state, { ...action.item, quantity: 1 }];
            }
        }

        case "REMOVE_FROM_CART":
            return state.filter(item => item.id !== action.item.id);

        case "CLEAR_CART":
            return initialCartState;

        case "INCREASE_QUANTITY":
            return state.map(cartItem =>
                cartItem.id === action.item.id
                    ? { ...cartItem, quantity: (cartItem.quantity ?? 1) + 1 }
                    : cartItem
            );

        case "DECREASE_QUANTITY":
            return state
                .map(cartItem =>
                    cartItem.id === action.item.id && (cartItem.quantity ?? 1) > 1
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
                .filter(item => item.quantity && item.quantity > 0); // Optional: remove items with 0

        default:
            return state;
    }
};



const rootReducer = combineReducers({
    watchlistState,
    cartState
});

export default rootReducer;