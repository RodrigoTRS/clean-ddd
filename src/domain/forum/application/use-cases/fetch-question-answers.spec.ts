import { makeQuestion } from 'test/factories/make-question'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let repository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase // SUT - System under test

describe("Fetch question answers: ", () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(repository)
  })

  it("should be able to fetch question answers", async () => {
    await repository.create(makeAnswer({ questionId: new UniqueEntityID("question-id")}))
    await repository.create(makeAnswer({ questionId: new UniqueEntityID("question-id")}))
    await repository.create(makeAnswer({ questionId: new UniqueEntityID("question-id")}))
    const { answers } = await sut.execute({
        questionId: "question-id",
        page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it ("should be able to fetch paginated recent questions", async () => {
    for (let i = 0; i < 22; i++) {
      await repository.create(makeAnswer({ questionId: new UniqueEntityID("question-id")}))
    }

    const { answers } = await sut.execute({
        questionId: "question-id",
        page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})

