import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let repository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase // SUT - System under test

describe("Create question: ", () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(repository)
  })

  it ('should be able to create a question', async () => {
    const { answer } = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Fake content",
    })
  
    expect(answer.id).toBeTruthy()
  })
})

