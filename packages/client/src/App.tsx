import "./App.css";
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./components/quiz/Quiz";
import History from "./components/history/History";
import Compare from './components/compare/Compare';
import {DeletedValuesProvider} from "./components/textbox/DeletedValuesContext";
import {InputValuesProvider} from "./components/textbox/InputValuesContext";
import {ProductNamesProvider} from "./components/textbox/ProductNamesContext";

export default function App() {
    return (
        <DeletedValuesProvider>
            <InputValuesProvider>
                <ProductNamesProvider>
                    <Router>
                        <Routes>
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/history" element={<History />} />
                            <Route path="/compare" element={<Compare />} />
                            <Route path="/" element={<Homepage />} />
                        </Routes>
                    </Router>
                </ProductNamesProvider>
            </InputValuesProvider>
        </DeletedValuesProvider>
    );
}
