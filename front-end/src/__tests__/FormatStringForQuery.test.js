

function FormatStringForQuery(string){
    return string.replace(/[^A-Za-z0-9\s]/g," ").replace(/\s{2,}/g, " ").trim().replaceAll(" ", "%20");
}


test("Test one:", () => {
    expect(FormatStringForQuery("hello world")).toBe("hello%20world");
})
test("Test two:", () => {
    expect(FormatStringForQuery("hello%world")).toBe("hello%20world");
})

test("Test three:", () => {
    expect(FormatStringForQuery("“!hello world")).toBe("hello%20world");
})

test("Test four", () => {
    expect(FormatStringForQuery(";hello?world!")).toBe("hello%20world");
})

test("Test five:", () => {
    expect(FormatStringForQuery("hello;world")).toBe("hello%20world");
})
test("Test six:", () => {
    expect(FormatStringForQuery("hello world?")).toBe("hello%20world");
})


