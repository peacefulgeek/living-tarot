import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_CONFIG } from "@/data/config";

export default function Terms() {
  return (
    <Layout>
      <SEOHead
        title="Terms of Service"
        description="Terms of Service for The Living Tarot. Please read these terms carefully before using our website."
        canonical={`${SITE_CONFIG.domain}/terms`}
      />

      <div className="container py-12 md:py-16 max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--deep-purple)] mb-8">Terms of Service</h1>

        <div className="space-y-6 text-[var(--deep-purple)]/70 leading-relaxed text-sm">
          <p><strong className="text-[var(--deep-purple)]">Last Updated:</strong> April 2026</p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Acceptance of Terms</h2>
          <p>
            By accessing and using The Living Tarot website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Content Disclaimer</h2>
          <p>
            The content on The Living Tarot is provided for educational and entertainment purposes only. It is not intended as a substitute for professional medical, psychological, legal, or financial advice. Tarot reading is a contemplative practice, not a diagnostic tool.
          </p>
          <p>
            We make no representations or warranties about the accuracy, completeness, or suitability of the information on this website. You use this information at your own risk.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Intellectual Property</h2>
          <p>
            All content on The Living Tarot, including text, images, graphics, and design, is the property of The Living Tarot and is protected by copyright law. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">User Conduct</h2>
          <p>
            You agree to use our website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the website.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, The Living Tarot shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or reliance on any content provided.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">External Links</h2>
          <p>
            Our website may contain links to external websites. We are not responsible for the content or privacy practices of these external sites.
          </p>

          <h2 className="font-serif text-xl text-[var(--deep-purple)] mt-8 mb-3">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.
          </p>


        </div>
      </div>
    </Layout>
  );
}
