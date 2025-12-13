"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Mail, User, Calendar, X } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const initialMessages: ContactMessage[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Product Inquiry",
    message: "I'm interested in the MacBook Pro M3. Can you provide more details about the warranty and shipping options?",
    date: "2025-12-05",
    read: false
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Order Issue",
    message: "My order #ORD-002 hasn't arrived yet. It's been 10 days since I placed the order. Can you help me track it?",
    date: "2025-12-04",
    read: true
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    subject: "Partnership Opportunity",
    message: "We are a technology distributor interested in partnering with your company. Would you be open to discussing potential collaboration?",
    date: "2025-12-03",
    read: false
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    subject: "Technical Support",
    message: "I'm having trouble with the Sony headphones I purchased. The noise cancelling feature doesn't seem to be working properly.",
    date: "2025-12-02",
    read: true
  }
];

export function AdminContactMessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [archivedMessages, setArchivedMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (activeTab === "active") {
      setMessages(messages.map(m =>
        m.id === message.id ? { ...m, read: true } : m
      ));
    }
  };

  const handleReply = () => {
    if (selectedMessage) {
      setShowReplyModal(true);
      setReplyText("");
    }
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      alert(`Reply sent to: ${selectedMessage?.email}\n\nMessage: ${replyText}`);
      setShowReplyModal(false);
      setReplyText("");
    } else {
      alert("Please enter a reply message!");
    }
  };

  const handleArchive = () => {
    if (selectedMessage) {
      // Move to archived
      setArchivedMessages([...archivedMessages, { ...selectedMessage, read: true }]);
      setMessages(messages.filter(m => m.id !== selectedMessage.id));
      setSelectedMessage(null);
      alert("Message archived successfully!");
    }
  };

  const handleRestore = () => {
    if (selectedMessage) {
      // Move back to active
      setMessages([...messages, selectedMessage]);
      setArchivedMessages(archivedMessages.filter(m => m.id !== selectedMessage.id));
      setSelectedMessage(null);
      alert("Message restored successfully!");
    }
  };

  const handleDeletePermanently = () => {
    if (selectedMessage && window.confirm("Are you sure you want to permanently delete this message?")) {
      setArchivedMessages(archivedMessages.filter(m => m.id !== selectedMessage.id));
      setSelectedMessage(null);
      alert("Message deleted permanently!");
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;
  const currentMessages = activeTab === "active" ? messages : archivedMessages;

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-white text-3xl mb-2">Contact Messages</h1>
          <p className="text-slate-400">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setActiveTab("active");
              setSelectedMessage(null);
            }}
            className={`px-6 py-3 rounded-lg transition-all ${activeTab === "active"
              ? "bg-cyan-500 text-white"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
          >
            Active Messages ({messages.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("archived");
              setSelectedMessage(null);
            }}
            className={`px-6 py-3 rounded-lg transition-all ${activeTab === "archived"
              ? "bg-cyan-500 text-white"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
          >
            Archived ({archivedMessages.length})
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="space-y-4">
            {currentMessages.length === 0 ? (
              <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
                <Mail className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">
                  {activeTab === "active" ? "No active messages" : "No archived messages"}
                </p>
              </div>
            ) : (
              currentMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleMessageClick(message)}
                  className={`bg-slate-800 rounded-xl p-5 cursor-pointer hover:bg-slate-700 transition-all border ${!message.read ? 'border-l-4 border-l-cyan-500 border-t-slate-700 border-r-slate-700 border-b-slate-700' : 'border-slate-700'
                    } ${selectedMessage?.id === message.id ? 'ring-2 ring-cyan-500' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white">{message.name}</h3>
                        <p className="text-slate-400 text-sm">{message.email}</p>
                      </div>
                    </div>
                    {!message.read && (
                      <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>

                  <h4 className="text-white mb-2">{message.subject}</h4>
                  <p className="text-slate-400 text-sm line-clamp-2">{message.message}</p>

                  <div className="flex items-center gap-2 mt-3 text-slate-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {message.date}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:sticky lg:top-24 h-fit">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg">{selectedMessage.name}</h3>
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {selectedMessage.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-slate-400 hover:text-white transition-colors lg:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Subject:</p>
                    <h2 className="text-white text-xl">{selectedMessage.subject}</h2>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-2">Message:</p>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <p className="text-slate-200 leading-relaxed">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-sm pt-4 border-t border-slate-700">
                    <Calendar className="w-4 h-4" />
                    Received on {selectedMessage.date}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {activeTab === "active" ? (
                    <>
                      <button
                        onClick={handleReply}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-all"
                      >
                        Reply
                      </button>
                      <button
                        onClick={handleArchive}
                        className="px-6 bg-slate-700 hover:bg-slate-600 text-slate-300 py-3 rounded-lg transition-all"
                      >
                        Archive
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleRestore}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-all"
                      >
                        Restore
                      </button>
                      <button
                        onClick={handleDeletePermanently}
                        className="px-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
                <Mail className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-8 w-96">
            <h2 className="text-white text-xl mb-4">Reply to {selectedMessage?.name}</h2>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full h-32 bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-slate-200 leading-relaxed"
              placeholder="Type your reply here..."
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleSendReply}
                className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-6 rounded-lg transition-all"
              >
                Send
              </button>
              <button
                onClick={() => setShowReplyModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 py-3 px-6 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminContactMessagesPage;