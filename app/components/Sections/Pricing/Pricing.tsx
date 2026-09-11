'use client';

import Link from "next/link";
import { useState } from "react";
import styles from "./pricing.module.css";

const plans = [
  { name: "Free", description: "For trying out the essentials", monthly: "$0", yearly: "$0", features: ["25 short links / month", "Basic click analytics", "QR code generation"], action: "Start for free" },
  { name: "Pro", description: "For creators and growing teams", monthly: "$12", yearly: "$9", features: ["Unlimited short links", "Real-time analytics", "Custom branded domains", "Team collaboration"], action: "Start Pro trial", popular: true },
  { name: "Business", description: "For teams that need more control", monthly: "$39", yearly: "$32", features: ["Everything in Pro", "Advanced reporting", "Priority support", "Multiple workspaces"], action: "Choose Business" },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section className={styles.section} id="pricing">
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Simple pricing</p>
        <h2>Start free. Scale as you grow.</h2>
        <p>No hidden fees. Cancel anytime.</p>
      </div>
      <div className={styles.toggle} role="group" aria-label="Billing frequency">
        <button className={!yearly ? styles.active : ""} onClick={() => setYearly(false)} aria-pressed={!yearly}>Monthly</button>
        <button className={yearly ? styles.active : ""} onClick={() => setYearly(true)} aria-pressed={yearly}>Yearly <span>Save 25%</span></button>
      </div>
      <div className={styles.cards}>
        {plans.map((plan) => <article className={`${styles.card} ${plan.popular ? styles.popular : ""}`} key={plan.name}>
          {plan.popular && <span className={styles.badge}>Most popular</span>}
          <h3>{plan.name}</h3><p className={styles.planDescription}>{plan.description}</p>
          <div className={styles.price}>{yearly ? plan.yearly : plan.monthly}<small>{plan.name === "Free" ? "" : " / month"}</small></div>
          <Link href="#contact" className={styles.cta}>{plan.action}</Link>
          <ul>{plan.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
        </article>)}
      </div>
    </section>
  );
}
