import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'


let questionsRepository: InMemoryQuestionsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase // SUT - System under test

describe("Comment on a question: ", () => {
  beforeEach(() => {
      questionsRepository = new InMemoryQuestionsRepository()
      questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(questionsRepository, questionCommentsRepository)
  })

  it ("should be able to comment on a question", async () => {

    await questionsRepository.create(makeQuestion({}, new UniqueEntityID("test-id")))

    await sut.execute({
        questionId: "test-id",
        authorId: "author-id",
        content: "test"
    })

    expect(questionCommentsRepository.items[0].content).toEqual("test")
  })
})

