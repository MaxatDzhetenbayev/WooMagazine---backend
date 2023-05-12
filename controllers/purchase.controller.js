import { Basket, Product, BasketProduct, Buyer, Order } from '../models/models.js'
import { v4 as uuid } from 'uuid'
import { Op } from 'sequelize'

export const createPurchase = async (req, res) => {

	const { buyer: { products, ...userInfo } } = req.body


	try {
		const userId = uuid()

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

		await Order({
			status: 'PENDING',
			buyerId: buyer.id
		})

		return res.status(200).json('Продукты успешно куплены')


	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: 'Ошибка' })
	}
}