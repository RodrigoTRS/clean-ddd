import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let repository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase // SUT - System under test

describe("Get question by slug: ", () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(repository)
  })

  it ('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
        title: "Example question",
        slug: Slug.create("example-question"),
        authorId: new UniqueEntityID(),
        content: "Example content"
    })

    await repository.create(newQuestion)

    const { question } = await sut.execute({ slug: "example-question" })
  
    expect(question.id).toBeTruthy()
  })
})

