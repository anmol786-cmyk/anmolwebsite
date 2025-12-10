import { Metadata } from 'next';
import {
  StaticPageLayout,
  PageSection,
} from '@/components/layout/static-page-layout';
import { brandConfig } from '@/config/brand.config';

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms | Anmol Sweets & Restaurant',
  description: 'Read our Privacy Policy, GDPR compliance, Return & Exchange Policy, and Terms & Conditions.',
};

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout
      title="Privacy Policy & Terms"
      description="Transparency and trust are at the core of our business. Read about how we handle your data and our policies."
      breadcrumbs={[{ label: 'Privacy Policy', href: '/privacy-policy' }]}
    >
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">

        {/* Privacy Policy Section */}
        <section id="privacy" className="space-y-6 scroll-mt-32">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold tracking-tight">Privacy Policy</h2>
            <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-muted-foreground">
            <p>
              At Anmol sweets and bakers, accessible from www.anmolsweets.se, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Anmol sweets and bakers and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>
            <p>
              This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Anmol sweets and bakers. This policy is not applicable to any information collected offline or via channels other than this website.
            </p>

            <h3 className="text-xl font-semibold text-foreground pt-4">Consent</h3>
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

            <h3 className="text-xl font-semibold text-foreground pt-4">Information we collect</h3>
            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <p>
              If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            </p>
            <p>
              When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
            </p>

            <h3 className="text-xl font-semibold text-foreground pt-4">How we use your information</h3>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our webste</li>
              <li>Improve, personalize, and expand our webste</li>
              <li>Understand and analyze how you use our webste</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the webste, and for marketing and promotional purposes</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground pt-4">Log Files</h3>
            <p>
              Anmol sweets and bakers follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information.
            </p>

            <h3 className="text-xl font-semibold text-foreground pt-4">Cookies and Web Beacons</h3>
            <p>
              Like any other website, Anmol sweets and bakers uses ‘cookies’. These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information.
            </p>

            <h3 className="text-xl font-semibold text-foreground pt-4">Third Party Privacy Policies</h3>
            <p>
              Anmol sweets and bakers’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.
            </p>

            <h3 className="text-xl font-semibold text-foreground pt-4">CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
            <p>Under the CCPA, among other rights, California consumers have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
              <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
              <li>Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.</li>
            </ul>
            <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

            <h3 className="text-xl font-semibold text-foreground pt-4">Children&apos;s Information</h3>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              Anmol sweets and bakers does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </div>
        </section>

        {/* GDPR Section */}
        <section id="gdpr" className="space-y-6 scroll-mt-32">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold tracking-tight">GDPR Data Protection Rights</h2>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-muted-foreground">
            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
          </div>
        </section>

        {/* Returns & Refunds Section */}
        <section id="returns" className="space-y-6 scroll-mt-32">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold tracking-tight">Return and Exchange Policy</h2>
            <p className="text-muted-foreground mt-2">Last Updated: 10/2/2022</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-muted-foreground">
            <p>Thank you for shopping at {brandConfig.businessName}.</p>
            <p>If, for any reason, You are not completely satisfied with a purchase, we invite You to review our Policy.</p>
            <p>The following terms are applicable for any products that you purchased with us.</p>

            <h3 className="text-xl font-semibold text-foreground pt-4">Interpretation and Definitions</h3>

            <h4 className="text-lg font-medium text-foreground pt-2">Interpretation</h4>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

            <h4 className="text-lg font-medium text-foreground pt-2">Definitions</h4>
            <p>For the purposes of this Return and Exchange Policy:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Business Company</strong> (referred to as either “the Company”, “We”, “Us” or “Our” in this Agreement) refers to Anmol Sweets & Restaurant Located at Fagerstagatan 13, Spånga, Sweden, SE.</li>
              <li><strong>Goods</strong> refer to the items offered for sale on the Service.</li>
              <li><strong>Orders</strong> mean a request by You to purchase Goods from Us.</li>
              <li><strong>Service</strong> refers to the Website.</li>
              <li><strong>Website</strong> refers to My Site, accessible from https://anmolsweets.se/</li>
              <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground pt-4">General Return Policy</h3>
            <p>
              Product that are bought from the Physical Stores can be returned. All Items are eligible for return exempt the products that are: We give food refunds on all items, however we reserve the right to decline in some circumstances.
            </p>
            <p>You are always required to ship back the items by following the shipping instruction:</p>
            <p>
              If you are dissatisfied with our food or service, we will gladly accept requests for returns and refunds. If your request is granted, you may return any things to Fagerstagatan 13, Sweden, as long as they are still in excellent condition.
            </p>

            <h3 className="text-xl font-semibold text-foreground pt-4">Refund Policy</h3>
            <p>
              In order to be eligible for a refund, you have to return the product within 7 days of your purchase. If the product is damaged in any way, or you have initiated the return after 7 days have passed, you will not be eligible for a refund.
            </p>
            <p>In order for the product to be eligible for a Refund, make sure these conditions are met:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Product must have the receipt or proof of purchase</li>
              <li>If the product you have received which turns out to be defective or otherwise of poor quality (save for direct warranty products which are discussed below), please notify us as soon as reasonably possible after you become aware of the defect or poor quality.</li>
            </ul>
            <p>
              After we receive your product, our team of professionals will inspect it and process your refund. The money will be refunded to the Original Payment Method you’ve used during the purchase.
            </p>

            <h3 className="text-xl font-semibold text-foreground pt-4">How to Initiate a Return</h3>
            <p>
              If you have a request for Return, Refund or Exchange and if you have further clarification and questions, Please do not hesitate to contact us through our:
            </p>
            <ul className="list-none space-y-2 pt-2">
              <li><strong>Phone Number:</strong> {brandConfig.contact.phoneSecondary}</li>
            </ul>
            <p>You will be updated for their Return Status through their PHONE provided that contact information is recorded to us.</p>
          </div>
        </section>

      </div>
    </StaticPageLayout>
  );
}
