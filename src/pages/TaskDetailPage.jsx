import { useParams } from 'react-router-dom';
import TaskDetail from '../components/taskComponents/TaskDetail';
import TaskComments from '../components/taskComponents/TaskComments';

export default function TaskDetailPage() {
  const { id } = useParams(); 

  return (
    <div className='task-detail-parent'>
      <TaskDetail taskId={id} />
      <TaskComments taskId={id} />
    </div>
  );
}
