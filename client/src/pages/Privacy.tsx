import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_CONFIG } from "@/data/config";

export default function Privacy() {
  return (
    <Layout>
      <SEOHead
        title="Privacy Policy"
        description="Privacy Policy for The Living Tarot. Learn how we collect, use, and protect your information."
        canonical={`${SITE_CONFIG.domain}/privacy`}
      />

      <div className="container py-12 md:py-16 max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--deep-purple)] mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-[var(--deep-purple)]/70 leading-relaxed text-sm">
          <p><strong className="text-[var(--deep-purple)]">Last Updated:</strong> March 2026</p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Information We Collect</h2>
          <p>
            When you visit The Living Tarot, we may collect certain information automatically, including your IP address, browser type, referring URLs, and pages visited. This data is collected through cookies and similar technologies to improve your browsing experience and analyze site traffic.
          </p>
          <p>
            If you subscribe to our newsletter, we collect your email address. This information is stored securely and used solely for sending you updates about new content on The Living Tarot.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide and maintain our website</li>
            <li>Analyze usage patterns to improve content and user experience</li>
            <li>Send newsletter updates if you have subscribed</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Cookies</h2>
          <p>
            We use cookies to enhance your experience. These include essential cookies for site functionality and analytics cookies that help us understand how visitors interact with our content. You can control cookie preferences through your browser settings.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Third-Party Services</h2>
          <p>
            We may use third-party services for analytics and content delivery. These services may collect information about your use of our website. We do not sell your personal information to third parties.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us through our website.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Contact</h2>
          <p>
            For questions about this privacy policy, please visit <a href="https://kalesh.love" className="text-[var(--royal-purple)] underline">kalesh.love</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
