import Statuses from "../components/taskComponents/Statuses"
import FilterOption from "../components/taskComponents/FilterOption"
export default function TaskPage(){
    return(
       <> 
       <h1 style={{ marginLeft: "120px" }}>დავალებების გვერდი</h1>
        <FilterOption/>
        <Statuses/>
        </>
    )
}