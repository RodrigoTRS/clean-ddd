import { Answer } from '../forum/enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question-use-case'
import { test, expect } from 'vitest'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer): Promise<void> => {},
}

test('Create an answer', async () => {
  const useCase = new AnswerQuestionUseCase(fakeAnswersRepository)
  const answer = await useCase.execute({
    questionId: '1',
    instructorId: '1',
    content: 'answer',
  })

  expect(answer.content).toEqual('answer')
})
