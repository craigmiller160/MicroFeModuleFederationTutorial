import { proxy, subscribe as validatioSubscribe, snapshot } from 'valtio';
import {Beverage} from './types';

export interface TapStore {
    searchText: string;
    alcoholLimit: number;
    taps: Beverage[];
    filteredTaps: Beverage[];
    cart: Beverage[];
}

const store = proxy<TapStore>({
    taps: [],
    filteredTaps: [],
    cart: [],
    searchText: '',
    alcoholLimit: 10
});

const filter = () => {
    const searchRE = new RegExp(store.searchText, 'i');
    return store.taps
        .filter(({ beverageName, abv }) => beverageName.match(searchRE) && abv < store.alcoholLimit)
        .slice(0, 15);
}

export const load = (client: string): void => {
    fetch(`http://localhost:8080/${client}.json`)
        .then(res => res.json())
        .then((taps: Beverage[]) => {
            store.taps = taps;
            store.filteredTaps = filter();
        });
};

export const setSearchText = (text: string) => {
    store.searchText = text;
    store.filteredTaps = filter();
};

export const setAlcoholLimit = (limit: number) => {
    store.alcoholLimit = limit;
    store.filteredTaps = filter();
};

export const addToCard = (beverage: Beverage) => {
    store.cart.push(beverage);
};

export type UnsubscribeFn = () => void;

export const subscribe = (callback: (state: TapStore) => void): UnsubscribeFn => {
    return validatioSubscribe(store, () => callback(snapshot(store)));
};

export default store;