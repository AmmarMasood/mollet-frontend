import React from "react";
import Layout from "@/components/Layout";
import Questionaire from "@/components/Questionaire/Questionaire";
import { parseCookies } from "../helpers";

const questions = [
  {
    question:
      "In general, how would your best friend describe you as a risk-taker?",
    answers: [
      "A real gambler",
      "Willing to take risks after completing adequate research",
      "Cautious",
      "A real risk avoider",
    ],
    points: [4, 3, 2, 1],
  },
  {
    question:
      "You are on a TV game show and can choose one of the following. Which would you take?",
    answers: [
      "1,000 in cash",
      "A 50% chance at winning 5,000",
      "A 25% chance at winning 10,000",
      "A 5% chance at winning 100,000",
    ],
    points: [1, 2, 3, 4],
  },
  {
    question:
      "You have just finished saving for a “once-in-a-lifetime” vacation. Three weeks before you plan to leave, you lose your job. You would:",
    answers: [
      "Cancel the vacation",
      "Take a much more modest vacation",
      "Go as scheduled, reasoning that you need the time to prepare for a job search",
      "Extend your vacation, because this might be your last chance to go first-class",
    ],
    points: [1, 2, 3, 4],
  },
  {
    question:
      "If you unexpectedly received 20,000 to invest, what would you do?",
    answers: [
      "Deposit it in a bank account, money market account, or an insured CD",
      "Invest it in safe high-quality bonds or bond mutual funds.",
      "Invest it in stocks or stock mutual funds",
    ],
    points: [1, 2, 3],
  },
  {
    question:
      "In terms of experience, how comfortable are you investing in stocks or stock mutual funds?",
    answers: [
      "Not at all comfortable",
      "Somewhat comfortable",
      "Very comfortable",
    ],
    points: [1, 2, 3],
  },
  {
    question:
      "When you think of the word “risk” which of the following words comes to mind first?",
    answers: ["Loss", "Uncertainty", "Opportunity", "Thrill"],
    points: [1, 2, 3, 4],
  },
  {
    question:
      "Some experts are predicting prices of assets such as gold, jewels, collectibles, and real estate (hard assets) to increase in value; bond prices may fall however, experts tend to agree that government bonds are relatively safe. Most of your investment assets are now in high-interest government bonds. What would you do?",
    answers: [
      "Hold the bonds",
      "Sell the bonds, put half the proceeds into money market accounts, and the other half into hard assets",
      "Sell the bonds and put the total proceeds into hard assets",
      "Sell the bonds, put all the money into hard assets, and borrow additional money to buy more",
    ],
    points: [1, 2, 3, 4],
  },
  {
    question:
      "Given the best and worst case returns of the four investment choices below, which would you prefer?",
    answers: [
      "200 gain best case; 0 gain/loss worst case",
      "800 gain best case; 200 loss worst case",
      "2,600 gain best case; 800 loss worst case",
      "4,800 gain best case; 2,400 loss worst case",
    ],
    points: [1, 2, 3, 4],
  },
  {
    question:
      "In addition to whatever you own, you have been given 1,000. You are now asked to choose between:",
    answers: [
      "A sure gain of 500",
      "A 50% chance to gain 1,000 and a 50% chance to gain nothing",
    ],
    points: [1, 3],
  },
  {
    question:
      "In addition to whatever you own, you have been given 2,000. You are now asked to choose between:",
    answers: [
      "A sure loss of 500",
      "A 50% chance to lose 1,000 and a 50% chance to lose nothing",
    ],
    points: [1, 3],
  },
  {
    question:
      "Suppose a relative left you an inheritance of $100,000, stipulating in the will that you invest ALL the money in ONE of the following choices. Which one would you select?",
    answers: [
      "A savings account or money market mutual fund",
      "A mutual fund that owns stocks and bonds",
      "	A portfolio of 15 common stocks",
      "Commodities like gold, silver, and oil",
    ],
    points: [1, 2, 3, 4],
  },
  {
    question:
      "If you had to invest 20,000, which of the following investment choices would you find most appealing?",
    answers: [
      "60% in low-risk investments 30% in medium-risk investments 10% in high-risk investments",
      "30% in low-risk investments 40% in medium-risk investments 30% in high-risk investments",
      "10% in low-risk investments 40% in medium-risk investments 50% in high-risk investments",
    ],
    points: [1, 2, 3],
  },
  {
    question:
      "Your trusted friend and neighbor, an experienced geologist, is putting together a group of investors to fund an exploratory gold mining venture. The venture could pay back 50 to 100 times the investment if successful. If the mine is a bust, the entire investment is worthless. Your friend estimates the chance of success is only 20%. If you had the money, how much would you invest?",
    answers: [
      "Nothing",
      "One month’s salary",
      "Three month’s salary",
      "Six month’s salary",
    ],
    points: [1, 2, 3, 4],
  },
  {
    question: "",
    answers: [],
    points: [],
  },
];

function Index({ token }) {
  return <Layout childern={<Questionaire data={questions} token={token} />} />;
}

export default Index;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
