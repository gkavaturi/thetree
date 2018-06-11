import { jwt, errors } from 'web-service'
 
const { Client } = require('pg');
const uuidv1 = require('uuid/v4');
const client = new Client({
  user: 'app_user',
  host: 'localhost',
  database: 'db',
  password: 'strong_password',
  port: 5432
});

const SELECT_USER_QUERY = "SELECT password FROM account WHERE username=$1::text";

export default function(api)
{ 
    client.connect();

    async function getRows(query) {    
        return client.query(query)
          .then(res => {
            return res.rows;
          })
          .catch(e => {
            console.error(e.stack)
          })
    }

    async function insertRow(query) {    
        return client.query(query)
          .then(res => {
            return res.rows;
          })
          .catch(e => {
            console.error(e.stack)
          })
    }

    function getSubscriptions(id) {
        const query = {
          name: 'get-subscription',
          text: 'SELECT S.user_id, S.subscriptions FROM subscriptions AS S WHERE S.user_id = $1::int',
          values: [id]
        };
        return getRows(query);
    }

    api.post('/login', async ({ name, password }, { setCookie }) => {
        if(!name || !password) {
            throw errors.Input_rejected(`missing parameters`); 
        }
        const query = {
          name: 'get-user',
          text: SELECT_USER_QUERY,
          values: [name]
        };

        let rows = await getRows(query);
        const fetchedPassword = rows[0].password;

        if (!fetchedPassword)
        {
            throw new errors.NotFound()
        }
 
        if (password !== fetchedPassword)
        {
            throw new errors.InputRejected(`Wrong password`)
        }

        const tokenId =  uuidv1();// a randomly generated unique id of some kind
        const payload = { roles: ['admin'] }
 
        // Generate a non-expiring JWT
        const token = jwt({ payload, key: 'secret', userId: name, tokenId, expiresIn: undefined })
 
        // Cookies are created being "HttpOnly" by default
        // (that means it can only be read on the server side).
        // Pass `httpOnly: false` to make it readable in a web browser.
        setCookie('authentication', token, { signed: false })
    })

    api.post('/subscribe', async ( { subscriberId, publisherId }, { user , role }) => {
        if(!subscriberId || !publisherId) {
            throw errors.Input_rejected(`missing parameters`); 
        }

        let currentSubscribers = await getSubscriptions(publisherId);
        let insertQueryStatment = "insert into subscriptions(user_id, subscriptions,created_on) values($2::int, array[$1::int],  now())";
        if (currentSubscribers[0]) {
            insertQueryStatment = "update subscriptions set subscriptions = array_cat(subscriptions, array[$1::int]) where user_id=$2::int";
            ;
            if (currentSubscribers[0].subscriptions.includes(parseInt(subscriberId))) {
                throw new errors.Input_rejected(`already subscribed`); 
            }
        }
        const updateQuery = {
          name: 'subscribe',
          text: insertQueryStatment,
          values: [parseInt(subscriberId), parseInt(publisherId)]
        };
        let rows = await insertRow(updateQuery);    
        return rows;
    });

    api.get('/subscriptions/:id', async ({ id }, { user , role }) =>
    {        
        if(!id) {
            throw errors.Input_rejected(`missing parameters`); 
        }
        let rows = await getSubscriptions(id);
        return rows;
    });

    api.get('/posts/:id', async ({ id }, { user, role }) => {
        if(!id) {
            throw errors.Input_rejected(`missing parameters`); 
        }
        const query = {
          name: 'get-posts',
          text: 'SELECT P.post_id, P.user_id, P.message_body FROM posts AS P JOIN subscriptions AS S ON P.user_id = ANY(S.subscriptions) WHERE S.user_id = $1::int',
          values: [id]
        };
        let rows = await getRows(query);
        return rows;
    });

    api.get('/feed/:id', async ({ id }, { user, role }) => {
        if(!id) {
            throw errors.Input_rejected(`missing parameters`); 
        }
        const query = {
          name: 'get-feed',
          text: 'SELECT P.post_id, P.user_id, P.message_body, P.created_on FROM posts AS P JOIN subscriptions AS S ON P.user_id = ANY(S.subscriptions) WHERE S.user_id = $1::int',
          values: [id]
        };
        let rows = await getRows(query);
        return rows;
    });
}