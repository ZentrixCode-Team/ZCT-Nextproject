export type TicketReply = {
  id: number;
  documentId: string;
  message: string;
  isFromSupport: boolean;
  isRead: boolean;
  createdAt: string;
};

export type Ticket = {
  id: number;
  documentId: string;
  title: string;
  message: string;
  priority: "low" | "medium" | "high";
  ticketStatus: "open" | "in_progress" | "closed";
  createdAt: string;
  ticket_replies?: TicketReply[];
};