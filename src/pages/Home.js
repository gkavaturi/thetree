import React, { Component } from 'react'
import { meta } from 'react-website'

import husky from '../../assets/images/husky.jpg'

@meta(({ state }) => ({ title: 'Home' }))
export default class Page extends Component
{
	render()
	{
		return (
			<section className="page-content">
				<h1 className="page-header">
					Cheiwe
				</h1>

			</section>
		)
	}
}