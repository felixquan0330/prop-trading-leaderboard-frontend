import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

type LeaderboardItem = {
  name: string;
  profit: string;
};

export async function GET(req: NextRequest) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto("https://portal.breakoutprop.com/app/leaderboard", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(".leaderboard__row");

    const data: LeaderboardItem[] = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".leaderboard__row"));
      return rows.map((row) => {
        const name = row.querySelector(".css-1xczk6k")?.textContent?.trim() || "";
        const profit = row.querySelector(".css-1pi6ksg")?.textContent?.trim() || "";
        return { name, profit };
      });
    });

    await browser.close();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Scrape error:", err.message);
    return new Response(JSON.stringify({ error: "Failed to scrape leaderboard" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}