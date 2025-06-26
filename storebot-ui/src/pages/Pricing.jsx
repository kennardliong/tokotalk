import React from "react";
import { Link } from "react-router-dom";
import AppWrapper from "../components/AppWrapper";

function PricingPage() {
  return (
    <AppWrapper>
    <div className="bg-white">
      {/* Header */}
      <div className="w-full bg-white shadow p-3 flex justify-between items-center px-6">
        <Link to="/">
            <img src="/tokotalk-textlogo.png" alt="Tokotalk Logo" className="h-12" />
        </Link>
        <div className="flex gap-4 text-sm">
          <Link to="/product" className="text-sky-400 hover:underline">Product</Link>
          <Link to="/pricing" className="text-sky-400 hover:underline">Pricing</Link>
          <Link to="/register" className="text-sky-400 hover:underline">Register</Link>
          <Link to="/login" className="text-sky-400 hover:underline">Login</Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 text-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-400 via-sky-200 to-sky-100">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          No tiers. No surprises. One powerful plan to automate your storefront — or try it free.
        </p>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Pick a TokoTalk Plan 🩵</h2>

        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Free Plan */}
          <div className="border rounded-lg p-8 shadow text-center">
            <h2 className="text-2xl font-bold mb-2">🧪 TokoLite</h2>
            <p className="text-gray-500 mb-6">Test drive. Free forever.</p>
            <p className="text-4xl font-bold text-sky-400 mb-6">Rp 0</p>
            <ul className="text-gray-700 space-y-3 mb-6">
              <li>10 replies per day</li>
              <li>1 product CSV</li>
              <li>Basic reply tone</li>
              <li>Powered by Tokotalk badge</li>
              <li>WhatsApp support only</li>
            </ul>
            <Link to="/register" className="bg-sky-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-sky-500">
              Try Free
            </Link>
          </div>

          {/* Paid Plan */}
          <div className="border rounded-lg p-8 shadow text-center bg-sky-50">
            <h2 className="text-2xl font-bold mb-2">💼 TokoPro</h2>
            <p className="text-gray-500 mb-6">Unlimited automation. Total peace of mind.</p>
            <p className="text-4xl font-bold text-sky-400 mb-6">Rp 69K<span className="text-base font-normal text-gray-600"> / month</span></p>
            <ul className="text-gray-700 space-y-3 mb-6">
              <li>Unlimited replies</li>
              <li>Unlimited products</li>
              <li>Customizable tone & personality</li>
              <li>Remove TokoTalk branding</li>
              <li>Works on all platforms</li>
            </ul>
            <Link to="/register" className="bg-sky-400 text-white px-6 py-2 rounded-md font-semibold hover:bg-sky-500">
              Level Up!
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-400 via-white to-white">
        <div className="flex justify-center mb-6">
            <img
              src="/Tokotalk-blue.png"
              alt="TokoTalk Logo"
              className="h-20"
            />
        </div>
        <h3 className="text-2xl font-bold mb-4">Still not sure?</h3>
        <p className="text-gray-600 mb-6">Read more about our <Link to="/product" className="text-sky-400 underline hover:text-sky-600">product</Link>.</p>
        <Link to="/register" className="bg-sky-400 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-sky-500">
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t text-sm text-gray-400 text-center">
        Tokotalk © 2025 · Built with ❤️ by <a href="mailto:kennardliong1@gmail.com" className="underline">Kennard Liong</a>
      </footer>
    </div>
    </AppWrapper>
  );
}

export default PricingPage;
