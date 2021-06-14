import { IsEnum } from "class-validator";
import { TaskStatusBase } from "../task-status.enum";
// import { TaskStatus } from "../tasks.model";

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatusBase)
    status: TaskStatusBase;
}