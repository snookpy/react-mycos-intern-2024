export interface HomeworkProduct {
	price: number
	name: string
	isIncludeTax: boolean
}

export interface ExtraHomeworkProduct extends HomeworkProduct {
	country?: string
	discount?: number
}

export interface NonDecimalProduct extends HomeworkProduct {
    isNonDecimalPrice: boolean
}

export const homeworkProducts: HomeworkProduct[] = [
	{ price: 45.99, name: "Coffee Maker", isIncludeTax: false },
	{ price: 120.0, name: "Bluetooth Speaker", isIncludeTax: true },
	{ price: 75.5, name: "Electric Kettle", isIncludeTax: false },
	{ price: 22.25, name: "Desk Lamp", isIncludeTax: true },
	{ price: 15.0, name: "Notebook Set", isIncludeTax: false },
]

/**
 * Add field isNonDecimalPrice to all product and return new array of Products
 * example price is 120.0, isNonDecimalPrice is true
 * example price is 15.5, isNonDecimalPrice is false
 */
export const addIsNonDecimalPrice = (
	products: HomeworkProduct[]
): NonDecimalProduct[] => {
	const result: NonDecimalProduct[] = products.map((product) => 
		product.price % 1 === 0 ? { ...product, isNonDecimalPrice: true } : { ...product, isNonDecimalPrice: false })
	return result
}

/**
 * convert all product name to uppercase and return new array
 */
export const productNameUppercase = (
	products: HomeworkProduct[]
): HomeworkProduct[] => {
	return products.map((product) => ({ ...product, name: product.name.toUpperCase() }))
}

/**
 * add 10% tax to not include tax products only return with new product array
 */
export const addTenTaxToNonIncludeTaxProduct = (
	products: HomeworkProduct[]
): HomeworkProduct[] => {
	return products.map((product) => product.isIncludeTax ? product : { ...product, price: product.price * 1.1 })
}

/**
 * return new array with products price over 50 only
 */
export const priceOver50 = (products: HomeworkProduct[]): HomeworkProduct[] => {
	return products.filter((product) => product.price > 50)
}

/**
 * add country: 'china' field to product which not include tax
 * add discount: 0.10 field to product which include tax
 * return new array of products
 * example { price: 120.0, name: "Bluetooth Speaker", isIncludeTax: false, country: "china" }
 * example { price: 30.0, name: "Desk Lamp", isIncludeTax: true, discount: 0.10 }
 */
export const addCountryToExcludeTax = (
	products: HomeworkProduct[]
): ExtraHomeworkProduct[] => {
	return products.map((product) => product.isIncludeTax ? { ...product, discount: 0.10 } : { ...product, country: "china" })
}

/**
 * sum price of include tax products only
 */
export const sumPriceIncludeTax = (
	products: HomeworkProduct[]
): number => {
	return products.reduce((acc, product) => product.isIncludeTax ? acc + product.price : acc, 0)
}
