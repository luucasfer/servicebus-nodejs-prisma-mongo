const { delay, ServiceBusClient, ServiceBudMessage } = require("@azure/service-bus");
import { InsertMessageUseCase } from './modules/consumer/consumer.usecase';

const serviceBusConnectionString = "Endpoint=sb://sbnsitest.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=+/psKfhyNVQBj6xWDaHpAMMcfEggFxrmx+ASbFSvfBc=";
const consumerQueue = "fila-pagonxt";

async function main() {
  const serviceBusClient = new ServiceBusClient(serviceBusConnectionString);
  const consumer = serviceBusClient.createReceiver(consumerQueue);

  console.log("Aguardando mensagens ...");

  consumer.subscribe({
    processMessage: async (message: any) => {
        console.log(`Mensagem recebida: ${message.body}`);

        // Salvar a mensagem no MongoDB
        const useCase = new InsertMessageUseCase();
        await useCase.execute({received: message.body})
      
      // Marcar a mensagem como concluída para removê-la da fila
        //await message.complete();
        // await consumer.close();
        // await serviceBusClient.close();
    },
    processError: async (err: any) => {
        console.error("Erro ao processar a mensagem:", err);
    },
  });
}

main()
    .catch(async (err) => {
        console.error("Erro ao iniciar o consumidor:", err);
        process.exit(1)
});

