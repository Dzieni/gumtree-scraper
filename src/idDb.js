import fs from 'fs'
import config from '@config'

const BUFFER_SIZE = config.bufferSize
const buffer = []

export const load = () =>
	new Promise((resolve, reject) => {
		fs.readFile(ID_CACHE_PATH, 'utf8', (err, data) => {
			if (err) {
				if (err.code === 'ENOENT') {
					console.log('ID cache file not found. Starting from scratch.')
					return resolve(true)
				} else {
					return reject(err)
				}
			}
			buffer.push(...data.split('\n').filter(v => v))
			resolve(true)
		})
	})

const refresh = () => {
	const overload = buffer.length - BUFFER_SIZE
	if (overload > 0) {
		buffer.splice(0, overload)
	}
}

export const save = () => {
	refresh()
	return new Promise((resolve, reject) => {
		fs.writeFile(ID_CACHE_PATH, buffer.join('\n'), err => {
			if (err) reject(err)
			resolve(true)
		})
	})
}

export const add = el => buffer.push(el)

const pushToBottom = index => buffer.push(buffer.splice(index, 1)[0])

export const isDuplicate = id => {
	const index = buffer.findIndex(e => e === id)
	if (index > -1) {
		pushToBottom(index)
		return true
	}
	return false
}

export default {load, save, add, isDuplicate}
