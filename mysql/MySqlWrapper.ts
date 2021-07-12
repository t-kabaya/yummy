const mysql = require('mysql')

const host = 'us-cdbr-east-04.cleardb.com'
const user = 'b75ef986476bdd'
const password = 'af4c6f01'
const database = 'heroku_1eff8c9c3afb9ba'

var connection = mysql.createConnection({
  host     : host,
  user     : user,
  password : password,
  database : database
})

export const execSql = (sql: string): void => {
  try {
    connection.connect()

    connection.query(sql, (error: any, results: any, fields: any) => {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    })
  } catch (error) {
    console.error('sql: error')
  } finally {
    connection.end()
  }
}



