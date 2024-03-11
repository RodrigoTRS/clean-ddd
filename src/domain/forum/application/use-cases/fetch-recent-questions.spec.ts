import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let repository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase // SUT - System under test

describe("Fetch recent questions: ", () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(repository)
  })

  it("should be able to fetch recent questions", async () => {
    await repository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )
    await repository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )
    await repository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 23) }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it ("should be able to fetch paginated recent questions", async () => {
    for (let i = 0; i < 22; i++) {
      await repository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
  
})

