import { AnswerQuestionUseCase } from "./answer-question-use-case";
import { test, expect } from "vitest";

test("Create an answer", () => {
  const useCase = new AnswerQuestionUseCase();
  const answer = useCase.execute({
    questionId: "1",
    instructorId: "1",
    content: "answer",
  });

  expect(answer.content).toEqual("answer");
});
