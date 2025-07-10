// pages/api/leaderboard.ts
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

type LeaderboardItem = {
  name: string;
  profit: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LeaderboardItem[] | { error: string }>
) {
  try {
    const browser = await puppeteer.launch({
      headless: true, // or true if this causes issues
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto("https://www.breakoutprop.com/leaderboard", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(".leaderboard__row");

    const data: LeaderboardItem[] = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".leaderboard__row"));
      return rows.map((row) => {
        const name = row.querySelector(".leaderboard__user-name")?.textContent?.trim() || "";
        const profit = row.querySelector(".leaderboard__profit")?.textContent?.trim() || "";
        return { name, profit };
      });
    });

    await browser.close();
    res.status(200).json(data);
  } catch (err: any) {
    console.error("Scrape error:", err.message);
    res.status(500).json({ error: "Failed to scrape leaderboard" });
  }
}
