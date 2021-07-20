import { query } from './Query'
import userInfo from '../utils/userInfo'
import { uploadImage } from '../firebase/Storage'
import { STORAGE_PATH_USER_ICON } from '../firebase/Fire'

let userState = {
	'id': -1,
	'uid': '',
	'userName': '',
	'icon':'',
	'createdAt': null,
	'updatedAt': null
}

const getUserData = async (uid: string) => {
	const sql = 'SELECT * FROM users WHERE uid = $1'
	const users: any[] = await query(sql, [uid])
	console.log(users)
	if (users.length == 1) {
		userState = users[0]
	}
	return users[0]
}

const saveUserWithIcon = async (uid: string, userName: string, icon: string): Promise<any> => {
	//   const path = `${STORAGE_PATH_USER_ICON}/${userInfo.userId}.jpg`
	//   const iconRemoteUri = await uploadImage(iconUri, path)
	const path = `${STORAGE_PATH_USER_ICON}/${userInfo.userId}.jpg`
	const iconRemoteUri = await uploadImage(icon, path)
	if (!iconRemoteUri) return // iconRemoteUrlがnullの時は、アイコンのアップロードに失敗した時。
	saveUser(uid, userName, iconRemoteUri)
}

export const saveUser = async (uid: string, userName: string, icon: string) => {
	// TODO: トランザクションの実装をしていると、いつまでも完成しなさそうなので効率は悪いけど一つのsqlをバラバラに実行している。（Rollback出来ないけど。）

	// テーブルにユーザーが存在していればinsert,存在していなければupdateする。
	// postgresql9.5から、on conflictを使用して一行で書くことが出来るがわかりやすさのため、２行のSQLで記述する。
	// https://stackoverflow.com/questions/11135501/postgresql-update-if-row-with-some-unique-value-exists-else-insert
	const selectSql = 'SELECT * FROM users SET WHERE uid = $1;'
	const user = await query(selectSql, [uid])
	console.log(user)

	if (user.length === 0) {
		const initUserSql = 'INSERT INTO users (uid, user_name, icon) VALUES ($1, $2, $3) RETURNING *;'
		const response = await query(initUserSql, [uid, userName, icon])
		console.log(response)
	} else {
		const updateUserSql = 'UPDATE users SET uid = $1, user_name = $2, icon = $3 WHERE uid = $1 RETURNING *;'
		const response = await query(updateUserSql, [uid, userName, icon])
		console.log(response)

	}
}