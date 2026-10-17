import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { COMPANY } from "../../lib/content";

export const metadata: Metadata = {
  title: "Contact - Abrot Cyber",
  description: "Request an assessment from Abrot Cyber, Addis Ababa."
};

export default function ContactPage() {
  return (
    <div className="wrap section">
      <div className="page-head">
        <div>
          <h1>Contact</h1>
          <p className="sub">
            Tell us what keeps you up at night. We reply within one business day -
            and the first conversation is always free.
          </p>
        </div>
      </div>
      <div className="grid-2">
        <ContactForm />
        <div className="panel">
          <div className="panel-head">
            <h2>Direct lines</h2>
          </div>
          <div className="panel-body">
            <p className="sub">General and assessments</p>
            <p className="mono">{COMPANY.email}</p>
            <p className="sub" style={{ marginTop: 14 }}>Phone (office hours, EAT)</p>
            <p className="mono">{COMPANY.phone}</p>
            <p className="sub" style={{ marginTop: 14 }}>Office</p>
            <p>{COMPANY.city}</p>
            <p className="sub" style={{ marginTop: 14 }}>
              Existing incident? Our engagement line operates 24/7 for retained
              clients. If you are mid-incident and not yet a client, still call - we
              would rather help than have you wait.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
