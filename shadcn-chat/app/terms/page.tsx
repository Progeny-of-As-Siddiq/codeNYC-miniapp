import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Shield, FileText, Users, CreditCard, RefreshCw, AlertTriangle, Lock, Copyright, Ban, Edit, Scale, Mail } from "lucide-react"

export default function TermsPage() {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: FileText,
      content: "By accessing and using Flyte AI&apos;s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      id: "service",
      title: "Service Description",
      icon: Shield,
      content: "Flyte AI provides an AI-powered flight booking and travel assistance platform. We help users find, compare, and book flights through our intelligent chat interface and booking system."
    },
    {
      id: "responsibilities",
      title: "User Responsibilities",
      icon: Users,
      content: "Users are responsible for providing accurate information when booking flights, including but not limited to passenger details, travel dates, and payment information. Users must comply with all applicable laws and airline policies."
    },
    {
      id: "payment",
      title: "Booking and Payment",
      icon: CreditCard,
      content: "All bookings are subject to availability and confirmation. Prices displayed are subject to change until payment is completed. We accept major credit cards and other payment methods as indicated on our platform."
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: "Flyte AI acts as an intermediary between users and airlines. We are not responsible for flight delays, cancellations, changes, overbooking, weather disruptions, airline bankruptcies, missed connections, lost luggage, visa issues, medical emergencies, or other travel-related problems beyond our control. Our liability is limited to the service fees charged by our platform. As a beta service, some features may have limitations or occasional issues."
    },
    {
      id: "privacy",
      title: "Privacy and Data Protection",
      icon: Lock,
      content: "We are committed to protecting your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information."
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: Copyright,
      content: "All content, features, and functionality of Flyte AI, including but not limited to text, graphics, logos, and software, are owned by Flyte AI and are protected by copyright, trademark, and other intellectual property laws."
    },
    {
      id: "prohibited",
      title: "Prohibited Uses",
      icon: Ban,
      content: "Users may not use our service for any unlawful purpose or to solicit others to perform unlawful acts. This includes but is not limited to fraud, harassment, or violation of any applicable laws or regulations."
    },
    {
      id: "modifications",
      title: "Modifications to Terms",
      icon: Edit,
      content: "We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the service constitutes acceptance of the modified terms."
    },
    {
      id: "beta-disclaimer",
      title: "Beta Service Notice",
      icon: AlertTriangle,
      content: "Flyte AI is currently in beta testing. While we strive for reliability, some features may be limited or occasionally experience issues. We're continuously improving the platform based on user feedback. Beta users help us identify and resolve any problems as we work toward our full launch."
    },
    {
      id: "refund-policy",
      title: "Refund Policy",
      icon: RefreshCw,
      content: "Refunds are subject to airline policies and booking conditions. While we cannot guarantee refunds in all cases, we will make reasonable efforts to assist with refund requests where airline policies permit. Refund processing depends on third-party systems and may involve fees or restrictions imposed by airlines or payment processors."
    },
    {
      id: "booking-modifications",
      title: "Booking Changes and Cancellations",
      icon: RefreshCw,
      content: "Booking modifications and cancellations are subject to airline policies and may involve fees. We will assist with change requests where possible, but airlines ultimately control their own booking policies. Change fees, cancellation penalties, and fare differences are determined by the airline. We recommend reviewing airline policies before booking."
    },
    {
      id: "payment-processing",
      title: "Payment Processing",
      icon: CreditCard,
      content: "Payment processing is handled by secure third-party providers. While we strive for accurate pricing, final charges may differ slightly due to taxes, fees, or currency conversion. We are not responsible for bank charges or payment processor fees that may apply. Prices are subject to change until payment is completed."
    },
    {
      id: "governing",
      title: "Governing Law",
      icon: Scale,
      content: "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Flyte AI operates, without regard to conflict of law principles."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#9089fc]/10 via-indigo-500/5 to-purple-500/10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 pt-32 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-[#9089fc]/20 text-[#9089fc]">
              Legal Document
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#9089fc] via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Clear, transparent terms that govern your use of Flyte AI&apos;s flight booking platform
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Last updated:</span>
              <Badge variant="secondary">{new Date().toLocaleDateString()}</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Terms Sections */}
        <div className="grid gap-8 mb-16">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <Card key={section.id} className="group hover:shadow-lg transition-all duration-300 border-muted/50 hover:border-[#9089fc]/20">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#9089fc]/10 to-indigo-500/10 flex items-center justify-center group-hover:from-[#9089fc]/20 group-hover:to-indigo-500/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-[#9089fc]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="outline" className="text-xs font-medium">
                          {index + 1}
                        </Badge>
                        <h2 className="text-2xl font-semibold text-foreground">
                          {section.title}
                        </h2>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Critical Refund Disclaimer Section */}
          <Card className="border-red-200/50 bg-gradient-to-br from-red-50/50 to-orange-50/30 dark:from-red-950/20 dark:to-orange-950/10 dark:border-red-800/30">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-xs font-medium border-red-200 text-red-700 dark:border-red-800 dark:text-red-300">
                      CRITICAL
                    </Badge>
                    <h2 className="text-2xl font-semibold text-foreground">
                      ⚠️ REFUND DISCLAIMER - READ CAREFULLY
                    </h2>
                  </div>
                  <p className="text-red-700 dark:text-red-300 leading-relaxed text-lg mb-6 font-semibold">
                    WE CANNOT AND DO NOT GUARANTEE REFUNDS. By using our service, you acknowledge that you may lose 100% of your payment with no recourse.
                  </p>
                  
                  <Card className="bg-red-50/50 dark:bg-red-950/30 border-red-200/50 dark:border-red-800/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-red-800 dark:text-red-200">
                        NO REFUND GUARANTEE
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-red-100/80 dark:bg-red-950/40 p-4 rounded-lg border-l-4 border-red-500">
                          <p className="text-sm text-red-800 dark:text-red-200 leading-relaxed font-medium">
                            <strong>BETA SERVICE WARNING:</strong> This is a beta service. We cannot guarantee refunds under any circumstances. Even if airline policies technically allow refunds, our beta status means processing may fail, systems may be unavailable, or technical errors may prevent refund completion.
                          </p>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <p className="text-red-700 dark:text-red-300"><strong>• Non-refundable by default:</strong> All bookings should be considered non-refundable</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• Processing failures:</strong> Refund attempts may fail due to technical limitations</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• Airline policy changes:</strong> Airlines may change policies without notice, voiding refund eligibility</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• Third-party fees:</strong> Payment processors, banks, and airlines impose non-refundable fees</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• Administrative costs:</strong> Processing fees of $50-500+ per ticket may apply</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• Time limitations:</strong> Most refund windows close within 24 hours or less</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• System downtime:</strong> Refund processing systems may be unavailable when needed</p>
                        </div>
                        
                        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            <strong>Support Contact:</strong> For refund-related issues, contact{" "}
                            <a 
                              href="mailto:support@flyteai.io" 
                              className="text-[#9089fc] hover:text-[#7c6df7] font-medium hover:underline"
                            >
                              support@flyteai.io
                            </a>{" "}
                            - however, contacting support does not guarantee any resolution or refund processing.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="border-[#9089fc]/20 bg-gradient-to-br from-[#9089fc]/5 to-indigo-500/5">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#9089fc]/10 to-indigo-500/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#9089fc]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-xs font-medium border-[#9089fc]/20 text-[#9089fc]">
                      12
                    </Badge>
                    <h2 className="text-2xl font-semibold text-foreground">
                      Contact Information
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    For questions about these Terms of Service, please contact us at{" "}
                    <a 
                      href="mailto:legal@flyteai.io" 
                      className="text-[#9089fc] hover:text-[#7c6df7] font-medium hover:underline transition-colors"
                    >
                      legal@flyteai.io
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-[#9089fc]/20 bg-gradient-to-r from-[#9089fc]/5 via-indigo-500/5 to-purple-500/5">
            <CardContent className="p-12">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Ready to Book Your Next Flight?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                Experience the future of flight booking with our AI-powered platform. Fast, secure, and intelligent.
              </p>
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-[#9089fc] to-indigo-600 hover:from-[#7c6df7] hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
              >
                <Link href="/chat">Start Booking Flights</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Flyte AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 