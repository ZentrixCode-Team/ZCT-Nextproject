export default {
  async afterCreate(event: { result: any }) {
    const { result } = event;

    try {
      await strapi.plugin('email').service('email').send({
        to: process.env.SUPPORT_EMAIL,
        subject: `New ticket: ${result.title}`,
        text: `Title: ${result.title}\nPriority: ${result.priority}\n\n${result.message}`,
      });
    } catch (err) {
      strapi.log.error('Ticket notification email failed', err);
    }
  },
};