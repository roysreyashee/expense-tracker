import { NavLink } from "react-router-dom"
import {
    FaHome,
    FaPlus
} from 'react-icons/fa'
export default function Sidebar() {

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
            ? 'bg-emerald-500 text-white'
            : 'text-slate-600 hover:bg-slate-100'
        }`
    return(

            <div className='w-[260px] min-h-screen bg-white border-r border-slate-200 flex flex-col justify-between p-5'>
                <div>
                    <h2 className="text-2xl font-bold mb-8 text-slate-800">
                        Expense Tracker 
                    </h2>
                    <nav className="flex flex-col gap-2">
                        <NavLink to='/' className={linkClass}>
                            <FaHome/> Dashboard
                        </NavLink>

                        <NavLink to='/transactions' className={linkClass}>
                                <FaPlus/> Transactions
                        </NavLink>
                         <NavLink to='/add' className={linkClass}>
                                <FaPlus/> Add
                        </NavLink>
                         <NavLink to='/reports' className={linkClass}>
                                <FaPlus/> Reports
                        </NavLink>
                         <NavLink to='/settings' className={linkClass}>
                                <FaPlus/> Settings
                        </NavLink>
                        
                    </nav>
                <div className="border-t border-slate-200 pt-5">
                    <h4 className='font-semibold text-slate-800'>John Doe</h4>
                    <p className='text-sm text-slate-500'>john@email.com</p>

                </div>
                </div>
            </div>
    )
}