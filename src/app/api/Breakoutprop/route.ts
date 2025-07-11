import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

type LeaderboardItem = {
  text: string;
  href: string;
};

export async function GET(req: NextRequest) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // 1. Go to login page
    await page.goto("https://portal.breakoutprop.com/sign-in", {
      waitUntil: "networkidle2",
    });

    // 2. Fill in login form
    await page.type('input[name="email"]', "YOUR_EMAIL");
    await page.type('input[name="password"]', "YOUR_PASSWORD");

    // 3. Click login button and wait for navigation
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    // 4. Go to leaderboard page
    await page.goto("https://portal.breakoutprop.com/app/leaderboard", {
      waitUntil: "networkidle2",
    });

    // 5. Wait for leaderboard items to load
    await page.waitForSelector(".MuiListItem-root", { timeout: 30000 });

    // 6. Scrape leaderboard items
    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".MuiListItem-root"));
      return rows.map((row) => {
        const name = row.querySelector(".MuiListItemText-root")?.textContent?.trim() || "";
        const profit = row.querySelector(".MuiListItemSecondaryAction-root")?.textContent?.trim() || "";
        return { name, profit };
      });
    });

    await browser.close();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Scrape error:", err);
    return new Response(JSON.stringify({ error: "Failed to scrape leaderboard" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}