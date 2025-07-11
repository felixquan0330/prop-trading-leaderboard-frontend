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
    await page.goto("https://freetalkzone.com/login", {
      waitUntil: "networkidle2",
    });

    // 2. Fill in login form
    await page.type('input[name="email"]', "minibear955@gmail.com");
    await page.type('input[name="password"]', "minibear2003330");

    // 3. Click login button
    await Promise.all([
      page.click('button[type="submit"]'), // Adjust selector as needed
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    // 4. Now go to leaderboard page
    await page.goto("https://freetalkzone.com/chat/chat-now", {
      waitUntil: "networkidle2",
    });

    // 5. Scrape anchor tags
    await page.waitForSelector("a");
    const data: LeaderboardItem[] = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a"));
      return links.map((link) => {
        const text = link.textContent?.trim() || "";
        const href = link.getAttribute("href") || "";
        return { text, href };
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