import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';



// * Models without associate

export const Company = sequelize.define('company', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, allowNull: false },
	address: { type: DataTypes.STRING, allowNull: false }

}, { timestamps: false })

export const Feedback = sequelize.define('feedback', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
	phone: { type: DataTypes.INTEGER, allowNull: false },
	message: { type: DataTypes.STRING, allowNull: false },
})

// * Models without associate


export const Buyer = sequelize.define('buyer', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
	phone: { type: DataTypes.INTEGER, allowNull: false },
	country: { type: DataTypes.STRING, allowNull: false },
	city: { type: DataTypes.STRING, allowNull: false },
	street: { type: DataTypes.STRING, allowNull: false },
	house: { type: DataTypes.STRING, allowNull: false },
	apartament: { type: DataTypes.STRING, allowNull: false },
})

export const Basket = sequelize.define('basket', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

export const Product = sequelize.define('product', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	image: { type: DataTypes.STRING, allowNull: false },
	size: { type: DataTypes.STRING, allowNull: false },
	color: { type: DataTypes.STRING, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
})

export const ProductType = sequelize.define('product_type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	color: { type: DataTypes.STRING, allowNull: false },
})

export const Order = sequelize.define('order', {
	id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
	status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Order pending' }
})



Buyer.hasOne(Basket)
Basket.belongsTo(Buyer, { onDelete: 'CASCADE' })

Buyer.hasOne(Order)
Order.belongsTo(Buyer, { onDelete: 'CASCADE' })

Basket.belongsToMany(Product, { through: 'basket_product' })
Product.belongsToMany(Basket, { through: 'basket_product' })

ProductType.hasMany(Product)
Product.belongsTo(ProductType)
