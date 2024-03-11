import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let repository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase // SUT - System under test

describe("Delete question: ", () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(repository)
  })

  it ('should be able to delete a question', async () => {
    const newQuestion = makeQuestion()

    await repository.create(newQuestion)

    await sut.execute({
        authorId: newQuestion.authorId.toString(),
        questionId: newQuestion.id.toString()
    })
  
    expect(repository.items).toHaveLength(0)
  })

  it ('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
        authorId: new UniqueEntityID("user-02")
    })

    await repository.create(newQuestion)

    expect(async () => {
        return await sut.execute({
            authorId: "user-01",
            questionId: newQuestion.id.toString()
        })}).rejects.toBeInstanceOf(Error)
    })
})

