import {
    addCountryToExcludeTax,
	addIsNonDecimalPrice,
	addTenTaxToNonIncludeTaxProduct,
	homeworkProducts,
	priceOver50,
	productNameUppercase,
    sumPriceIncludeTax,
} from "./basicAssignment"

describe.skip("basicAssignment", () => {
	const cloneProd = [...homeworkProducts.map((x) => ({ ...x }))]

	afterEach(() => {
		expect(cloneProd).toEqual(homeworkProducts)
	})

	test("addIsNonDecimalPrice", () => {
		// Act
		const results = addIsNonDecimalPrice(cloneProd)

		// Assert
		expect(results[0].isNonDecimalPrice).toEqual(false)
		expect(results[1].isNonDecimalPrice).toEqual(true)
		expect(results[2].isNonDecimalPrice).toEqual(false)
		expect(results[3].isNonDecimalPrice).toEqual(false)
		expect(results[4].isNonDecimalPrice).toEqual(true)
	})

	test("productNameUppercase", () => {
		// Act
		const results = productNameUppercase(cloneProd)

		// Assert
		expect(results[0].name).toEqual("COFFEE MAKER")
		expect(results[1].name).toEqual("BLUETOOTH SPEAKER")
		expect(results[2].name).toEqual("ELECTRIC KETTLE")
		expect(results[3].name).toEqual("DESK LAMP")
		expect(results[4].name).toEqual("NOTEBOOK SET")
	})

	test("addTenTaxToNonIncludeTaxProduct", () => {
		// Act
		const results = addTenTaxToNonIncludeTaxProduct(cloneProd)

		// Assert
		expect(results[0].price).toBeCloseTo(50.59, 2)
		expect(results[1].price).toEqual(120.0)
		expect(results[2].price).toBeCloseTo(83.05, 2)
		expect(results[3].price).toEqual(22.25)
		expect(results[4].price).toBeCloseTo(16.5, 2)
	})

    test("priceOver50", () => {
		// Act
		const results = priceOver50(cloneProd)

		// Assert
		expect(results[0].name).toEqual('Bluetooth Speaker')
		expect(results[1].name).toEqual('Electric Kettle')
		expect(results[3]).toBeFalsy()
	})

    test("addCountryToExcludeTax", () => {
		// Act
		const results = addCountryToExcludeTax(cloneProd)

		// Assert
		expect(results[0].country).toEqual("china")
		expect(results[1].discount).toEqual(0.10)
		expect(results[2].country).toEqual("china")
		expect(results[3].discount).toEqual(0.10)
		expect(results[4].country).toEqual("china")
	})

    test("sumPriceIncludeTax", () => {
		// Act
		const result = sumPriceIncludeTax(cloneProd)

		// Assert
		expect(result).toBeCloseTo(142.25, 2)
	})
})
