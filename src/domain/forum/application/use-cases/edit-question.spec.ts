import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let repository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase // SUT - System under test

describe("Edit question: ", () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(repository)
  })

  it ('should be able to edit a question', async () => {
    const newQuestion = makeQuestion()

    await repository.create(newQuestion)

    await sut.execute({
        authorId: newQuestion.authorId.toString(),
        questionId: newQuestion.id.toString(),
        title: "New Title",
        content: "New content"
    })
  
    expect(repository.items[0]).toMatchObject({
        title: "New Title",
        content: "New content"
    })
  })

  it ('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
        authorId: new UniqueEntityID("user-02")
    })

    await repository.create(newQuestion)

    expect(async () => {
        return await sut.execute({
            authorId: "user-01",
            questionId: newQuestion.id.toString(),
            title: "New Title",
            content: "New content"
        })}).rejects.toBeInstanceOf(Error)
    })
})

