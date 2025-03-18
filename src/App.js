import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/LayOut";
import TaskPage from '../src/pages/TaskPage'
import TaskDetailPage from "./pages/TaskDetailPage";
import AddEmployee from "./components/taskComponents/AddEmployee";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<TaskPage />} />
                    <Route path="task/:id" element={<TaskDetailPage/>}/>
                    <Route path="add-employee" element={<AddEmployee/>}/>
                </Route>
            </Routes>
        </Router>
    );
}
