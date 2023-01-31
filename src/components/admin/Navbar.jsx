import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { FaUserNinja } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks';

const NavItem = ({ children, to }) => {
	const commonClasses =
		' flex items-center text-lg space-x-2 p-2 hover:opacity-80';
	return (
		<NavLink
			className={({ isActive }) =>
				(isActive ? 'text-white' : 'text-gray-400') + commonClasses
			}
			to={to}>
			{children}
		</NavLink>
	);
};

const Navbar = () => {
	const { handleLogout } = useAuth();
	return (
		<nav className='w-48 min-h-screen bg-secondary border-r border-gray-400 '>
			<div className='flex flex-col h-screen justify-between pl-5 sticky top-0'>
				<ul>
					<li className='mb-8'>
						<Link to='/'>
							<img src='./logo.png' alt='logo' className='h-14 p-2' />
						</Link>
					</li>
					<li>
						<NavItem to='/'>
							<AiOutlineHome />
							<span> Home</span>
						</NavItem>
					</li>
					<li>
						<NavItem to='/movies'>
							<BiMoviePlay />
							<span>Movies</span>
						</NavItem>
					</li>
					<li>
						<NavItem to='/actors'>
							<FaUserNinja />
							<span>Actors</span>
						</NavItem>
					</li>
				</ul>
				<div className='flex flex-col items-start pb-5'>
					<span className='font-semibold text-xl text-white'>Admin</span>
					<button
						onClick={handleLogout}
						className='flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1'>
						<FiLogOut />
						<span>Log out</span>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
