import { factories } from '@strapi/strapi';

const UID = 'api::ticket-reply.ticket-reply';

export default factories.createCoreController(UID, ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();

    const { message, ticket } = ctx.request.body?.data ?? {};
    if (typeof message !== 'string' || !message.trim() || typeof ticket !== 'string') {
      return ctx.badRequest('message and ticket are required');
    }

    const ownTicket = await strapi.documents('api::ticket.ticket').findFirst({
      filters: { documentId: ticket, user: { documentId: user.documentId } },
    });
    if (!ownTicket) return ctx.forbidden();

    const entity = await strapi.documents(UID).create({
      data: {
        message: message.trim(),
        ticket: ownTicket.documentId,
        author: user.documentId,
        isFromSupport: false,
        isRead: false,
      },
    });

    const clean = await strapi.contentAPI.sanitize.output(entity, strapi.contentType(UID), {
      auth: ctx.state.auth,
    });
    return { data: clean, meta: {} };
  },
}));