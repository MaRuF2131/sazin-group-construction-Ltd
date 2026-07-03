import { strengths } from '../lib/data';

export default function WhyChooseUs() {
  return (
    <section className="py-20  relative overflow-hidden">
      {/* পেছনের সাবটল গ্র্যাডিয়েন্ট আভা */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern Dark Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="inline-block text-black dark:text-white text-[11px] font-bold tracking-[0.25em] uppercase bg-accent-500/10 border border-accent-500/20 px-5 py-2 rounded-full mb-6 backdrop-blur-sm">
            Why SAZIN
          </span>
        </div>

        {/* Bento Grid with Glassmorphism */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {strengths.map((item, i) => {
            // প্রথম এবং চতুর্থ কার্ডকে বড় (wide) করার লজিক
            const isWide = i === 0 || i === 3;
            // ওয়াটারমার্ক নম্বর তৈরি (01, 02...)
            const num = `0${i + 1}`;

            return (
              <div
                key={i}
                className={`group relative rounded-3xl border border-white/[0.08] dark:bg-white/[0.03] bg-white backdrop-blur-xl p-8 lg:p-10
                  hover:border-accent-400/50 hover:bg-white/[0.06] 
                  hover:shadow-[0_0_40px_-10px_rgba(var(--accent-color),0.3)]
                  transition-all duration-700 overflow-hidden
                  ${isWide ? 'sm:col-span-2' : 'sm:col-span-1'}`}
              >
                {/* বিশাল ওয়াটারমার্ক নম্বর */}
                <span className="absolute -top-4 -right-2 text-[9rem] lg:text-[11rem] font-black dark:text-white/[0.05] text-gray-300 leading-none select-none pointer-events-none transition-all duration-700 group-hover:text-white/[0.07]">
                  {num}
                </span>

                {/* হোভারে যে গ্লো আসবে সেটি */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-accent-500/5 via-transparent to-transparent" />

                <div className={`relative z-10 flex gap-6 items-start ${isWide ? 'flex-row' : 'flex-col'}`}>
                  
                  {/* আইকন কন্টেইনার */}
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/10 border border-accent-500/20 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-accent-400/50 transition-all duration-500">
                    {item.icon}
                  </div>

                  {/* টেক্সট কন্টেন্ট */}
                  <div className={`${isWide ? 'pt-1' : 'pt-2'}`}>
                    <h3 className="font-heading text-xl font-bold dark:text-white text-black group-hover:text-accent-300 transition-colors duration-300">
                      {item.text}
                    </h3>
                    
                    {/* বড় কার্ডগুলোর জন্য বর্ণনা (ঐচ্ছিক) */}
                    {isWide && (
                      <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-lg">
                        Setting industry benchmarks through relentless innovation and uncompromised quality standards.
                      </p>
                    )}

                    {/* ছোট একটি অ্যাকসেন্ট লাইন */}
                    <div className="w-8 h-0.5 bg-accent-500/30 group-hover:w-16 group-hover:bg-accent-400 transition-all duration-500 mt-4 rounded-full" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}