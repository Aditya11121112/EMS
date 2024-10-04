import { FaTimesCircle } from 'react-icons/fa';

const LeavesRejected = ({ count }) => (
  <div className="p-4 bg-white shadow-md rounded-lg flex items-center">
    <FaTimesCircle size={30} className="text-red-500 mr-4" /> {/* Red icon and margin */}
    <div>
      <h3 className="text-lg font-bold">Leaves Rejected</h3>
      <p className="text-2xl">{count}</p>
    </div>
  </div>
);

export default LeavesRejected;
