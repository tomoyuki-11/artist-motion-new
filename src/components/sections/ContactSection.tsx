"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContact } from "@/lib/adminApi";
import { useState } from "react";
import { toast } from "sonner";

export function ContactSection() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSending, setContactSending] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactSending) return;
    const name = contactName.trim();
    const email = contactEmail.trim();
    const message = contactMessage.trim();
    if (!name || !email || !message) {
      toast.error("名前・メールアドレス・お問い合わせ内容を入力してください。");
      return;
    }
    setContactSending(true);
    try {
      const data = await sendContact({ name, email, message });
      if (!data.ok) {
        toast.error(data.error ?? "送信に失敗しました。");
        return;
      }
      toast.success("送信しました。ご連絡ありがとうございます。");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch {
      toast.error("送信に失敗しました。しばらくしてからお試しください。");
    } finally {
      setContactSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-slate-800 text-white py-24 md:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />
      <div className="container relative max-w-2xl z-10">
        <AnimatedSection animation="scale" delay={100} className="space-y-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              お問い合わせ
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mt-4">
              下記フォームよりお気軽にどうぞ。
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-6 text-left">
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="text-white">
                お名前 <span className="text-red-300">*</span>
              </Label>
              <Input
                id="contact-name"
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="山田 太郎"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email" className="text-white">
                メールアドレス <span className="text-red-300">*</span>
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="example@email.com"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message" className="text-white">
                お問い合わせ内容 <span className="text-red-300">*</span>
              </Label>
              <Textarea
                id="contact-message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="ご質問・ご要望などをご記入ください。"
                rows={5}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 resize-y min-h-[120px]"
                required
              />
            </div>
            <div className="pt-2 text-center">
              <Button
                type="submit"
                disabled={contactSending}
                className="btn-bold bg-white text-slate-800 hover:bg-slate-100 px-10 py-5 text-lg rounded-lg disabled:opacity-60"
              >
                {contactSending ? "送信中..." : "送信する"}
              </Button>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
