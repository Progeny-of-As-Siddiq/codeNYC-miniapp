import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Shield, Database, Settings, Share2, Lock, Cookie, UserCheck, Clock, Globe, Baby, Edit, Mail, AlertTriangle } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: Shield,
      content: "At Flyte AI, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services."
    },
    {
      id: "beta-disclaimer",
      title: "⚠️ BETA SERVICE - DATA PROTECTION LIMITATIONS",
      icon: AlertTriangle,
      content: "IMPORTANT: FLYTE AI IS CURRENTLY IN BETA. Our data protection capabilities are limited and experimental. We cannot guarantee the security, availability, or integrity of your personal information.",
      highlights: [
        "Data loss may occur due to system failures or technical issues",
        "Security measures are experimental and may have vulnerabilities",
        "Backup and recovery systems are not fully tested or guaranteed",
        "Personal information may be exposed due to beta-stage security gaps",
        "Data retention policies may change without notice during beta",
        "We cannot guarantee compliance with all data protection regulations",
        "System downtime may result in temporary or permanent data loss"
      ]
    },
    {
      id: "data-security",
      title: "Data Security - Limited Beta Protection",
      icon: Lock,
      content: "We attempt to implement basic security measures, but as a beta service, we cannot guarantee protection against unauthorized access, alteration, disclosure, or destruction of your personal information.",
      highlights: [
        "Basic encryption attempts (not guaranteed to be effective)",
        "Limited security assessments (beta-stage testing only)",
        "Minimal access controls (may have security gaps)",
        "Third-party payment processing (we cannot control their security)",
        "⚠️ All security measures are experimental and may fail"
      ]
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: Settings,
      content: "We use your information for the following purposes:",
      highlights: [
        "Processing flight bookings and travel arrangements",
        "Providing customer support and assistance",
        "Personalizing your experience and recommendations",
        "Improving our AI algorithms and services",
        "Sending booking confirmations and travel updates",
        "Complying with legal and regulatory requirements",
        "Preventing fraud and ensuring platform security"
      ]
    },
    {
      id: "sharing",
      title: "Information Sharing and Disclosure",
      icon: Share2,
      content: "We may share your information in limited circumstances with trusted partners and as required by law.",
      subsections: [
        {
          title: "Service Providers",
          content: "We share information with trusted third-party service providers who assist us in operating our platform, including airlines, payment processors, and technology partners."
        },
        {
          title: "Legal Requirements", 
          content: "We may disclose your information when required by law, court order, or government regulation, or to protect our rights and the safety of our users."
        },
        {
          title: "Business Transfers",
          content: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction."
        }
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      icon: Cookie,
      content: "We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences."
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices - Beta Limitations",
      icon: UserCheck,
      content: "⚠️ BETA LIMITATION: While you may theoretically have certain rights, our beta status means we cannot guarantee the ability to fulfill these requests:",
      highlights: [
        "Access to your personal information (may fail due to system limitations)",
        "Correction of inaccurate data (not guaranteed to be technically possible)",
        "Deletion of your personal information (may be incomplete due to backup systems)",
        "Restriction of processing (limited technical capabilities)",
        "Data portability (export functions may not work properly)",
        "Objection to processing (may not be technically enforceable)",
        "Withdrawal of consent (may not stop all data processing due to system constraints)"
      ]
    },
    {
      id: "retention",
      title: "Data Retention",
      icon: Clock,
      content: "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Booking and travel records may be retained for extended periods as required by aviation regulations."
    },
    {
      id: "transfers",
      title: "International Data Transfers",
      icon: Globe,
      content: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information during such transfers."
    },
    {
      id: "children",
      title: "Children's Privacy",
      icon: Baby,
      content: "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13 without parental consent."
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      icon: Edit,
      content: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website and updating the \"Last updated\" date."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-500/10 via-[#9089fc]/10 to-blue-500/10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              Privacy & Security
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-[#9089fc] to-blue-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your privacy matters. Learn how we protect and handle your personal information.
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
        {/* Information We Collect Section */}
        <Card className="mb-8 border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10 dark:border-blue-800/30">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-xs font-medium border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
                    2
                  </Badge>
                  <h2 className="text-2xl font-semibold text-foreground">
                    Information We Collect
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-background/60 border-blue-200/30 dark:border-blue-800/30">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">
                        Personal Information
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        We may collect the following types of personal information:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          Name, email address, and contact information
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          Travel preferences and booking history
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          Payment information (processed securely through third-party providers)
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          Passport and identification details for international travel
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          Communication records with our customer service team
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/60 border-blue-200/30 dark:border-blue-800/30">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">
                        Automatically Collected Information
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        We automatically collect certain information when you use our services:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                          IP address and device information
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                          Browser type and operating system
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                          Usage patterns and interaction data
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                          Cookies and similar tracking technologies
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                          Location data (with your consent)
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Sections */}
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
                          {index === 0 ? 1 : index + 2}
                        </Badge>
                        <h2 className="text-2xl font-semibold text-foreground">
                          {section.title}
                        </h2>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                        {section.content}
                      </p>
                      
                      {section.highlights && (
                        <ul className="space-y-2 text-muted-foreground">
                          {section.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-[#9089fc] rounded-full mt-2 flex-shrink-0"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.subsections && (
                        <div className="grid gap-4 mt-4">
                          {section.subsections.map((subsection, idx) => (
                            <Card key={idx} className="bg-muted/30 border-muted/50">
                              <CardContent className="p-4">
                                <h3 className="font-semibold mb-2 text-foreground">
                                  {subsection.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {subsection.content}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Critical Data Protection Disclaimer */}
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
                      ⚠️ DATA PROTECTION DISCLAIMER - READ CAREFULLY
                    </h2>
                  </div>
                  <p className="text-red-700 dark:text-red-300 leading-relaxed text-lg mb-6 font-semibold">
                    WE CANNOT GUARANTEE DATA PROTECTION. By using our beta service, you acknowledge that your personal information may be lost, exposed, or compromised with no recourse.
                  </p>
                  
                  <Card className="bg-red-50/50 dark:bg-red-950/30 border-red-200/50 dark:border-red-800/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-red-800 dark:text-red-200">
                        NO DATA PROTECTION GUARANTEE
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-red-100/80 dark:bg-red-950/40 p-4 rounded-lg border-l-4 border-red-500">
                          <p className="text-sm text-red-800 dark:text-red-200 leading-relaxed font-medium">
                            <strong>BETA SERVICE WARNING:</strong> This is an experimental service. Your personal information, including payment details, travel documents, and private communications, may be permanently lost, exposed to unauthorized parties, or used in ways we cannot control.
                          </p>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <p className="text-red-700 dark:text-red-300"><strong>• Data breaches:</strong> Security vulnerabilities may expose your information</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• System failures:</strong> Technical issues may cause permanent data loss</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• Unauthorized access:</strong> Beta security measures may be inadequate</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• Third-party sharing:</strong> Data may be shared with unintended parties</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• Identity theft risk:</strong> Personal information exposure may lead to fraud</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• Compliance failures:</strong> We may not meet legal data protection standards</p>
                          <p className="text-red-700 dark:text-red-300"><strong>• Recovery impossible:</strong> Lost data may be unrecoverable</p>
                        </div>
                        
                        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            <strong>By using this service, you explicitly accept all data protection risks and waive any claims related to data loss, exposure, or misuse.</strong>
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
          <Card className="border-emerald-200/50 bg-gradient-to-br from-emerald-50/50 to-green-50/30 dark:from-emerald-950/20 dark:to-green-950/10 dark:border-emerald-800/30">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-xs font-medium border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300">
                      12
                    </Badge>
                    <h2 className="text-2xl font-semibold text-foreground">
                      Contact Us
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      <span className="text-muted-foreground">Privacy & Support: </span>
                      <a 
                        href="mailto:support@flyteai.io" 
                        className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium hover:underline transition-colors"
                      >
                        support@flyteai.io
                      </a>
                    </div>
                    <div className="text-sm text-muted-foreground mt-3">
                      <strong>⚠️ Beta Notice:</strong> As a beta service, response times and issue resolution are not guaranteed. Privacy concerns may not be fully addressable due to system limitations.
                    </div>
                  </div>
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
                Your Privacy is Protected
              </h3>
              <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                Experience secure, private flight booking with Flyte AI. Your data is safe with us.
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