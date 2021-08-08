import React from "react";
import ReactDOM from "react-dom";
import { load } from 'growlers/store';
import Taps from 'growlers/Taps';
import Search from 'growlers/Search';
import Cart from 'growlers/Cart';
import DataComponent from 'growlers/DataComponent';
import { ChakraProvider } from '@chakra-ui/react';

import "./index.css";

load('hv-taplist');

const App = () => (
    <ChakraProvider>
        <div
            style={{
                maxWidth: '960px',
                margin: 'auto',
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gridColumnGap: '1rem'
            }}
        >
            <div>
                <Search />
                <Cart />
                <DataComponent>{ ({ filteredTaps }) => filteredTaps.map((tap) => tap.beverageName).join(', ') }</DataComponent>
            </div>
            <Taps />
        </div>
    </ChakraProvider>
)

ReactDOM.render(<App />, document.getElementById("app"));
