import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden ">
      {/* soft decorative circles */}
      <div className="animate-float-soft absolute -left-16 top-10 h-56 w-56 rounded-full bg-rose-soft blur-3xl"></div>
      <div className="animate-float-soft absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-rose-100/70 blur-3xl"></div>

      <div className=" relative mx-auto max-w-3xl text-center px-6 py-24 sm:py-32">
        <p className="animate-fade-up text-xs font-semibold tracking-[0.3em] text-rose-brand">
          A LITTLE LOVE STORY
        </p>
        <h1
          style={{ animationDelay: "0.15s" }}
          className="animate-fade-up mt-5 text-3xl font-bold leading-snug sm:text-5xl sm:leading-snug"
        >
          နှလုံးသားထဲက မပြောဖြစ်ခဲ့တဲ့ စကားများ
        </h1>
        <p
          style={{ animationDelay: "0.3s" }}
          className="animate-fade-up mt-6 text-base text-muted sm:text-lg"
        >
          အချစ်၊ အလွမ်း၊ ဝမ်းနည်းမှုနဲ့ ဘဝအတွေးအခေါ်တွေကို ဝတ္ထုတိုလေးတွေအဖြစ်
          စုစည်းထားတဲ့ နေရာလေးပါ။ ပင်ပန်းတဲ့နေ့တစ်နေ့ရဲ့ အဆုံးမှာ အေးအေးဆေးဆေး
          ဖတ်ရင်း နှလုံးသားကို အနားပေးလိုက်ပါ။
        </p>
        <a
          href="#stories"
          className="animate-fade-up mt-10 inline-block rounded-full bg-rose-brand px-8 py-3 font-medium text-white shadow-lg shadow-rose-brand/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          style={{ animationDelay: "0.45s" }}
        >
          သင့်ရဲ့ ခံစားချက်နဲ့ တိုက်ဆိုင်မယ့် ဇာတ်လမ်းလေးတွေကို
          ရွေးချယ်ဖတ်ရှုလိုက်ပါ။
        </a>
      </div>
    </section>
  );
};

export default Hero;
