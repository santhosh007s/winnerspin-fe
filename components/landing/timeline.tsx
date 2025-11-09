"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function MyJourneyPage() {
  const data = [
    {
      title: "Join a Season & Start Saving",
      content: (
        <p className="text-neutral-500 dark:text-neutral-300">
          Each season runs for a fixed period. Join by choosing your plan and
          save a set amount every month — no hidden charges or risks.
        </p>
      ),
    },
    {
      title: "Pay Monthly & Enter Lucky Draws",
      content: (
        <div className="space-y-2 text-neutral-500 dark:text-neutral-300">
          <ul className="list-disc pl-6 text-neutral-500 dark:text-neutral-300">
            <li>
              Pay your monthly amount before the due date to stay active in the
              season.
            </li>
            <li>
              All on-time payers automatically enter the monthly lucky draw and
              stand a chance to win exciting cash prizes.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Get Rewards at Season End",
      content: (
        <ul className="list-disc pl-6 text-neutral-500 dark:text-neutral-300">
          <li>
            At the end of the season, every member receives home appliances
            worth the total amount they’ve saved.
          </li>
          <li>
            The lucky draw prizes won during the season are extra bonuses on top
            of your savings.
          </li>
        </ul>
      ),
    },
  ];

  return (
    <div className="  min-h-screen">
      <Timeline data={data} />
    </div>
  );
}
