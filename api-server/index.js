import { api } from 'web-service';
import app_api from "./app-api";

import configuration from '../configuration';

const apiService = api
({
  name: 'Api Service',
  keys: ['secret', 'older-deprecated-secret'],
  authentication:
  {
    userInfo: payload => ({ roles: payload.roles })
  },
  api: [ app_api ]
})


apiService.listen(configuration.services.api.port).then(() =>
{
	console.info(`Api server is listening at http://localhost:${configuration.services.api.port}`)
},
(error) =>
{
	console.error(error)
})