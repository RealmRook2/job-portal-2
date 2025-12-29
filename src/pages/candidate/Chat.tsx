import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, Search, Check, CheckCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState("");

  const hrAdmins = [
    {
      id: 1,
      name: "Aravind Kumar",
      role: "HR - OMR, Chennai",
      lastMessage: "Thank you for your interest. We'll review your application.",
      time: "2:30 PM",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Priya Menon",
      role: "HR - Velachery, Chennai",
      lastMessage: "Your interview is scheduled for next week.",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Rajesh Iyer",
      role: "HR - Anna Nagar, Chennai",
      lastMessage: "We have reviewed your profile. Let's discuss further.",
      time: "2 days ago",
      unread: 1,
      online: true,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "hr",
      text: "Hello! Thank you for applying to our Senior Software Engineer position.",
      time: "10:00 AM",
      read: true,
    },
    {
      id: 2,
      sender: "candidate",
      text: "Thank you! I'm very interested in this role.",
      time: "10:05 AM",
      read: true,
    },
    {
      id: 3,
      sender: "hr",
      text: "Great! We've reviewed your application and would like to schedule an interview.",
      time: "10:10 AM",
      read: true,
    },
    {
      id: 4,
      sender: "hr",
      text: "Thank you for your interest. We'll review your application.",
      time: "2:30 PM",
      read: true,
    },
  ];

  const selectedHR = hrAdmins.find(hr => hr.id === selectedChat);

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">Chat with HR</h1>
            <p className="text-xl text-muted-foreground">Connect with HR professionals from Chennai</p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - HR List */}
            <Card className="apple-card border-0 lg:col-span-1">
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search HR..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="divide-y">
                  {hrAdmins.map((hr) => (
                    <button
                      key={hr.id}
                      onClick={() => setSelectedChat(hr.id)}
                      className={`w-full p-4 text-left hover:bg-secondary transition-colors ${
                        selectedChat === hr.id ? "bg-secondary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>{hr.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm truncate">{hr.name}</p>
                            {hr.online && (
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{hr.role}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{hr.lastMessage}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">{hr.time}</span>
                            {hr.unread > 0 && (
                              <Badge variant="default" className="text-xs">
                                {hr.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="apple-card border-0 lg:col-span-3">
              <CardContent className="p-0 flex flex-col h-[600px]">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {selectedHR?.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedHR?.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedHR?.role}</p>
                    </div>
                  </div>
                  {selectedHR?.online && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Online
                    </Badge>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === "candidate" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${msg.sender === "candidate" ? "order-2" : ""}`}>
                        <div className={`rounded-2xl p-3 ${
                          msg.sender === "candidate"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                          msg.sender === "candidate" ? "justify-end" : "justify-start"
                        }`}>
                          <span>{msg.time}</span>
                          {msg.sender === "candidate" && (
                            msg.read ? (
                              <CheckCheck className="w-3 h-3" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      className="flex-1"
                    />
                    <Button onClick={handleSend} size="icon">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

