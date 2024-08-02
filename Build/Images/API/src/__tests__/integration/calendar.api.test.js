const { checkEventName, checkEventDescription, checkEventStartDate, checkEventEndDate } = require('../../helpers/endpointHelpers.js');

test("checking event names", () =>{

expect(checkEventName("")).toBe(false)
expect(checkEventName(null)).toBe(false)
expect(checkEventName(undefined)).toBe(false)
expect(checkEventName("i")).toBe(false)
expect(checkEventName(1)).toBe(false)
expect(checkEventName("bfiuewGHFUIEWRHWAIUNHCUKSJDNFYUWEIBFUBDUDJSKHFDIUWEHFWBFJKSDbFKJBWEiu")).toBe(false)

expect(checkEventName("gaming")).toBe(true)
expect(checkEventName("watching tv")).toBe(true)

})

test("checking event description", () =>{

expect(checkEventDescription("")).toBe(false)
expect(checkEventDescription(null)).toBe(false)
expect(checkEventDescription(undefined)).toBe(false)
expect(checkEventDescription("i")).toBe(false)
expect(checkEventDescription(1)).toBe(false)

expect(checkEventDescription("gaming")).toBe(true)
expect(checkEventDescription("watching tv")).toBe(true)

})

test("checking event start date", () =>{

expect(checkEventStartDate(null)).toBe(false)
expect(checkEventStartDate(undefined)).toBe(false)
expect(checkEventStartDate(1)).toBe(false)
expect(checkEventStartDate("string")).toBe(false)

})

test("checking event end date", () =>{

expect(checkEventEndDate(null)).toBe(false)
expect(checkEventEndDate(undefined)).toBe(false)
expect(checkEventEndDate(1)).toBe(false)
expect(checkEventEndDate("string")).toBe(false)

})