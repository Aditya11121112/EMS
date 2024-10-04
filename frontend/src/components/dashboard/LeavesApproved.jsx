import { FaCheckCircle } from 'react-icons/fa';

const LeavesApproved = ({ count }) => (
  <div className="p-4 bg-white shadow-md rounded-lg flex items-center">
    <FaCheckCircle size={30} className="text-green-500 mr-4" /> {/* Green icon and margin */}
    <div>
      <h3 className="text-lg font-bold">Leaves Approved</h3>
      <p className="text-2xl">{count}</p>
    </div>
  </div>
);

export default LeavesApproved;
