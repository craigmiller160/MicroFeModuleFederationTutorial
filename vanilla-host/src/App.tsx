import "./index.css";
import { load, subscribe } from 'growlers/store';
import Taps from 'growlers/VanillaTaps';
import Search from 'growlers/VanillaSearch';
import Cart from 'growlers/VanillaCart';

load('hv-taplist');

Taps('.taps');
Search('.search');
Cart('.cart');

subscribe(({ filteredTaps }) => {
    document.querySelector('.beverages')
        .innerHTML = filteredTaps.map(({ beverageName }) => beverageName).join(', ');
});