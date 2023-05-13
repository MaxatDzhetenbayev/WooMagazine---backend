import { Product, Property } from '../models/models.js'
import { Op } from 'sequelize'

export const getAll = async (req, res) => {

	const { type } = req.query


	const findByType = (type) => {
		if (!type) return {
			propertyId: {
				[Op.eq]: 1,
			}
		}

		return {
			typeId: {
				[Op.eq]: type,
			},
			propertyId: {
				[Op.eq]: 1,
			}
		}
	}

	try {

		const products = await Product.findAll({
			where: findByType(type)
		})

		if (!products) return res.status(500).json({ message: 'Продукты не найдены' })

		return res.status(200).json(products)
	} catch (err) {
		console.log(err)
		return res.status(404).json('Ошибка при поиске продуктов')
	}
}

export const getOne = async (req, res) => {
	const { productId } = req.query

	try {

		const product = await Product.findOne({
			where: {
				id: productId
			}
		})

		if (!product) return res.status(500).json({ message: 'Продукт не найдены' })

		return res.status(200).json(product)
	} catch (err) {
		console.log(err)
		return res.status(404).json('Ошибка при поиске продукта')
	}
}

export const addProduct = async (req, res) => {

	const { title, price, type, entities } = req.body
	const image = req.file

	try {
		const parsedEnteties = []
		const products = []


		for (const item of entities) {
			parsedEnteties.push(JSON.parse(item))
		}

		for (const element of parsedEnteties) {
			const { id: propertyId } = await Property.findOne({
				where: {
					color: element.color,
					size: element.size,
				}
			})

			products.push({
				title,
				price,
				image: image.filename,
				typeId: type,
				propertyId,
				count: element.count
			})
		}

		const addedProducts = await Product.bulkCreate(products, {
			returning: true
		})

		if (!addedProducts) return res.status(500).json({ message: 'Не удалось создать продукты' })

		return res.json(products)
	} catch (err) {
		console.log(err)
	}
}

export const deleteProduct = async (req, res) => {
	const { id } = req.params
	try {
		await Product.destroy({
			where: {
				id
			}
		})

		return res.status(200).json({
			message: 'Продукт успешно удален'
		})

	} catch (err) {
		console.log(err)
	}
}