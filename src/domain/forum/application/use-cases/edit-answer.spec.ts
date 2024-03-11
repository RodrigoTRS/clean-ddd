import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let repository: InMemoryAnswersRepository
let sut: EditAnswerUseCase // SUT - System under test

describe("Edit answer: ", () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(repository)
  })

  it ('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer()

    await repository.create(newAnswer)

    await sut.execute({
        authorId: newAnswer.authorId.toString(),
        answerId: newAnswer.id.toString(),
        content: "New content"
    })
  
    expect(repository.items[0]).toMatchObject({
        content: "New content"
    })
  })

  it ('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
        authorId: new UniqueEntityID("user-02")
    })

    await repository.create(newAnswer)

    expect(async () => {
        return await sut.execute({
            authorId: "user-01",
            answerId: newAnswer.id.toString(),
            content: "New content"
        })}).rejects.toBeInstanceOf(Error)
    })
})

