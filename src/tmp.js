import fs from 'fs'
import path from 'path'

const createDir = () =>
	new Promise((resolve, reject) => {
		fs.mkdir(TMP_DIR, err => {
			if (err && err.code !== 'EEXIST') reject(err)
			resolve(true)
		})
	})

const deleteFiles = () =>
	new Promise((resolve, reject) => {
		fs.readdir(TMP_DIR, (err, files) => {
			if (err) return reject(err)
			for (const file of files) {
				fs.unlink(path.join(TMP_DIR, file), err => {
					if (err) reject(err)
				})
			}
			resolve(true)
		})
	})

const init = async () => {
	console.log('Preparing tmp directory...')
	await createDir()
	await deleteFiles()
}

export default init
