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

const saveUser = async (uid: string, userName: string, icon: string) => {
	//   const path = `${STORAGE_PATH_USER_ICON}/${userInfo.userId}.jpg`
	//   const iconRemoteUri = await uploadImage(iconUri, path)
	const path = `${STORAGE_PATH_USER_ICON}/${userInfo.userId}.jpg`
	const iconRemoteUri = await uploadImage(icon, path)

	const sql = 'INSERT INTO users (uid, userName, icon) VALUES ($1, $2, $3) RETURNING *;'
	return query(sql, [uid, userName, iconRemoteUri])
}