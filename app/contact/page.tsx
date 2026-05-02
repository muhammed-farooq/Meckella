import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Contact - Meckella Luxe",
  description: "Get in touch with the House of Meckella.",
};

export default function ContactPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-[#0B0B0B]">
      <section className="pt-32 pb-16 px-[20px] lg:px-[70px] max-w-7xl mx-auto w-full text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-[#EDEDED] mb-6">Contact the House</h1>
        <p className="text-[#A1A1A1] max-w-2xl mx-auto text-lg leading-relaxed">
          For bespoke inquiries, collaborations, or client care, our concierges are at your disposal.
        </p>
      </section>

      <section className="py-12 px-[20px] lg:px-[70px] max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Contact Form */}
          <div className="bg-[#0f0f0f] border border-white/5 p-8 lg:p-12">
            <h2 className="font-serif text-3xl text-[#EDEDED] mb-8">Send a Message</h2>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[#A1A1A1] text-xs uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  className="bg-transparent border-b border-white/20 pb-2 text-[#EDEDED] focus:outline-none focus:border-[#C9A96E] transition-colors font-sans"
                  placeholder="Your Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#A1A1A1] text-xs uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="bg-transparent border-b border-white/20 pb-2 text-[#EDEDED] focus:outline-none focus:border-[#C9A96E] transition-colors font-sans"
                  placeholder="name@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[#A1A1A1] text-xs uppercase tracking-widest">Your Inquiry</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={4}
                  className="bg-transparent border-b border-white/20 pb-2 text-[#EDEDED] focus:outline-none focus:border-[#C9A96E] transition-colors font-sans resize-none"
                  placeholder="How can we assist you today?"
                ></textarea>
              </div>
              
              <Button type="button" className="mt-4 uppercase tracking-widest font-sans py-4 rounded-none bg-[#C9A96E] hover:bg-[#b0935d] text-[#0B0B0B] border-none w-full">
                Submit Inquiry
              </Button>
            </form>
          </div>

          {/* Right: Info and Socials */}
          <div className="flex flex-col gap-16 justify-center">
             <div className="flex flex-col gap-6">
                <h3 className="font-serif text-2xl text-[#EDEDED]">Atelier & Care</h3>
                <div className="text-[#A1A1A1] font-sans leading-loose">
                  <p>1 (800) 123-4567</p>
                  <p>concierge@meckellaluxe.com</p>
                  <p className="mt-4">
                    123 Avenue Montaigne<br/>
                    Paris, France 75008
                  </p>
                </div>
             </div>

             <div className="flex flex-col gap-6">
                <h3 className="font-serif text-2xl text-[#EDEDED]">Social Presence</h3>
                <div className="flex gap-8">
                  <a href="#" className="text-[#A1A1A1] hover:text-[#C9A96E] transition-colors uppercase tracking-widest text-sm">Instagram</a>
                  <a href="#" className="text-[#A1A1A1] hover:text-[#C9A96E] transition-colors uppercase tracking-widest text-sm">Facebook</a>
                  <a href="#" className="text-[#A1A1A1] hover:text-[#C9A96E] transition-colors uppercase tracking-widest text-sm">Pinterest</a>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
