import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { Login } from './pages/Login.jsx';
import { Admin } from './pages/Admin.jsx';
import { Employee } from './pages/Employee.jsx';
import Department from './components/dashboard/Department.jsx';
import Employee1  from './components/dashboard/Employee.jsx';
import Leaves from './components/dashboard/Leave.jsx';
import Salary  from './components/dashboard/salary.jsx';
import Setting from './components/dashboard/settin.jsx';
import ADD_DEP from './components/dashboard/add-department.jsx';
import AddEmployee from './components/dashboard/add-employment.jsx';
import Edit_Employee from './components/dashboard/edit-employee.jsx';
import Delete_Employee from './components/dashboard/delete-employee.jsx';
import Salary_Detail from './components/dashboard/salary-detail';
import  EmpProfile  from './components/dashboard/empcomponent/emp-profile.jsx';
import EmpSalary from './components/dashboard/empcomponent/emp-salary.jsx';
import EmpSetting from './components/dashboard/empcomponent/emp-setting.jsx';
import EmpLeave  from './components/dashboard/empcomponent/emp-leave.jsx';
import Emp_part_leave from './components/dashboard/emp-part-leave.jsx';

function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route path='/' element={<Navigate to='/login'></Navigate>}></Route> 
      <Route path='/login' element={<Login />}></Route>
      <Route path='/admin-dashboard' element={<Admin />} />
      <Route path='/employee-dashboard' element={<Employee />}></Route>
      <Route path='/department' element={<Department />}/>
      <Route path='/employee' element={<Employee1 />} />
      <Route path='/leaves'element={<Leaves />}/>
      <Route path='salary' element={<Salary />}/>
      <Route path='/settings' element={<Setting/>}/>
      <Route path='/add-department' element={<ADD_DEP />} />
      <Route path='/add-employee' element={<AddEmployee />}/>
      <Route path='/employee/edit/:employeeId' element={<Edit_Employee />} />
      <Route path='/employee/delete/:employeeId' element={<Delete_Employee />}/>
      <Route path='/employee/salary/:employeeId' element={<Salary_Detail />} />
      <Route path='/emp-profile' element={<EmpProfile />} />
      <Route path='/emp-salary' element={<EmpSalary />} />
      <Route path='/emp-setting' element={<EmpSetting /> }/>
      <Route path='/emp-leaves' element={<EmpLeave />} />
      <Route path='/employee/leaves' element={<Emp_part_leave />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App;
