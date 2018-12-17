import config from '@config'
import template from './template.html'
import {createTransport} from 'nodemailer'
import {render as renderMail} from 'mustache'
import fetch from 'node-fetch'
import fs from 'fs'

const mailer = createTransport({
	...config.smtp,
	auth: config.smtpAuth,
})

const getImage = async (id, url, index) => {
	const res = await fetch(url)
	return new Promise((resolve, reject) => {
		const path = `${TMP_DIR}/${id}_${index + 1}.jpg`
		const fileStream = fs.createWriteStream(path)
		res.body.pipe(fileStream)
		res.body.on('error', err => reject(err))
		res.body.on('finish', () => resolve(path))
	})
}

const sendOffer = async offer => {
	const {id, images, price, title, features} = offer
	const imagePaths = await Promise.all(
		images.map((url, index) => getImage(id, url, index))
	)
	await mailer.sendMail({
		from: `${config.from.name} <${config.from.email}>`,
		to: `${config.to.name} <${config.to.email}>`,
		subject: `${price} | ${title}`,
		attachments: imagePaths.map((path, index) => ({
			path,
			filename: `${index + 1}.jpg`,
		})),
		html: renderMail(template, {
			...offer,
			features: Object.entries(features).map(([name, value]) => ({
				name,
				value,
			})),
		}),
	})
	await Promise.all(
		imagePaths.map(
			path =>
				new Promise((resolve, reject) => {
					fs.unlink(path, err => {
						if (err) reject(err)
						resolve(true)
					})
				})
		)
	)
	console.log(`Successfully sent offer #${id}: ${title}.`)
}

export default sendOffer
