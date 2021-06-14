import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatusBase } from "../task-status.enum";
// import { TaskStatus } from "../tasks.model";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatusBase)
    status?: TaskStatusBase;
    
    @IsOptional()
    @IsString()
    search?: string;
}