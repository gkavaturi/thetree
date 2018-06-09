import React from 'react'
import { Link } from 'react-website'
import classNames from 'classnames'

export default function Menu({ children })
{
	return (
		<ul className="menu">
			{ children }
		</ul>
	)
}

export function MenuLink({ to, children })
{


	return (
		<li className="menu-list-item">
			<Link
				to={ to }
				activeClassName="menu-item--selected"
				className="menu-item">
				{ children }
			</Link>
		</li>
	)
}