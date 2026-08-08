"use client";
import React, { useState } from "react";
import { channels } from "../../constants";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="flex justify-center items-center min-h-screen">
      <div className="py-16 w-full md:py-24">
        <div className="flex flex-col gap-6">
          <span className="border-2 bg-marigold-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-midnight-ink w-fit">
            Contact
          </span>
          <h2 className="font-degular-display text-4xl font-bold leading-tight tracking-wide text-midnight-ink xs:text-5xl md:text-6xl">
            Say <span className="text-cobalt-blue">hello</span>
          </h2>
          <p className="text-lg leading-relaxed text-midnight-ink/60 font-semibold ml-4">
            Questions about CHIPS, a component request, or getting your campus on
            board — drop us a line.
          </p>
        </div>
  
        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="flex flex-col justify-between gap-12">
            <ul className="flex flex-col gap-8">
              {channels.map((channel) => (
                <li key={channel.tag} className="flex items-start gap-6">
                  <span
                    className="mt-2 size-4 shrink-0"
                    style={{ backgroundColor: channel.color }}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="border-2 border-midnight-ink px-3 py-1 text-xs font-bold uppercase tracking-wider text-midnight-ink w-fit">
                      {channel.tag}
                    </span>
                    <h3 className="font-degular-display text-2xl font-bold text-midnight-ink">
                      {channel.title}
                    </h3>
                    <p className="max-w-110 text-base leading-relaxed text-midnight-ink/70">
                      {channel.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
  
            <div className="relative">
              <span className="absolute -left-4 -top-4 size-10 bg-cobalt-blue" />
              <div className="relative border-2 border-midnight-ink bg-marigold-yellow px-6 py-5">
                <p className="font-degular-display text-lg font-bold leading-snug text-midnight-ink">
                  Free for your whole campus.
                  <br />
                  Up and running before the next class.
                </p>
              </div>
            </div>
          </div>
  
          <div className="relative">
            <span className="absolute -right-4 -bottom-4 size-20 bg-blush-pink" />
  
            {submitted ? (
              <div className="relative flex h-full min-h-72 flex-col items-start justify-center gap-5 border-2 border-midnight-ink bg-cream-paper p-8 md:p-10">
                <span className="size-8 bg-poppy-red md:size-10" />
                <h3 className="font-degular-display text-2xl font-bold text-midnight-ink md:text-3xl">
                  Message sent
                </h3>
                <p className="max-w-105 text-base leading-relaxed text-midnight-ink/70 md:text-lg">
                  We&apos;ll get back to you within one working day. Check your
                  inbox shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col gap-5 border-2 border-midnight-ink bg-cream-paper p-8 md:p-10"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold uppercase tracking-widest text-midnight-ink"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    className="border-2 border-midnight-ink bg-transparent px-4 py-3 text-base text-midnight-ink placeholder:text-midnight-ink/40 focus:outline-none focus:border-poppy-red"
                  />
                </div>
  
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-widest text-midnight-ink"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@campus.edu"
                    className="border-2 border-midnight-ink bg-transparent px-4 py-3 text-base text-midnight-ink placeholder:text-midnight-ink/40 focus:border-none focus:border-poppy-red"
                  />
                </div>
  
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold uppercase tracking-widest text-midnight-ink"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Tell us about your campus…"
                    className="resize-none border-2 border-midnight-ink bg-transparent px-4 py-3 text-base text-midnight-ink placeholder:text-midnight-ink/40 focus:border-poppy-red"
                  />
                </div>
  
                <button
                  type="submit"
                  className="w-fit border-2 border-midnight-ink bg-poppy-red px-8 py-3 text-base font-bold uppercase tracking-wider text-cream-paper transition-colors hover:bg-midnight-ink"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}