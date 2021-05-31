const { WebhookServer } = require('simple-webhooks');
const dependencies = require('./dependencies');
const build = require('./build');

const SECRET = process.env.WEBHOOK_SECRET || 'bad-secret-remove-immediately!';

const webhookServer = new WebhookServer({
  secret: SECRET,
  job: data => buildGatsby(data),
});

webhookServer.listen();

async function bootstrap() {
  await dependencies();
  await build();
}

bootstrap()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
