import usePrimeNumber from "./usePrimeNumber"
import { act, renderHook } from "@testing-library/react"

describe.skip("usePrimeNumber", () => {
	test("initial fully return [isPrime, calFunction, inputNum];", () => {
		const { result } = renderHook(usePrimeNumber)

		expect(result.current).toEqual([
			expect.any(Boolean),
			expect.any(Function),
			expect.any(Number),
		])
	})

	describe("should check is Prime number correctly", () => {
		test("2 is prime", () => {
			// Arrange
			const num = 2
			const { result } = renderHook(usePrimeNumber)

			// Act
			act(() => {
				result.current[1](num)
			})

			// Assert
			expect(result.current[0]).toEqual(true)
			expect(result.current[2]).toEqual(num)
		})
		test("13 is prime", () => {
			// Arrange
			const num = 13
			const { result } = renderHook(usePrimeNumber)

			// Act
			act(() => {
				result.current[1](num)
			})

			// Assert
			expect(result.current[0]).toEqual(true)
			expect(result.current[2]).toEqual(num)
		})
		test("0 not prime", () => {
			// Arrange
			const num = 0
			const { result } = renderHook(usePrimeNumber)

			// Act
			act(() => {
				result.current[1](num)
			})

			// Assert
			expect(result.current[0]).toEqual(false)
			expect(result.current[2]).toEqual(num)
		})
		test("99 not prime", () => {
			// Arrange
			const num = 99
			const { result } = renderHook(usePrimeNumber)

			// Act
			act(() => {
				result.current[1](num)
			})

			// Assert
			expect(result.current[0]).toEqual(false)
			expect(result.current[2]).toEqual(num)
		})
		test("103 is prime", () => {
			// Arrange
			const num = 103
			const { result } = renderHook(usePrimeNumber)

			// Act
			act(() => {
				result.current[1](num)
			})

			// Assert
			expect(result.current[0]).toEqual(true)
			expect(result.current[2]).toEqual(num)
		})
		test("27 not prime", () => {
			// Arrange
			const num = 27
			const { result } = renderHook(usePrimeNumber)

			// Act
			act(() => {
				result.current[1](num)
			})

			// Assert
			expect(result.current[0]).toEqual(false)
			expect(result.current[2]).toEqual(num)
		})
		test("29 is prime", () => {
			// Arrange
			const num = 29
			const { result } = renderHook(usePrimeNumber)

			// Act
			act(() => {
				result.current[1](num)
			})

			// Assert
			expect(result.current[0]).toEqual(true)
			expect(result.current[2]).toEqual(num)
		})
		test("37 is prime", () => {
			// Arrange
			const num = 37
			const { result } = renderHook(usePrimeNumber)

			// Act
			act(() => {
				result.current[1](num)
			})

			// Assert
			expect(result.current[0]).toEqual(true)
			expect(result.current[2]).toEqual(num)
		})
	})
})
