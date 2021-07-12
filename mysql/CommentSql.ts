const mysql = require('mysql')

const host = 'us-cdbr-east-04.cleardb.com'
const user = 'b75ef986476bdd'
const password = 'af4c6f01'
const database = 'heroku_1eff8c9c3afb9ba'

const connection = mysql.createConnection({
  host     : host,
  user     : user,
  password : password,
  database : database
})


connection.connect()

connection.query(`INSERT INTO comment (id, body, userId, postId, createdAt, updatedAt) VALUES
(3, 'testComment', 1, 2, null, null);`, (error, results, fields) => {
if (error) throw error;
// console.log('The solution is: ', results[0].solution);
})

connection.end()



// import { execSql } from './MySqlWrapper'

// const postComment = () => {
//   execSql(`INSERT INTO post (body, userId, postId, createdAt, updatedAt) VALUES
//   ( 'testComment', 1, 2, null, null);`)
// }

// postComment()