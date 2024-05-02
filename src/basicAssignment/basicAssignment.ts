export interface HomeworkProduct {
  price: number;
  name: string;
  isIncludeTax: boolean;
}

export interface ExtraHomeworkProduct extends HomeworkProduct {
  country?: string;
  discount?: number;
}

export interface NonDecimalProduct extends HomeworkProduct {
  isNonDecimalPrice: boolean;
}

export const homeworkProducts: HomeworkProduct[] = [
  { price: 45.99, name: "Coffee Maker", isIncludeTax: false },
  { price: 120.0, name: "Bluetooth Speaker", isIncludeTax: true },
  { price: 75.5, name: "Electric Kettle", isIncludeTax: false },
  { price: 22.25, name: "Desk Lamp", isIncludeTax: true },
  { price: 15.0, name: "Notebook Set", isIncludeTax: false },
];

/**
 * Add field isNonDecimalPrice to all product and return new array of Products ไพรท์เป็นเศษส่วน เพิ่มฟิล
 * example price is 120.0, isNonDecimalPrice is true
 * example price is 15.5, isNonDecimalPrice is false
 */
export const addIsNonDecimalPrice = (
  products: HomeworkProduct[]
): NonDecimalProduct[] => {
  const productsWithNonDecimal: NonDecimalProduct[] = products.map(
    (product) => {
      const isNonDecimal = product.price % 1 == 0;
      return {
        ...product,
        isNonDecimalPrice: isNonDecimal,
      };
    }
  );
  return productsWithNonDecimal;
};

/**
 * convert all product name to uppercase and return new array
 */
export const productNameUppercase = (
  products: HomeworkProduct[]
): HomeworkProduct[] => {
  const upperProducts: HomeworkProduct[] = products.map((products) => {
    return {
      ...products,
      name: products.name.toUpperCase(),
    };
  });
  return upperProducts;
};

/**
 * add 10% tax to not include tax products only return with new product array
 */
export const addTenTaxToNonIncludeTaxProduct = (
  products: HomeworkProduct[]
): HomeworkProduct[] => {
  const productsAddTax: HomeworkProduct[] = products.map((product) => {
    if (!product.isIncludeTax) {
      const priceAddTax = product.price * 1.1;
      return {
        ...product,
        price: priceAddTax,
      };
    }
    return product;
  });
  return productsAddTax;
};

/**
 * return new array with products price over 50 only
 */
export const priceOver50 = (products: HomeworkProduct[]): HomeworkProduct[] => {
  const productOver50: HomeworkProduct[] = products.filter(
    (product) => product.price > 50
  );
  return productOver50;
};

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
  const updateCountryProducts: ExtraHomeworkProduct[] = products.map(
    (product) => {
      if (!product.isIncludeTax) {
        return {
          ...product,
          country: "china",
        };
      } else {
        return {
          ...product,
          discount: 0.1,
        };
      }
    }
  );
  return updateCountryProducts;
};

/**
 * sum price of include tax products only
 */
export const sumPriceIncludeTax = (products: HomeworkProduct[]): number => {
  const sum = products.reduce((result, currentProduct) => {
    if (currentProduct.isIncludeTax) {
      result += currentProduct.price;
    }
    return result;
  }, 0);

  return sum;
};
