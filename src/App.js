import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/LayOut";
import TaskPage from '../src/pages/TaskPage'
export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<TaskPage />} />
                </Route>
            </Routes>
        </Router>
    );
}
