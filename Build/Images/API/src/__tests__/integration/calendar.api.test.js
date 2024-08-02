const {checkEventName} = require('./../.../helpers/endpointHelpers.js')

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