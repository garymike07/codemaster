import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get or create a conversation between two users
export const getOrCreateConversation = mutation({
  args: {
    participantId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser) throw new Error("User not found");

    // Check if conversation already exists
    const conversations = await ctx.db
      .query("conversations")
      .collect();

    const existingConversation = conversations.find((conv) => {
      const participants = conv.participants;
      return (
        participants.length === 2 &&
        participants.includes(currentUser._id) &&
        participants.includes(args.participantId)
      );
    });

    if (existingConversation) {
      return existingConversation._id;
    }

    // Create new conversation
    const conversationId = await ctx.db.insert("conversations", {
      participants: [currentUser._id, args.participantId],
      lastMessageAt: Date.now(),
    });

    return conversationId;
  },
});

// Get all conversations for current user
export const getConversations = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser) return [];

    const allConversations = await ctx.db
      .query("conversations")
      .withIndex("by_lastMessage")
      .order("desc")
      .collect();

    // Filter conversations where current user is a participant
    const userConversations = allConversations.filter((conv) =>
      conv.participants.includes(currentUser._id)
    );

    // Enrich with participant info and unread count
    const enrichedConversations = await Promise.all(
      userConversations.map(async (conv) => {
        const otherParticipantId = conv.participants.find(
          (p) => p !== currentUser._id
        );
        const otherUser = otherParticipantId
          ? await ctx.db.get(otherParticipantId)
          : null;

        // Count unread messages
        const unreadMessages = await ctx.db
          .query("messages")
          .withIndex("by_conversation", (q) => q.eq("conversationId", conv._id))
          .filter((q) =>
            q.and(
              q.eq(q.field("toUserId"), currentUser._id),
              q.eq(q.field("isRead"), false)
            )
          )
          .collect();

        return {
          ...conv,
          otherParticipant: otherUser
            ? {
                _id: otherUser._id,
                name: otherUser.name,
                email: otherUser.email,
                avatarUrl: otherUser.avatarUrl,
                role: otherUser.role,
              }
            : null,
          unreadCount: unreadMessages.length,
        };
      })
    );

    return enrichedConversations;
  },
});

// Get messages for a conversation
export const getMessages = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser) return [];

    // Verify user is participant
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || !conversation.participants.includes(currentUser._id)) {
      return [];
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .order("asc")
      .collect();

    // Enrich with sender info
    const enrichedMessages = await Promise.all(
      messages.map(async (msg) => {
        const sender = msg.fromUserId ? await ctx.db.get(msg.fromUserId) : null;
        return {
          ...msg,
          senderName: sender?.name || "Unknown",
          senderAvatar: sender?.avatarUrl,
          isOwn: msg.fromUserId === currentUser._id,
        };
      })
    );

    return enrichedMessages;
  },
});

// Send a message
export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser) throw new Error("User not found");

    // Verify user is participant
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || !conversation.participants.includes(currentUser._id)) {
      throw new Error("Not a participant of this conversation");
    }

    const otherParticipantId = conversation.participants.find(
      (p) => p !== currentUser._id
    );

    // Create message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      fromUserId: currentUser._id,
      toUserId: otherParticipantId,
      subject: "Chat message",
      content: args.content,
      isRead: false,
      createdAt: Date.now(),
    });

    // Update conversation
    await ctx.db.patch(args.conversationId, {
      lastMessageAt: Date.now(),
      lastMessagePreview:
        args.content.length > 50
          ? args.content.substring(0, 50) + "..."
          : args.content,
    });

    return messageId;
  },
});

// Mark messages as read
export const markAsRead = mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser) throw new Error("User not found");

    // Get unread messages in this conversation for current user
    const unreadMessages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .filter((q) =>
        q.and(
          q.eq(q.field("toUserId"), currentUser._id),
          q.eq(q.field("isRead"), false)
        )
      )
      .collect();

    // Mark all as read
    for (const msg of unreadMessages) {
      await ctx.db.patch(msg._id, { isRead: true });
    }

    return { markedCount: unreadMessages.length };
  },
});

// Get total unread message count
export const getUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return 0;

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser) return 0;

    const unreadMessages = await ctx.db
      .query("messages")
      .withIndex("by_recipient", (q) => q.eq("toUserId", currentUser._id))
      .filter((q) => q.eq(q.field("isRead"), false))
      .collect();

    return unreadMessages.length;
  },
});

// Get contacts (teachers for students, students for teachers)
export const getContacts = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser) return [];

    if (currentUser.role === "teacher") {
      // Get all students assigned to this teacher
      const teacherStudents = await ctx.db
        .query("teacherStudents")
        .withIndex("by_teacher", (q) => q.eq("teacherId", currentUser._id))
        .collect();

      const students = await Promise.all(
        teacherStudents.map(async (ts) => {
          const student = await ctx.db.get(ts.studentId);
          return student
            ? {
                _id: student._id,
                name: student.name,
                email: student.email,
                avatarUrl: student.avatarUrl,
                role: student.role,
              }
            : null;
        })
      );

      return students.filter((s) => s !== null);
    } else {
      // Get all teachers for this student
      const studentTeachers = await ctx.db
        .query("teacherStudents")
        .withIndex("by_student", (q) => q.eq("studentId", currentUser._id))
        .collect();

      const teachers = await Promise.all(
        studentTeachers.map(async (st) => {
          const teacher = await ctx.db.get(st.teacherId);
          return teacher
            ? {
                _id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                avatarUrl: teacher.avatarUrl,
                role: teacher.role,
              }
            : null;
        })
      );

      return teachers.filter((t) => t !== null);
    }
  },
});
