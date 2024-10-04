import { FaFileAlt } from 'react-icons/fa';

const LeavesApplied = ({ count }) => (
  <div className="p-4 bg-white shadow-md rounded-lg flex items-center">
    <FaFileAlt size={30} className="text-blue-500 mr-4" /> {/* Blue icon and margin */}
    <div>
      <h3 className="text-lg font-bold">Leaves Applied</h3>
      <p className="text-2xl">{count}</p>
    </div>
  </div>
);

export default LeavesApplied;
