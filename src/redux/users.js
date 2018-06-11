import { reduxModule } from 'react-website'

const redux = reduxModule('USERS');

export const submitLogin = redux.action
(
	'SUBMIT_LOGN',
	async ({ http }, id) =>
	{
		return await http.post(`/api/login`, { user, password })
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
	'GET_FEED',
	async ({ http }, { id, flag }) =>
	{
		return await http.post(`/api/privacy/`, { id, flag })
	}	
)

export const getUsers = redux.action
(
	'GET_USERS',
	async ({ http }, id) =>
	{
		return await http.get(`/api/example/${id}`);
	},
	'users'
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

export const addUser = redux.action
(
	'ADD_USER',
	async ({ http }, user) =>
	{
		await delay(1500)
		await http.post(`/api/example/users`, user)
	}
)

export const deleteUser = redux.action
(
	'DELETE_USER',
	async ({ http }, id) =>
	{
		await delay(1000)
		await http.delete(`/api/example/users/${id}`)
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