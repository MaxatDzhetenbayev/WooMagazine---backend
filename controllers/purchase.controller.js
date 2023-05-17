import { Basket, Product, BasketProduct, Buyer, Order } from '../models/models.js'

import { v4 as uuid } from 'uuid'
import { Op } from 'sequelize'

import nodemailer from 'nodemailer'

export const createPurchase = async (req, res) => {

	const { buyer: { products, ...userInfo } } = req.body

	const from = 'woomagazine <woomagazinesemey01@gmail.com>'
	const to = userInfo.email

	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'woomagazinesemey01@gmail.com',
			pass: 'czfyzvfpapegbkxo'
		}

	});

	const userId = uuid()
	const orderId = uuid()

	try {

		const buyer = await Buyer.create({
			...userInfo, id: userId
		}, {
			returning: true,

		})

		const choosedProduct = await Product.findAll({
			where: {
				[Op.and]: {
					id: {
						[Op.or]: [...products.map(item => (item.id))]
					},
					count: {
						[Op.gt]: 0
					},
				}

			}
		})

		if (choosedProduct.length === 0) return res.status(503).message('Данных продуктов не существует. Попробуйте выбрать еще раз')

		const createdBasket = await Basket.create({
			buyerId: buyer.id,
		})


		for (const elem of choosedProduct) {
			BasketProduct.create({
				basketId: createdBasket.id,
				productId: elem.id
			})
		}

		await Order.create({
			id: orderId,
			status: 'PENDING',
			buyerId: buyer.id
		})

		transport.sendMail({
			from, to,
			subject: 'Покупка в Woomagazine',
			html: `
				Дорогой ${userInfo.name}, спасибо вам за использование нашего магазина. </br>
				Ваш запрос на покупку товаров стоит на обработке. В скором времени вам позвонит наш менеджер. </br>
				Вам доступен мониторинг за вашим товаром по этому адресу <a href="http://localhost:5000/purchase/order/${buyer.id}">http://localhost:5000/purchase/order/${buyer.id}</a>
			`
		}, (err, data) => {
			if (err) return console.log('Ошибка отправки сообщения на почту')

			console.log(`сообщение успешно отправлена на почту: ${userInfo.email}`)
		})

		return res.status(200).json('Продукты успешно куплены')

	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: 'Ошибка' })
	}
}

export const getClientPurchase = async (req, res) => {
	const { id } = req.params
	console.log(id)
	try {
		const order = await Buyer.findOne({
			attributes: {
				exclude: ["id", "createdAt", "updatedAt"]
			},
			where: {
				id: {
					[Op.eq]: id
				}
			},
			include: [
				{
					model: Basket,
					attributes: {
						exclude: ["buyerId"]
					},
					include: Product
				},
				Order
			]
		})

		return res.status(200).json(order)

	} catch (err) {
		console.log(err)
		return res.status(404).json({
			message: 'Данный заказ не найден'
		})
	}
}