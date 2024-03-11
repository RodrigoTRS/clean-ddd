import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeQuestion } from 'test/factories/make-question'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answersRepository: InMemoryAnswersRepository
let questionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase // SUT - System under test

describe("Choose question's best answer: ", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(answersRepository, questionsRepository)
  })

  it ("should be able to set a question's best answer", async () => {

    const question =  makeQuestion()

    const answer = makeAnswer({
        questionId: question.id
    })

    await questionsRepository.create(question)
    await answersRepository.create(answer)

    await sut.execute({
        answerId: answer.id.toString(),
        authorId: question.authorId.toString()
    })
  
    expect(questionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it ("should not be able to set another user question's best answer", async () => {

    const question =  makeQuestion({
        authorId: new UniqueEntityID("author-01")
    })

    const answer = makeAnswer({
        questionId: question.id
    }, new UniqueEntityID("answer-01"))

    await questionsRepository.create(question)
    await answersRepository.create(answer)

    expect(async () => {
        return await sut.execute({
        answerId: "answer-01",
        authorId: "author-02"
    })}).rejects.toBeInstanceOf(Error)
    })
})

