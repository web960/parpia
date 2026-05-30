"use client";

import { useEffect, useState } from "react";
import styles from "./GoldPriceTicker.module.css";

const metals = [
  { symbol: "XAU", label: "Gold 24K", unit: "AED/g" },
  { symbol: "XAG", label: "Silver", unit: "AED/g" },
  { symbol: "XPT", label: "Platinum", unit: "AED/g" },
  { symbol: "XPD", label: "Palladium", unit: "AED/g" },
];

const mockPrices: Record<string, { price: number; change: number }> = {
  XAU: { price: 287.42, change: 0.34 },
  XAG: { price: 3.18, change: -0.12 },
  XPT: { price: 112.5, change: 0.08 },
  XPD: { price: 98.2, change: 0.21 },
};

export default function GoldPriceTicker() {
  const [prices, setPrices] = useState(mockPrices);
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString("en-AE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );

    const interval = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          const delta = (Math.random() - 0.48) * 0.5;
          next[key] = {
            price: +(next[key].price + delta).toFixed(2),
            change: +(next[key].change + (Math.random() - 0.5) * 0.05).toFixed(
              2,
            ),
          };
        }
        return next;
      });
      setTime(
        new Date().toLocaleTimeString("en-AE", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const items = metals.flatMap((metal) => {
    const data = prices[metal.symbol];
    const isUp = data.change >= 0;
    return [
      {
        key: metal.symbol,
        label: metal.label,
        price: data.price.toFixed(2),
        change: `${isUp ? "▲" : "▼"} ${Math.abs(data.change).toFixed(2)}%`,
        isUp,
      },
    ];
  });

  const tickerContent = [...items, ...items];

  return (
    <div className={styles.ticker} aria-label="Live precious metals prices">
      <div className={styles.live}>
        <span className={styles.dot} />
        LIVE
        {time && <span className={styles.time}>{time} GST</span>}
      </div>
      <div className={styles.trackWrap}>
        <div className={styles.track}>
          {tickerContent.map((item, i) => (
            <div key={`${item.key}-${i}`} className={styles.item}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.price}>AED {item.price}</span>
              <span
                className={`${styles.change} ${item.isUp ? styles.up : styles.down}`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
