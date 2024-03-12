import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'


let answersRepository: InMemoryAnswersRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase // SUT - System under test

describe("Comment on a answer: ", () => {
  beforeEach(() => {
      answersRepository = new InMemoryAnswersRepository()
      answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(answersRepository, answerCommentsRepository)
  })

  it ("should be able to comment on a answer", async () => {

    await answersRepository.create(makeAnswer({}, new UniqueEntityID("test-id")))

    await sut.execute({
        answerId: "test-id",
        authorId: "author-id",
        content: "test"
    })

    expect(answerCommentsRepository.items[0].content).toEqual("test")
  })
})

