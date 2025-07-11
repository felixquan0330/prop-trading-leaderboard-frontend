from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import json
import time
import os

def scrape_freetalkzone():
    # Configure Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    
    # Uncomment the line below if you want to run in headless mode
    # chrome_options.add_argument("--headless")
    
    driver = None
    try:
        # Initialize the driver with automatic Chrome driver management
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        # Execute script to remove webdriver property
        driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        
        driver.implicitly_wait(10)
        
        # 1. Go to login page first
        print("Navigating to login page...")
        driver.get("https://freetalkzone.com/login")
        
        # Wait for page to load
        time.sleep(2)
        
        # 2. Fill in login form
        print("Filling login form...")
        try:
            email_input = WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.NAME, "email"))
            )
            email_input.clear()
            email_input.send_keys("minibear955@gmail.com")
            
            password_input = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.NAME, "password"))
            )
            password_input.clear()
            password_input.send_keys("minibear2003330")
            
        except Exception as e:
            print(f"Error finding login form elements: {e}")
            # Try alternative selectors
            try:
                email_input = driver.find_element(By.CSS_SELECTOR, 'input[type="email"]')
                email_input.send_keys("minibear955@gmail.com")
                
                password_input = driver.find_element(By.CSS_SELECTOR, 'input[type="password"]')
                password_input.send_keys("minibear2003330")
            except Exception as e2:
                print(f"Alternative selectors also failed: {e2}")
                return None
        
        # 3. Click login button
        print("Logging in...")
        try:
            submit_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[type="submit"]'))
            )
            submit_button.click()
        except Exception as e:
            print(f"Error clicking submit button: {e}")
            # Try alternative button selectors
            try:
                submit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Login') or contains(text(), 'Sign In')]")
                submit_button.click()
            except Exception as e2:
                print(f"Alternative button selectors also failed: {e2}")
                return None
        
        # 4. Wait for navigation to chat page
        print("Waiting for navigation to chat page...")
        try:
            WebDriverWait(driver, 20).until(
                lambda driver: "chat-now" in driver.current_url
            )
            print(f"Successfully navigated to: {driver.current_url}")
        except Exception as e:
            print(f"Navigation timeout: {e}")
            print(f"Current URL: {driver.current_url}")
            # Try to navigate manually if automatic navigation failed
            if "chat-now" not in driver.current_url:
                print("Manually navigating to chat page...")
                driver.get("https://freetalkzone.com/chat/chat-now")
        
        # 5. Wait for chat page to fully load
        print("Waiting for chat page to fully load...")
        time.sleep(8)  # Increased wait time for complete loading
        
        # 6. Wait for scroll area to be present and scrape content
        print("Waiting for scroll area to load...")
        try:
            # Wait for the scroll area to be present
            scroll_area = WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'div[data-radix-scroll-area-viewport]'))
            )
            print("Scroll area found, starting to scrape content...")
            
            # Get page title and current URL
            page_title = driver.title
            current_url = driver.current_url
            
            data = {
                "page_info": {
                    "title": page_title,
                    "url": current_url
                },
                "links": [],
                "online_users": [],
                "chat_elements": []
            }
            
            # Scrape anchor tags from the scroll area
            print("Scraping anchor tags from scroll area...")
            
            # Find all anchor tags within the scroll area
            links = scroll_area.find_elements(By.TAG_NAME, "a")
            
            for link in links:
                try:
                    text = link.text.strip()
                    href = link.get_attribute("href") or ""
                    if text and href:
                        data["links"].append({
                            "text": text,
                            "href": href
                        })
                except Exception as e:
                    print(f"Error processing link: {e}")
                    continue
                    
        except Exception as e:
            print(f"Error finding scroll area or links: {e}")
            # Fallback: try to find links in the entire page
            try:
                print("Trying fallback: scraping all links from page...")
                links = driver.find_elements(By.TAG_NAME, "a")
                for link in links:
                    try:
                        text = link.text.strip()
                        href = link.get_attribute("href") or ""
                        if text and href:
                            data["links"].append({
                                "text": text,
                                "href": href
                            })
                    except Exception as e2:
                        print(f"Error processing fallback link: {e2}")
                        continue
            except Exception as e3:
                print(f"Fallback also failed: {e3}")
        
        # Try to find online users section within scroll area
        try:
            if 'scroll_area' in locals():
                # Look for elements that might contain online users within the scroll area
                user_elements = scroll_area.find_elements(By.XPATH, ".//*[contains(text(), 'ONLINE USERS') or contains(@class, 'user') or contains(@class, 'online')]")
                for element in user_elements:
                    try:
                        text = element.text.strip()
                        if text and len(text) > 0:
                            data["online_users"].append({
                                "text": text,
                                "tag": element.tag_name,
                                "class": element.get_attribute("class") or ""
                            })
                    except Exception as e:
                        continue
            else:
                # Fallback: search in entire page
                user_elements = driver.find_elements(By.XPATH, "//*[contains(text(), 'ONLINE USERS') or contains(@class, 'user') or contains(@class, 'online')]")
                for element in user_elements:
                    try:
                        text = element.text.strip()
                        if text and len(text) > 0:
                            data["online_users"].append({
                                "text": text,
                                "tag": element.tag_name,
                                "class": element.get_attribute("class") or ""
                            })
                    except Exception as e:
                        continue
        except Exception as e:
            print(f"Error finding online users: {e}")
        
        # Try to find chat-related elements within scroll area
        try:
            if 'scroll_area' in locals():
                # Look for chat-related elements within the scroll area
                chat_elements = scroll_area.find_elements(By.XPATH, ".//*[contains(@class, 'chat') or contains(@class, 'message') or contains(@class, 'room')]")
                for element in chat_elements:
                    try:
                        text = element.text.strip()
                        if text and len(text) > 0:
                            data["chat_elements"].append({
                                "text": text,
                                "tag": element.tag_name,
                                "class": element.get_attribute("class") or ""
                            })
                    except Exception as e:
                        continue
            else:
                # Fallback: search in entire page
                chat_elements = driver.find_elements(By.XPATH, "//*[contains(@class, 'chat') or contains(@class, 'message') or contains(@class, 'room')]")
                for element in chat_elements:
                    try:
                        text = element.text.strip()
                        if text and len(text) > 0:
                            data["chat_elements"].append({
                                "text": text,
                                "tag": element.tag_name,
                                "class": element.get_attribute("class") or ""
                            })
                    except Exception as e:
                        continue
        except Exception as e:
            print(f"Error finding chat elements: {e}")
        
        print(f"Found {len(data['links'])} links")
        print(f"Found {len(data['online_users'])} online user elements")
        print(f"Found {len(data['chat_elements'])} chat elements")
        
        # 4. Save to JSON file
        with open("scraped_data.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print("Data saved to scraped_data.json")
        
        # 5. Also print some sample data
        if data["links"]:
            print("\nSample links:")
            for i, item in enumerate(data["links"][:5]):
                print(f"{i+1}. {item['text']} -> {item['href']}")
        
        if data["online_users"]:
            print("\nSample online users:")
            for i, item in enumerate(data["online_users"][:3]):
                print(f"{i+1}. {item['text']} ({item['tag']})")
        
        if data["chat_elements"]:
            print("\nSample chat elements:")
            for i, item in enumerate(data["chat_elements"][:3]):
                print(f"{i+1}. {item['text']} ({item['tag']})")
        
        return data
        
    except Exception as e:
        print(f"Error during scraping: {e}")
        return None
        
    finally:
        if driver:
            driver.quit()
            print("Browser closed")

if __name__ == "__main__":
    result = scrape_freetalkzone()
    if result:
        print(f"\nScraping completed successfully!")
        print(f"Page: {result['page_info']['title']}")
        print(f"URL: {result['page_info']['url']}")
        print(f"Total links found: {len(result['links'])}")
        print(f"Total online user elements: {len(result['online_users'])}")
        print(f"Total chat elements: {len(result['chat_elements'])}")
    else:
        print("\nScraping failed!") 