import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Search from "../components/Search";

const App = () => (
    <ChakraProvider>
        <Search />
    </ChakraProvider>
);

export default (selector: string) => {
    ReactDOM.render(<App />, document.querySelector(selector));
};