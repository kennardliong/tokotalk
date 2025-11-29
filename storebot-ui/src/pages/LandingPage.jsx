import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppWrapper from "../components/AppWrapper";

function LandingPage() {
  console.log("landingpage rendered")
  return (
    <AppWrapper>
    <div className="bg-white">
      {/* Header */}
      <div className="w-full bg-white shadow p-3 flex justify-between items-center px-6">
        <Link to="/">
          <img
            src="/tokotalk-textlogo.png" // Replace with your actual logo path (e.g. /logo.svg or /images/logo.png)
            alt="TokoTalk Logo"
            className="h-12" // Adjust height as needed
          />
        </Link>
        
        <div className="flex gap-4 text-sm">
          <Link to="/product" className="text-sky-400 hover:text-sky-500">Product</Link>
          <Link to="/pricing" className="text-sky-400 hover:text-sky-500">Pricing</Link>
          <Link to="/waitlist" className="text-sky-400 hover:text-sky-500">Waitlist</Link>
          <Link to="/register" className="text-sky-400 hover:text-sky-500">Register</Link>
          <Link to="/login" className="text-sky-400 hover:text-sky-500">Login</Link>
        </div>
      </div>

      {/* Hero Section */}

      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center bg-cover bg-center"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at bottom right, rgba(56,189,248,0.6), rgba(255,255,255,0.8)),
            url('/handshake.png')
          `
        }}
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Work Less. Sell More.</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          TokoTalk automates your sales on WhatsApp, Instagram, and Messenger — from product pitches to closing deals — so you can grow your business without lifting a finger.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="bg-sky-400 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-sky-500">
            Get Started
          </Link>
          <Link to="/login" className="border border-sky-400 text-sky-400 px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-50">
            Log In
          </Link>
          <Link to="/waitlist" className="bg-white text-sky-500 border border-sky-100 px-6 py-3 rounded-md text-lg font-semibold hover:bg-slate-50">
            Join Waitlist
          </Link>
        </div>
      </section>


      {/* Feature Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why TokoTalk?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <FeatureCard
              icon="⚡"
              title="Stupidly Easy Setup"
              text="No code, no problem. Bot your store in seconds. Even your grandma could do it."
            />
            <FeatureCard
              icon="🌐"
              title="Multi-Platform Chats"
              text="Use WhatsApp, Instagram, and Messenger... with just one setup."
            />
            <FeatureCard
              icon="🗣️"
              title="Human Replies"
              text="No robotic scripts. Your customers will feel like they're talking to you."
            />
            <FeatureCard
              icon="🎭"
              title="Customized Personality"
              text="Prefer a friendly assistant or a sleek professional? Make your bot match your brand."
            />
          </div>
        </div>
      </section>

      {/* Sample Chat Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">What TokoTalk Looks Like</h2>
        <p className="text-gray-600 mb-10">Your customer sends a message. TokoTalk replies like a friendly, helpful storekeeper.</p>
        <div className="max-w-md mx-auto space-y-4">
          <ChatBubble user="Customer" text="Halo, ada sepatu ukuran 39?" />
          <ChatBubble user="Bot" text="Halo kak! Ada ya, mau warna apa? 😊" />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          {/* Heading */}
          <h2 className="text-3xl font-bold mb-6">Here's What Our Customers Say.</h2>

          {/* Image row */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <img
              src="/kiendra.jpeg"
              alt="Kiendra Prakashan"
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
            <img
              src="/hypeking.png"
              alt="Hype King Store Logo"
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
          </div>

          {/* Testimonial */}
          <div className="flex justify-center">
            <blockquote className="bg-white p-6 rounded shadow text-center max-w-xl">
              <p className="italic mb-2">"TokoTalk saved me hours every week. My bot handles 99% of store management — the 1% is me shipping products out!"</p>
              <p className="font-semibold">– Kiendra Prakashan, Hype King Store</p>
            </blockquote>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-sky-400 via-white to-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <FAQItem
            question="Is it really that easy to set up?"
            answer="Yes — no coding, no chatbot training. Just upload your product list and choose a tone."
          />
          <FAQItem
            question="Can I customize what the bot says?"
            answer="You can adjust its tone and configure optional templates — but it also handles things automatically."
          />
          <FAQItem
            question="What platforms does TokoTalk work with?"
            answer="Right now: WhatsApp via Twilio. Coming soon: Instagram, Messenger, Telegram, and more."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <StatBox number="3,200+" label="Messages Handled" />
          <StatBox number="85%" label="Faster Customer Replies" />
          <StatBox number="20+" label="Stores Onboarded" />
        </div>
        <p className="text-sm text-center text-gray-400 mt-4">Based on internal testing and early users</p>
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

        <h3 className="text-2xl font-bold mb-4">Ready to make your store smarter?</h3>
        <p className="text-gray-600 mb-6">Create your bot, upload products, and start selling in minutes.</p>
        <Link to="/register" className="bg-sky-400 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-sky-500">
          Register Your Store
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t text-sm text-gray-400 text-center">
        TokoTalk © 2025 · Built with ❤️ by <a href="mailto:kennardliong1@gmail.com" className="underline">Kennard Liong</a>
      </footer>
    </div>
    </AppWrapper>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg text-left">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function ChatBubble({ user, text }) {
  const isBot = user === "Bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div className={`rounded-lg px-4 py-2 max-w-xs ${isBot ? "bg-gray-200 text-left" : "bg-sky-400 text-white text-right"}`}>
        <p className="text-sm font-medium">{user}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}

function StatBox({ number, label }) {
  return (
    <div>
      <p className="text-3xl font-bold text-sky-400">{number}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b py-4 cursor-pointer" onClick={() => setOpen(!open)}>
      <h4 className="font-semibold text-lg flex justify-between items-center">
        {question}
        <span>{open ? "−" : "+"}</span>
      </h4>
      {open && <p className="text-gray-600 mt-2">{answer}</p>}
    </div>
  );
}

export default LandingPage;
