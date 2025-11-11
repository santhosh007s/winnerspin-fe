import { Footer } from "@/components/landing/footer";
import NavBar  from "@/components/landing/navbar";

export default function TermsPage() {
  return (
    <>
    <NavBar />
    <div className="bg-black text-gray-300">
      {/* <NavBar /> */}
      <main className="pb-20 pt-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
            Terms and Conditions
          </h1>
          <p className="text-center text-gray-500 mb-12">
            Last Updated: October 2025
          </p>

          <div className="space-y-8 text-lg leading-relaxed">
            <p>
              Welcome to Winnerspin. By enrolling in our
              savings plans, using our website, or participating in our lucky
              draws, you agree to the following Terms and Conditions. Please
              read them carefully before joining.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                1. Eligibility
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Participants must be 18 years of age or older and residents of India.</li>
                <li>Each participant must provide accurate personal and contact information during registration.</li>
                <li>Winnerspin reserves the right to verify participant details and disqualify entries with incomplete or false information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                2. Membership and Payment
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Every member is required to pay a monthly installment for a minimum duration of n months as part of the selected savings plan.</li>
                <li>Installments must be paid before the 13th of each month to qualify for the monthly mystery gift.</li>
                <li>Payments made before the 20th of each month qualify the member for the monthly lucky draw.</li>
                <li>Payments must be made through the official channels provided by Winnerspin.</li>
                <li>All payments are non-refundable, except where required by applicable law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                3. Rewards and Prizes
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Members who meet eligibility and payment criteria are automatically entered into monthly and mega lucky draws.</li>
                <li>Rewards may include but are not limited to gold jewelry, vehicles, home appliances, and other gift items as advertised from time to time.</li>
                <li>The value, brand, and specifications of prizes are determined solely by Winnerspin.</li>
                <li>Prizes are non-transferable and cannot be exchanged for cash or alternate items.</li>
                <li>For vehicle prizes, only the ex-showroom price will be borne by Winnerspin. All RTO charges, insurance, taxes, and documentation fees must be paid by the winner.</li>
                <li>All winners are required to present valid identification and complete the necessary formalities before receiving their prize.</li>
                <li>Prizes will be distributed within 20 days from the announcement date.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                4. Lucky Draw Process
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>All draws are conducted fairly and transparently, under the supervision of authorized representatives.</li>
                <li>Draws are livestreamed via the official Winnerspin YouTube channel and/or other designated platforms.</li>
                <li>The results announced during the livestream and on the official website/social media are final and binding.</li>
                <li>Winnerspin reserves the right to modify or reschedule draw dates in case of technical or unforeseen circumstances.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                5. Mystery Gifts and Welcome Gifts
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Members who pay their first installment and activate their plan will receive a welcome gift, subject to stock availability.</li>
                <li>Members who pay on or before the 13th of each month are eligible for mystery gifts as per the ongoing promotional offer.</li>
                <li>Winnerspin reserves the right to substitute any mystery or welcome gift with a gift of equal or greater value without prior notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                6. Refund and Cancellation Policy
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Once a membership is activated and the first payment is made, no refunds will be provided.</li>
                <li>Failure to pay subsequent installments within the specified time frame may result in disqualification from draws and forfeiture of benefits.</li>
                <li>Winnerspin reserves the right to cancel or terminate a membership if any fraudulent activity, false information, or violation of terms is identified.</li>
              </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                    7. Limitation of Liability
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                    Winnerspin shall not be held liable for any loss, damage, delay, or inconvenience caused due to technical issues, network failures, or unforeseen events beyond its control.
                    </li>
                    <li>
                    Winnerspin is not responsible for any errors in payment processing or failures by third-party payment gateways.
                    </li>
                    <li>
                    Winnerspin’s total liability, if any, shall not exceed the total membership amount paid by the participant.
                    </li>
                </ul>
                </section>

                <section>
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                    8. Intellectual Property
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                    All content, text, graphics, logos, and other materials on this website are the exclusive property of Winnerspin.
                    </li>
                    <li>
                    Users are not permitted to copy, reproduce, modify, distribute, or use any content without prior written consent from Winnerspin.
                    </li>
                    <li>
                    Unauthorized use of any Winnerspin intellectual property may result in legal action.
                    </li>
                </ul>
                </section>

                <section>
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                    9. Privacy and Data Use
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                    By joining Winnerspin, members consent to the collection and use of their data for communication, verification, and promotional purposes.
                    </li>
                    <li>
                    Winnerspin ensures that all personal data is handled securely and not shared with unauthorized third parties.
                    </li>
                    <li>
                    Members may request access, correction, or deletion of their personal data by contacting us at <span className="font-medium">info@winnerspin.in</span>.
                    </li>
                </ul>
                </section>

                <section>
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                    10. Modifications
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                    Winnerspin reserves the right to modify, update, or discontinue any plan, offer, or term at any time without prior notice.
                    </li>
                    <li>
                    Updated Terms and Conditions will be made available on the official website.
                    </li>
                    <li>
                    Continued participation in Winnerspin services after updates constitutes acceptance of the revised terms.
                    </li>
                </ul>
                </section>

                <section>
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                    11. Governing Law and Jurisdiction
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of India.
                    </li>
                    <li>
                    Any disputes arising under these Terms shall fall under the exclusive jurisdiction of the courts located in Bangalore, Karnataka.
                    </li>
                    <li>
                    By participating, members agree to submit to the jurisdiction of these courts for all legal proceedings related to Winnerspin services.
                    </li>
                </ul>
                </section>


            <section>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                12. Contact Information
              </h2>
              <p>For any queries, clarifications, or complaints, please contact:</p>
              <address className="not-italic mt-2">
                📍 Head Office: #65, 2nd Floor, Kempegowda Layout Arch, Laggere Ring Road, Bangalore – 560058<br />
                📧 Email: info@winnerspin.in
              </address>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
}