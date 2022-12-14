import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiConflictResponse } from '@nestjs/swagger';
import { ProcoreEventBus } from '@common/messaging/adapters/eventBus.service';
import { ProjectRepository } from '../project.repository';
import { VCSUpdatedRepository } from '../vcsupdated.repository';


export const serviceUpdatedWebhookEndpoint = "serviceupdated";


// based on https://gist.github.com/gjtorikian/5171861 as a sample Github webhook payload
export type Commit = {
    added: [];
    timestamp: string;
};
export type GithubWebhookPayload = { // 
    beforeSha: string;
    afterSha: string;
    commitTimestamp: Timestamp;
    commits: Commit[];
    repository: {
        name: string;
    };
};

export type Timestamp = number;

export type ServiceUpdated = {
    updateCount: number;
    initialCommit: Timestamp;
    timestamp: Timestamp;
}

@Controller('github-webhook')
export class GithubWebhookController {
    constructor(private readonly eventMessenger: ProcoreEventBus, 
        private readonly projectRepo: ProjectRepository,
        private readonly eventRepo: VCSUpdatedRepository){}

    @Post(serviceUpdatedWebhookEndpoint)
    @HttpCode(201)
    @ApiOperation({
        summary: 'Processes service updated webhook events'
    })
    @ApiCreatedResponse({ description: 'User successfully created.' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @ApiConflictResponse({ description: '' })
    async serviceUpdated(@Body() payload: GithubWebhookPayload): Promise<void>{
        // persist step
        const {repository: {name}, commits: [initialCommit]} = payload;

        // use prisma to load the Project for associating with UpdateEvent
        let project = await this.projectRepo.getByName(name); // find project
        if(!project){
           project = await this.projectRepo.save(name);
        }
        const events = await this.eventRepo.getByProjectId(project.id);

        // associate event with project
        const vcsUpdatedEvent = await this.eventRepo.save({
            initialCommit: (new Date(initialCommit.timestamp)).getTime(),
            projectId: project.id
        });

        return await this.eventMessenger.publish(vcsUpdatedEvent);
    }
}
