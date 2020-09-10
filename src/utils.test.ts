import {convertValue, limitDecimal} from "./utils";

describe("convertValue", () => {
    it("should return a mult of a x b", () => {
        expect(convertValue(12, 2)).toBe(24)
    })
})

describe("limitDecimal", () => {
    it("should truncate string with more than 2 decimals", () => {
        expect(limitDecimal('10.123456')).toBe("10.12")
    })
    it("should return the same value if doesn't have a decimal", () => {
        expect(limitDecimal('1023456')).toBe("1023456")
    })
})
