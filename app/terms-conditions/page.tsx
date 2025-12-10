import { Section } from '@/components/craft';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import type { Metadata } from 'next';
import { contentConfig } from '@/config/content.config';

export const metadata: Metadata = {
  title: contentConfig.terms.metadata.title,
  description: contentConfig.terms.metadata.description,
};

export default function TermsConditionsPage() {
  return (
    <Section>
      <div className="container px-4 md:px-6">
        <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} className="mb-6" />

        <h1 className="mb-6 text-4xl font-bold">{contentConfig.terms.title}</h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="lead">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <p>
            Welcome to {contentConfig.terms.businessName}. By accessing and using our website, you accept and
            agree to be bound by the terms and conditions of this agreement.
          </p>

          <h2>1. Use of Website</h2>

          <h3>1.1 Eligibility</h3>
          <p>
            You must be at least 18 years old to make purchases through our website. By placing an
            order, you represent that you are of legal age.
          </p>

          <h3>1.2 Account Responsibilities</h3>
          <p>
            If you create an account, you are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>

          <h2>2. Orders and Payments</h2>

          <h3>2.1 Order Acceptance</h3>
          <p>
            All orders are subject to acceptance and availability. We reserve the right to refuse
            or cancel any order for any reason, including but not limited to:
          </p>
          <ul>
            <li>Product availability</li>
            <li>Errors in pricing or product information</li>
            <li>Suspected fraudulent or unauthorized transactions</li>
          </ul>

          <h3>2.2 Pricing</h3>
          <p>
            All prices are in {contentConfig.terms.country === 'Sweden' ? 'Swedish Krona (SEK)' : 'local currency'} and include VAT unless otherwise stated. We
            reserve the right to change prices at any time without prior notice.
          </p>

          <h3>2.3 Payment</h3>
          <p>
            Payment must be made at the time of ordering using one of our accepted payment methods.
            We use secure third-party payment processors and do not store your full payment details.
          </p>

          <h2>3. Delivery and Collection</h2>

          <h3>3.1 Delivery Areas</h3>
          <p>
            We deliver to specified areas within {contentConfig.terms.location}. Delivery fees may apply based on
            distance and order value.
          </p>

          <h3>3.2 Delivery Times</h3>
          <p>
            Estimated delivery times are provided for guidance only and are not guaranteed. We are
            not liable for delays caused by circumstances beyond our control.
          </p>

          <h3>3.3 Collection</h3>
          <p>
            If you choose collection, you must collect your order within the specified time window.
            Uncollected orders may be disposed of, and no refund will be provided.
          </p>

          <h2>4. Food Safety and Allergies</h2>

          <h3>4.1 Food Allergies</h3>
          <p>
            While we take care to provide accurate allergen information, we cannot guarantee that
            any product is completely free from allergens due to cross-contamination risks. Please
            inform us of any allergies when ordering.
          </p>

          <h3>4.2 Food Handling</h3>
          <p>
            Once food has been delivered or collected, it is your responsibility to store and
            consume it safely. We recommend consuming delivered food within 2 hours.
          </p>

          <h2>5. Returns and Refunds</h2>

          <h3>5.1 Cancellations</h3>
          <p>
            Orders can be cancelled before preparation begins. Contact us immediately if you need
            to cancel an order. No refunds will be provided for orders already being prepared or
            delivered.
          </p>

          <h3>5.2 Quality Issues</h3>
          <p>
            If you are not satisfied with the quality of your order, please contact us within 30
            minutes of delivery/collection. We will investigate and may offer a refund, replacement,
            or credit at our discretion.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software, is
            the property of {contentConfig.terms.businessName} and protected by copyright laws. You may not
            reproduce, distribute, or create derivative works without our written permission.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {contentConfig.terms.businessName} shall not be liable
            for any indirect, incidental, special, or consequential damages arising from:
          </p>
          <ul>
            <li>Use or inability to use our website</li>
            <li>Unauthorized access to your data</li>
            <li>Errors or omissions in content</li>
            <li>Any other matter relating to our services</li>
          </ul>

          <h2>8. Privacy</h2>
          <p>
            Your use of our website is also governed by our Privacy Policy. Please review our
            Privacy Policy to understand our practices.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective
            immediately upon posting on this page. Your continued use of the website after changes
            constitutes acceptance of the modified terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of {contentConfig.terms.country}.
            Any disputes shall be subject to the exclusive jurisdiction of {contentConfig.terms.country === 'Sweden' ? 'Swedish' : contentConfig.terms.country} courts.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            If you have any questions about these terms, please contact us:
          </p>
          <ul>
            <li>Email: {contentConfig.terms.email}</li>
            <li>Phone: {contentConfig.terms.phone}</li>
            <li>Address: {contentConfig.terms.address}</li>
          </ul>

          <hr className="my-8" />

          <p className="text-sm text-muted-foreground">
            By using our website and services, you acknowledge that you have read, understood, and
            agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </Section>
  );
}
