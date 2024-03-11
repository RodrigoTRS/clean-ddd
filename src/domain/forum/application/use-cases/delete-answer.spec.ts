import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'

let repository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase // SUT - System under test

describe("Delete answer: ", () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(repository)
  })

  it ('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer()

    await repository.create(newAnswer)

    await sut.execute({
        authorId: newAnswer.authorId.toString(),
        answerId: newAnswer.id.toString()
    })
  
    expect(repository.items).toHaveLength(0)
  })

  it ('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({
        authorId: new UniqueEntityID("user-02")
    })

    await repository.create(newAnswer)

    expect(async () => {
        return await sut.execute({
            authorId: "user-01",
            answerId: newAnswer.id.toString()
        })}).rejects.toBeInstanceOf(Error)
    })
})

