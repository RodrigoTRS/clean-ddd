import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let repository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase // SUT - System under test

describe("Get question by slug: ", () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(repository)
  })

  it ('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
        slug: Slug.create("example-question")
    })

    await repository.create(newQuestion)

    const { question } = await sut.execute({ slug: "example-question" })
  
    expect(question.id).toBeTruthy()
  })
})

