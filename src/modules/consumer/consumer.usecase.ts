import { prismaClient } from "../../infra/database/prismaClient"

type InsertMessage = {
    received: string;
}


export class InsertMessageUseCase { 
    constructor() {}
    
    async execute(data: InsertMessage) {
        
        await prismaClient.teste.create({
            data: {
               received: data.received
            }
        })
    }
}
