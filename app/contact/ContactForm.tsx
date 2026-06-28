"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { submitContactForm, type FormState } from "./actions";

const initialState: FormState = {
  success: false,
};


export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state?.error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-sans">
          {state.error}
        </div>
      )}
      
      {state?.success && (
        <div className="p-4 bg-green-500/10 border border-green-500/50 text-green-500 text-sm font-sans">
          {state.message}
        </div>
      )}

      {!state?.success && (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[#A1A1A1] text-xs uppercase tracking-widest">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="bg-transparent border-b border-white/20 pb-2 text-foreground focus:outline-none focus:border-[#C9A96E] transition-colors font-sans"
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#A1A1A1] text-xs uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-transparent border-b border-white/20 pb-2 text-foreground focus:outline-none focus:border-[#C9A96E] transition-colors font-sans"
              placeholder="name@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[#A1A1A1] text-xs uppercase tracking-widest">Your Inquiry</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="bg-transparent border-b border-white/20 pb-2 text-foreground focus:outline-none focus:border-[#C9A96E] transition-colors font-sans resize-none"
              placeholder="How can we assist you today?"
            ></textarea>
          </div>

          <Button 
            type="submit" 
            disabled={isPending}
            className="mt-4 uppercase tracking-widest font-sans py-4 rounded-none bg-[#C9A96E] hover:bg-[#b0935d] text-[#0B0B0B] border-none w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Submit Inquiry"}
          </Button>
        </>
      )}
    </form>
  );
}
