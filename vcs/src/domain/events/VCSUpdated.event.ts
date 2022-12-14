export const SERVICE_UPDATED = "vcs.service.updated";
export class VCSUpdated {
    constructor(public readonly projectName: string, 
            public readonly firstCommitTimestamp: number,
            public readonly updateTimestamp: number
        ){}
}
