import { BaseService } from "./baseService";

class ChatService extends BaseService {
  getConversation = (limit, page, id, isUser, isPartner = 0) => {
    return this.get(
      `/api/chat/conversation-user?isUser=${isUser}&isPartner=${isPartner}&id=${id}&page=${page}&limit=${limit}`
    );
  };
  createConversation = (PartnerId, UserId, AdminId = null) => {
    return this.post(`/api/chat/conversation-user`, {
      PartnerId,
      UserId,
      AdminId,
    });
  };
  getAllConversation = (id, partner) => {
    return this.get(
      `/api/chat/conversation-user-all?partner=${partner}&id=${id}`
    );
  };
  getConversationVsAdmin = (userId, partner, AdminId) => {
    return this.get(
      `/api/chat/conversation-with-admin?id=${userId}&partnerWithAdmin=${partner}&AdminId=${AdminId}`
    );
  };
  getMesVsAdmin = (limit, page, ConversationId) => {
    return this.get(
      `/api/chat/message-user?page=${page}&limit=${limit}&ConversationId=${ConversationId}`
    );
  };
  getMessByConversationId = (limit, page, conversationId) => {
    return this.get(
      `/api/chat/message-user?page=${page}&limit=${limit}&ConversationId=${conversationId}`
    );
  };
  getConversationById = (conversationId) => {
    return this.get(`/api/chat/conversation-user/${conversationId}`);
  };
  sendMessage = (message) => {
    return this.post(`/api/chat/message-user`, message);
  };
  sendMessageAdmin = (message) => {
    return this.post(`/api/chat/message`, message);
  };
  readMessage = (id) => {
    return this.patch(`/api/chat/message-user`, {
      id,
    });
  };
  readMessageAdmin = (id) => {
    return this.patch(`/api/chat/message`, {
      id,
    });
  };
  getListPartner = () => {
    return this.get(`/api/notification/user?option=0`);
  };
}

export const chatService = new ChatService();
