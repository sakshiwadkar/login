import React from 'react'

import { Link } from 'react-router-dom'

export default function LandingPage() {
	return (
		<div style={{ backgroundImage: "url(https://www.middlemarketcenter.org/Media/Expert%20Perspectives%20Images/webdesignconcept_206418.jpg)", backgroundSize: 'cover', height: '100vh' }}>
			<div className="container h-100">
				<div className="row h-100">
					<div className="col-12">
						<h1>Welcome to Company</h1>
						<p>
							<Link to="/login" className="btn btn-success">
								Login
							</Link>{' '}
							|{' '}
							<Link to="/register" className="btn btn-success">
								register
							</Link>{' '}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
