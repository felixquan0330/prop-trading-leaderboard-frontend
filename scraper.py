from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import json

def scrape_breakoutprop_leaderboard():
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    # chrome_options.add_argument("--headless")  # Uncomment for headless mode

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.implicitly_wait(10)

    try:
        # 1. Go to login page
        driver.get("https://portal.breakoutprop.com/sign-in")
        time.sleep(2)

        # 2. Fill in login form
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.NAME, "email"))
        ).send_keys("minibear955@gmail.com")
        driver.find_element(By.NAME, "password").send_keys("Minibear2003330!")

        # 3. Click login button
        driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()

        # 4. Wait for redirect after login
        WebDriverWait(driver, 20).until(
            lambda d: "/app" in d.current_url
        )

        # 5. Go to leaderboard page
        driver.get("https://portal.breakoutprop.com/app/leaderboard")
        print("Navigated to leaderboard page.")

        # 6. Wait for leaderboard items to load (wait for at least one .MuiListItem-root)
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CLASS_NAME, "MuiListItem-root"))
        )
        time.sleep(2)  # Extra wait for all data to load

        # 7. Scrape leaderboard items
        items = driver.find_elements(By.CLASS_NAME, "MuiListItem-root")
        data = []
        for item in items:
            name_elem = item.find_element(By.CLASS_NAME, "MuiListItemText-root")
            profit_elem = item.find_element(By.CLASS_NAME, "MuiListItemSecondaryAction-root")
            data.append({
                "name": name_elem.text.strip(),
                "profit": profit_elem.text.strip()
            })

        # 8. Save to JSON
        with open("breakoutprop_leaderboard.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print("Scraped and saved leaderboard data.")
        return data

    except Exception as e:
        print(f"Error: {e}")
        return None
    finally:
        driver.quit()

if __name__ == "__main__":
    scrape_breakoutprop_leaderboard() 