import { Either, left, right } from "./either"

function doSomething(shouldSuccess: boolean): Either<string, string> {
    if (shouldSuccess) {
        return right("success")
    } else {
        return left("error")
    }
}

test("Success result", () => {
    const result = doSomething(true)

    expect(result.isRight()).toEqual(true)
    expect(result.isLeft()).toEqual(false)

})


test("Error result", () => {
    const result = doSomething(false)

    expect(result.isLeft()).toEqual(true)
    expect(result.isRight()).toEqual(false)
})