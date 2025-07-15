import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FileText, MessageSquare, Upload, MicOff, Mic, Video, VideoOff, UserPlus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: number;
}

interface Document {
  id: string;
  name: string;
  url: string;
  uploadedBy: string;
  timestamp: number;
  type: 'evidence' | 'petition' | 'affidavit' | 'judgment' | 'other';
}

interface CaseDetails {
  id: string;
  title: string;
  case_number: string;
  client_name: string;
  complexity: string;
  status: string;
  description: string;
  next_hearing?: string;
}

export function Courtroom() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const location = useLocation();
  const caseDetails = location.state?.caseDetails as CaseDetails | undefined;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [currentUser] = useState({
    id: 'lawyer-123',
    name: 'Adv. Sanjay Sharma',
    role: 'lawyer'
  });
  const [participants, setParticipants] = useState([
    { id: 'judge-1', name: 'Hon. Justice Mehta', role: 'judge', isPresent: true },
    { id: 'lawyer-123', name: 'Adv. Sanjay Sharma', role: 'lawyer', isPresent: true },
    { id: 'opposing-counsel', name: 'Adv. Priya Desai', role: 'opposing-counsel', isPresent: true },
    { id: 'client-1', name: caseDetails?.client_name || 'Client', role: 'client', isPresent: false },
    { id: 'witness-1', name: 'Dr. Anand (Expert Witness)', role: 'witness', isPresent: false },
  ]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample initial documents
  const initialDocuments: Document[] = [
    {
      id: 'doc-1',
      name: 'Petition.pdf',
      url: '#',
      uploadedBy: 'Adv. Sanjay Sharma',
      timestamp: Date.now() - 86400000, // 1 day ago
      type: 'petition'
    },
    {
      id: 'doc-2',
      name: 'Evidence_Medical_Report.pdf',
      url: '#',
      uploadedBy: 'Adv. Sanjay Sharma',
      timestamp: Date.now() - 43200000, // 12 hours ago
      type: 'evidence'
    },
    {
      id: 'doc-3',
      name: 'Client_Affidavit.pdf',
      url: '#',
      uploadedBy: 'Adv. Sanjay Sharma',
      timestamp: Date.now() - 21600000, // 6 hours ago
      type: 'affidavit'
    }
  ];

  // Sample initial messages
  const initialMessages: Message[] = [
    {
      id: 'msg-1',
      userId: 'judge-1',
      userName: 'Hon. Justice Mehta',
      content: 'This virtual hearing of Case No. ' + caseDetails?.case_number + ' is now in session. Counsel may present their arguments.',
      timestamp: Date.now() - 900000 // 15 minutes ago
    },
    {
      id: 'msg-2',
      userId: 'lawyer-123',
      userName: 'Adv. Sanjay Sharma',
      content: 'Thank you, Your Honor. I represent the plaintiff in this matter.',
      timestamp: Date.now() - 840000 // 14 minutes ago
    },
    {
      id: 'msg-3',
      userId: 'opposing-counsel',
      userName: 'Adv. Priya Desai',
      content: 'Good afternoon, Your Honor. Appearing for the respondent.',
      timestamp: Date.now() - 780000 // 13 minutes ago
    }
  ];

  useEffect(() => {
    // Initialize with sample data
    setDocuments(initialDocuments);
    setMessages(initialMessages);
    
    // Scroll to bottom of messages
    scrollToBottom();

    // Redirect if no case details
    if (!caseDetails && !caseId) {
      toast.error('No case details found. Redirecting to pending cases.');
      navigate('/pending-cases');
      return;
    }

    // Initialize WebRTC and WebSocket connections here
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Error accessing media devices:', err);
        toast.error('Could not access camera or microphone.');
      });
      
    // Cleanup function
    return () => {
      // Close media streams
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [caseDetails, caseId, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Math.random().toString(36).substr(2, 9),
        userId: currentUser.id,
        userName: currentUser.name,
        content: newMessage.trim(),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType: Document['type'] = 
        file.name.toLowerCase().includes('evidence') ? 'evidence' :
        file.name.toLowerCase().includes('petition') ? 'petition' :
        file.name.toLowerCase().includes('affidavit') ? 'affidavit' :
        file.name.toLowerCase().includes('judgment') ? 'judgment' : 'other';
      
      const document: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        uploadedBy: currentUser.name,
        timestamp: Date.now(),
        type: fileType
      };
      setDocuments((prev) => [...prev, document]);
      toast.success(`Document "${file.name}" uploaded successfully.`);
    }
  };

  const toggleCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setCameraOn(!cameraOn);
    }
  };

  const toggleMic = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setMicOn(!micOn);
    }
  };

  const addParticipant = () => {
    // Show a dialog to add participant (simplified for this example)
    const participant = participants.find(p => !p.isPresent);
    if (participant) {
      setParticipants(participants.map(p => 
        p.id === participant.id ? {...p, isPresent: true} : p
      ));
      toast.success(`${participant.name} added to the hearing.`);
    } else {
      toast.error('No more participants to add.');
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.map(p => 
      p.id === id ? {...p, isPresent: false} : p
    ));
    toast.success('Participant removed from the hearing.');
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getDocumentTypeColor = (type: Document['type']) => {
    switch(type) {
      case 'evidence': return 'bg-amber-100 text-amber-800';
      case 'petition': return 'bg-purple-100 text-purple-800';
      case 'affidavit': return 'bg-blue-100 text-blue-800';
      case 'judgment': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with case info */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-herbal-green">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-deep-jungle">{caseDetails?.title || 'Virtual Hearing'}</h1>
              <p className="text-moss-green">CNR: {caseDetails?.case_number || 'N/A'}</p>
            </div>
            <motion.button
              onClick={() => navigate('/pending-cases')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-herbal-green text-white px-4 py-2 rounded-lg"
            >
              Exit Courtroom
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Video and Controls */}
          <div className="col-span-12 md:col-span-8 space-y-4">
            {/* Video Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-deep-jungle text-white p-3 flex justify-between items-center">
                  <h2 className="font-semibold">{currentUser.name} (You)</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={toggleMic} 
                      className={`p-1 rounded ${micOn ? 'bg-herbal-green' : 'bg-red-500'}`}
                    >
                      {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={toggleCamera} 
                      className={`p-1 rounded ${cameraOn ? 'bg-herbal-green' : 'bg-red-500'}`}
                    >
                      {cameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full aspect-video bg-gray-900"
                />
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-deep-jungle text-white p-3">
                  <h2 className="font-semibold">Hon. Justice Mehta (Judge)</h2>
                </div>
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full aspect-video bg-gray-900"
                />
              </div>
            </div>

            {/* Document Viewer */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-deep-jungle">Court Documents</h2>
                <label className="cursor-pointer bg-herbal-green text-white py-2 px-4 rounded-md hover:bg-spring-green transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Document
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <motion.div
                    key={doc.id}
                    whileHover={{ scale: 1.02 }}
                    className="border rounded-md overflow-hidden shadow-sm"
                  >
                    <div className="flex justify-between items-center bg-gray-50 p-2 border-b">
                      <span className={`text-xs px-2 py-1 rounded-full ${getDocumentTypeColor(doc.type)}`}>
                        {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(doc.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="p-3 flex items-center gap-3">
                      <FileText className="w-8 h-8 text-herbal-green flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-deep-jungle truncate">{doc.name}</p>
                        <p className="text-sm text-moss-green truncate">
                          Uploaded by {doc.uploadedBy}
                        </p>
                      </div>
                      <a 
                        href={doc.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-deep-jungle text-white px-3 py-1 rounded text-sm hover:bg-forest-green"
                      >
                        View
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat and Participants */}
          <div className="col-span-12 md:col-span-4 space-y-4">
            {/* Participants */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-deep-jungle">Participants</h2>
                <button 
                  onClick={addParticipant}
                  className="bg-herbal-green text-white p-1 rounded-full hover:bg-spring-green"
                >
                  <UserPlus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {participants.filter(p => p.isPresent).map((participant) => (
                  <div 
                    key={participant.id} 
                    className="flex justify-between items-center p-2 rounded-md bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${participant.isPresent ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="font-medium">{participant.name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded mr-2">
                        {participant.role === 'judge' ? 'Judge' : 
                         participant.role === 'lawyer' ? 'Counsel' : 
                         participant.role === 'opposing-counsel' ? 'Opp. Counsel' : 
                         participant.role === 'client' ? 'Client' : 'Witness'}
                      </span>
                      {participant.id !== currentUser.id && (
                        <button 
                          onClick={() => removeParticipant(participant.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat Panel */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-deep-jungle mb-4">Court Proceedings</h2>
              <div className="h-[400px] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex flex-col ${
                        message.userId === currentUser.id ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          message.userId === 'judge-1'
                            ? 'bg-deep-jungle text-white'
                            : message.userId === currentUser.id
                            ? 'bg-herbal-green text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs font-medium">
                            {message.userName}
                          </p>
                          <p className="text-xs opacity-75">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="mt-auto">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your submission..."
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                    />
                    <button
                      type="submit"
                      className="bg-herbal-green text-white p-2 rounded-md hover:bg-spring-green"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courtroom;