import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Mail, HelpCircle, Send, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HelpAndSupport: React.FC = () => {
  const [supportForm, setSupportForm] = useState({
    category: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment by browsing salons, selecting your preferred service, choosing a time slot, and confirming your booking with payment."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule appointments up to 2 hours before the scheduled time through the 'My Bookings' section."
    },
    {
      question: "How do I add money to my wallet?",
      answer: "Go to the Wallet section and tap 'Add Money'. You can add funds using UPI, cards, or net banking."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "You can rate and review your experience. For serious concerns, please contact our support team within 24 hours."
    },
    {
      question: "How do I track my appointment?",
      answer: "Use the 'Track Appointment' feature to get real-time updates on your booking status and estimated service completion time."
    }
  ];

  const supportTickets = [
    {
      id: "TK001",
      subject: "Payment not deducted but booking cancelled",
      status: "In Progress",
      date: "Dec 5, 2024",
      category: "Payment"
    },
    {
      id: "TK002", 
      subject: "Salon location was incorrect",
      status: "Resolved",
      date: "Dec 3, 2024",
      category: "Location"
    }
  ];

  const handleSubmitTicket = () => {
    if (!supportForm.subject || !supportForm.message) {
      toast({
        title: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Support ticket created",
      description: "We'll get back to you within 24 hours"
    });

    setSupportForm({ category: '', subject: '', message: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-500';
      case 'In Progress': return 'bg-bookqin-secondary';
      case 'Open': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Help & Support</h1>
          <p className="text-white/80">We're here to help you with any questions or concerns</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-bookqin-light to-white">
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-bookqin-secondary mx-auto mb-2" />
              <p className="text-sm font-medium text-bookqin-primary">Live Chat</p>
              <p className="text-xs text-bookqin-muted">24/7 Support</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-bookqin-light to-white">
            <CardContent className="p-4 text-center">
              <Phone className="w-8 h-8 text-bookqin-secondary mx-auto mb-2" />
              <p className="text-sm font-medium text-bookqin-primary">Call Us</p>
              <p className="text-xs text-bookqin-muted">1800-123-456</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-bookqin-light to-white">
            <CardContent className="p-4 text-center">
              <Mail className="w-8 h-8 text-bookqin-secondary mx-auto mb-2" />
              <p className="text-sm font-medium text-bookqin-primary">Email</p>
              <p className="text-xs text-bookqin-muted">support@bookqin.com</p>
            </CardContent>
          </Card>
        </div>

        {/* My Support Tickets */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-bookqin-primary">
              <Clock className="w-5 h-5 text-bookqin-secondary" />
              My Support Tickets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 bg-bookqin-light rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-bookqin-primary">{ticket.subject}</h4>
                    <p className="text-sm text-bookqin-muted">#{ticket.id} • {ticket.date}</p>
                  </div>
                  <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                    {ticket.status}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-xs">
                  {ticket.category}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Create New Ticket */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-bookqin-primary">
              <Send className="w-5 h-5 text-bookqin-secondary" />
              Create Support Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-bookqin-primary mb-2 block">Subject</label>
              <Input
                placeholder="Briefly describe your issue"
                value={supportForm.subject}
                onChange={(e) => setSupportForm({...supportForm, subject: e.target.value})}
                className="border-bookqin-muted/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-bookqin-primary mb-2 block">Message</label>
              <Textarea
                placeholder="Provide detailed information about your issue..."
                value={supportForm.message}
                onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                className="border-bookqin-muted/30 min-h-[100px]"
              />
            </div>
            <Button 
              onClick={handleSubmitTicket}
              className="w-full bg-bookqin-secondary hover:bg-bookqin-secondary/90"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Ticket
            </Button>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-bookqin-primary">
              <HelpCircle className="w-5 h-5 text-bookqin-secondary" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-bookqin-muted/20 rounded-lg px-4">
                  <AccordionTrigger className="text-bookqin-primary font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-bookqin-muted">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-bookqin-light to-white">
          <CardContent className="p-6">
            <h3 className="font-bold text-bookqin-primary mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-bookqin-secondary" />
                <span className="text-bookqin-muted">Customer Care: 1800-123-456 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-bookqin-secondary" />
                <span className="text-bookqin-muted">Email: support@bookqin.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-bookqin-secondary" />
                <span className="text-bookqin-muted">Support Hours: 24/7</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default HelpAndSupport;