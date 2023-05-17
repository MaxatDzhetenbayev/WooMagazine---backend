import { Feedback } from '../models/models.js'
import nodemailer from 'nodemailer'

import { template } from '../helpers/messageTemplate.js'

export const createFeedback = async (req, res) => {


	const from = 'woomagazine <woomagazinesemey01@gmail.com>'
	const to = 'woomagazinesemey01@gmail.com'

	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'woomagazinesemey01@gmail.com',
			pass: 'czfyzvfpapegbkxo'
		}
	})


	try {
		const createdFeedback = await Feedback.create({ ...req.body }, {
			returning: true
		})

		if (!createdFeedback) res.status(500).json({
			message: 'Обратная связь не была отправлена'
		})



		transport.sendMail({
			from, to,
			subject: 'Обратная связь ',
			html: template({ ...req.body })
		}, (err, data) => {
			if (err) return console.log('Ошибка отправки сообщения на почту')

			console.log(`сообщение успешно отправлена на почту: ${userInfo.email}`)
		})

		return res.status(200).json({
			message: 'Сообщение было отправлено'
		})

	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Обратная связь не была отправлена'
		})
	}


}