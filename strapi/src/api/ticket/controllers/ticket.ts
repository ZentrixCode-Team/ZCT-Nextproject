import { factories } from '@strapi/strapi';

const UID = 'api::ticket.ticket';
const PRIORITIES = ['low', 'medium', 'high'];

export default factories.createCoreController(UID, ({ strapi }) => {
  const clean = (data: unknown, ctx: any) =>
    strapi.contentAPI.sanitize.output(data, strapi.contentType(UID), {
      auth: ctx.state.auth,
    });

  return {
    async create(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized();

      const { title, message, priority } = ctx.request.body?.data ?? {};
      if (typeof title !== 'string' || typeof message !== 'string' || !title.trim() || !message.trim()) {
        return ctx.badRequest('title and message are required');
      }

      const entity = await strapi.documents(UID).create({
        data: {
          title: title.trim(),
          message: message.trim(),
          priority: PRIORITIES.includes(priority) ? priority : 'medium',
          ticketStatus: 'open',
          user: user.documentId,
        },
      });

      return { data: await clean(entity, ctx), meta: {} };
    },

    async find(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized();

      const entities = await strapi.documents(UID).findMany({
        filters: { user: { documentId: user.documentId } },
        populate: { ticket_replies: true },
        sort: 'createdAt:desc',
      });

      return { data: await clean(entities, ctx), meta: {} };
    },

    async findOne(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized();

      const entity = await strapi.documents(UID).findFirst({
        filters: { documentId: ctx.params.id, user: { documentId: user.documentId } },
        populate: { ticket_replies: true },
      });
      if (!entity) return ctx.notFound();

      return { data: await clean(entity, ctx), meta: {} };
    },
  };
});