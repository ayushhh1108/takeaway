import React from "react";
import Header from "../components/header";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#f7f7f7] min-h-screen pt-8 text-[#333]">
      <Header />
      <div className="bg-[#eee3cf] min-h-screen px-4 md:px-16 text-left text-[#484656] mx-auto">
        <h1 className="text-5xl font-extrabold text-left text-[#444] mb-8">
          Privacy Policy
        </h1>

        <section className="mb-8">
          <p className="text-lg leading-relaxed mb-4">
            It is TakeAway's policy to respect your privacy regarding any
            information we may collect while operating our platform. This
            Privacy Policy applies to TakeAway (hereinafter, "us", "we", or
            "TakeAway"). We respect your privacy and are committed to protecting
            personally identifiable information you may provide us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Site Visitors</h2>
          <p className="text-lg leading-relaxed mb-4">
            Like most website operators, TakeAway collects
            non-personally-identifying information of the sort that web browsers
            and servers typically make available, such as the browser type,
            language preference, referring site, and the date and time of each
            visitor request. This helps us understand usage trends.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <p className="text-lg leading-relaxed mb-4">
            Certain interactions require us to gather personally identifiable
            information, such as when signing up or placing an order. This
            information is used solely for providing the requested service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Advertisements</h2>
          <p className="text-lg leading-relaxed mb-4">
            Ads on our platform may be delivered by advertising partners, who
            may set cookies to compile usage statistics and show targeted ads.
            This Privacy Policy covers the use of cookies by TakeAway but not by
            third-party advertisers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Protection of Information</h2>
          <p className="text-lg leading-relaxed mb-4">
            We disclose personally identifiable information only to employees,
            contractors, and affiliated organizations that need the information
            to process it on our behalf. We take all reasonable measures to
            protect against unauthorized access.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy Changes</h2>
          <p className="text-lg leading-relaxed mb-4">
            We may update this policy occasionally. Continued use of our
            services after any changes constitutes acceptance of the revised
            Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Security</h2>
          <p className="text-lg leading-relaxed mb-4">
            While we strive to use commercially acceptable means to protect your
            personal information, no method of transmission over the internet or
            electronic storage is 100% secure.
          </p>
        </section>

        <footer className="mt-8 text-center text-sm text-[#666]">
          <p>Effective Date: 12-12-2024 | Contact: 9638121878</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
