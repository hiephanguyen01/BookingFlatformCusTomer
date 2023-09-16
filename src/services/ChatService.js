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
  getConversationVsAdmin = (participantId, partner) => {
    /**
     * Input:
     *  participantId <int>: UserId / PartnerId
     *  partner <boolean>: Is partner or not?
     *
     * Ouput:
     *  HTTP Get method
     */
    return this.get(
      `/api/chat/conversation-with-admin?id=${participantId}&partnerWithAdmin=${partner}`
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
  readMessage = (ConversationId) => {
    return this.patch(`/api/chat/message-user`, {
      ConversationId,
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

  // id: UserId || AdminId || PartnerId
  // role: "User" || "Admin" || "Partner"
  getTotalAmountOfConversationHasNewMess = (id, role) =>
    this.get(
      `/api/chat/conversation-user/count-conversation-has-new-mess?id=${id}&role=${role}`
    );

  /**
   * Input: memberId <int>, role <string>: "admin" || "partner" || "user"
   *
   * Output: HTTP request
   */
  getAllConversationId = (memberId, role) =>
    this.get(
      `/api/chat/conversation-user/all-ids?memberId=${memberId}&role=${role}`
    );

  deleteMessageForAllUserInRoom = (id) =>
    this.delete(`/api/chat/message-user/${id}`);
}

export const chatService = new ChatService();
