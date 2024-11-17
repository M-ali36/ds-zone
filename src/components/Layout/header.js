import React from 'react'
import Logo from '@svg/logo.svg'
import { Link } from 'gatsby'

const Header = () => {

	return (
		<header className="border-b border-slate-200 py-2">
			<div className="container mx-auto">
				<div className="flex items-center justify-center">
					<div className="w-12">
						<Link to="/">
							<Logo />
						</Link>
					</div>
					<nav className="ms-auto">
						<ul className="flex">
							<li><Link to="/projects">Projects</Link></li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header;