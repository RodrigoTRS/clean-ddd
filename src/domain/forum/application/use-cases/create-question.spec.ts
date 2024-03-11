import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let repository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase // SUT - System under test

describe("Create question: ", () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(repository)
  })

  it ('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "Fake title",
      content: "Fake content",
    })
  
    expect(question.id).toBeTruthy()
  })
})

