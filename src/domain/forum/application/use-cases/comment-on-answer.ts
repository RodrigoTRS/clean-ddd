import { AnswersRepository } from "../repositories/answers-repository";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface CommentOnAnswerUseCaseRequest {
    answerId: string;
    authorId: string;
    content: string;
}

interface CommentOnAnswerUseCaseResponse {
    answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
) {}

  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if(!answer) {
        throw new Error("Resource not found.")
    }

    const answerComment = AnswerComment.create({
        answerId: answer.id,
        authorId: new UniqueEntityID(authorId),
        content
    })

    await this.answerCommentsRepository.create(answerComment)


    return { answerComment }
  }
}
