import { reduxModule } from 'react-website'

const redux = reduxModule('USERS');

export const submitLogin = redux.action
(
	'SUBMIT_LOGIN',
	async ({ http }, { name, password }) =>
	{
		return await http.post(`/api/login`, { name, password })
	}	
)

export const getFeed = redux.action
(
	'GET_FEED',
	async ({ http }, id) =>
	{
		return await http.get(`/api/feed/${id}`)
	}
)

export const setPrivacy = redux.action
(
	'SET_PRIVACY',
	async ({ http }, { id, flag }) =>
	{
		return await http.post(`/api/privacy/`, { id, flag })
	}	
)


export const followUser = redux.action
(
	'FOLLOW_USER',
	async ({ http }, { subscriberId, publisherId }) =>
	{
		await delay(1500)
		await http.post(`/api/subscribe`, { subscriberId, publisherId })
	}
)


// A little helper for Redux `@connect()`
export const connectUsers = redux.getProperties

const initialState = { users: [] }

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default redux.reducer(initialState)

// "Sleep" using `Promise`
function delay(delay)
{
	return new Promise(resolve => setTimeout(resolve, delay))
}