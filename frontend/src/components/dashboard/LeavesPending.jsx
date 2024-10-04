import { FaClock } from 'react-icons/fa';

const LeavesPending = ({ count }) => (
  <div className="p-4 bg-white shadow-md rounded-lg flex items-center">
    <FaClock size={30} className="text-yellow-500 mr-4" /> {/* Yellow icon and margin */}
    <div>
      <h3 className="text-lg font-bold">Leaves Pending</h3>
      <p className="text-2xl">{count}</p>
    </div>
  </div>
);

export default LeavesPending;
