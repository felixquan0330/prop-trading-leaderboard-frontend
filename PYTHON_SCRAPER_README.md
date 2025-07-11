# Python Web Scraper for Freetalkzone

This Python scraper uses Selenium to automate login and scrape data from the Freetalkzone website.

## Prerequisites

1. **Python 3.7+** installed on your system
2. **Google Chrome** browser installed
3. **pip** (Python package installer)

## Installation

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Alternative: Install packages individually:**
   ```bash
   pip install selenium==4.15.2
   pip install webdriver-manager==4.0.1
   pip install requests==2.31.0
   pip install beautifulsoup4==4.12.2
   ```

## Usage

### Basic Scraper
```bash
python scraper.py
```

### Improved Scraper (Recommended)
```bash
python scraper_improved.py
```

## Features

### scraper.py
- Basic Selenium web scraping
- Manual Chrome driver management
- Simple error handling

### scraper_improved.py (Recommended)
- Automatic Chrome driver management using `webdriver-manager`
- Better error handling with fallback selectors
- Anti-detection measures
- More detailed logging
- Sample data output

## Output

The scraper will:
1. Save scraped data to `scraped_data.json`
2. Print progress messages to console
3. Show sample data in console
4. Display total number of links found

## Configuration

### Credentials
Update the credentials in the script:
```python
email_input.send_keys("your_email@example.com")
password_input.send_keys("your_password")
```

### Headless Mode
To run in headless mode (no browser window), uncomment this line:
```python
chrome_options.add_argument("--headless")
```

## Troubleshooting

### Common Issues

1. **Chrome Driver Issues:**
   - The improved scraper uses `webdriver-manager` which automatically downloads the correct Chrome driver
   - If you still have issues, manually download ChromeDriver from: https://chromedriver.chromium.org/

2. **Login Failures:**
   - Check if the login form selectors have changed
   - Verify your credentials are correct
   - The improved scraper has fallback selectors for common variations

3. **No Data Found:**
   - The page might be loading slowly - increase wait times
   - Check if the website structure has changed
   - Run in non-headless mode to see what's happening

4. **Permission Errors:**
   - On Linux/Mac, you might need to make the script executable:
     ```bash
     chmod +x scraper_improved.py
     ```

### Debug Mode
To see what's happening, run in non-headless mode and watch the browser:
```python
# Comment out this line in the script:
# chrome_options.add_argument("--headless")
```

## Integration with Next.js

To integrate this with your Next.js API, you can:

1. **Call the Python script from Node.js:**
   ```javascript
   const { spawn } = require('child_process');
   
   const pythonProcess = spawn('python', ['scraper_improved.py']);
   ```

2. **Read the JSON output:**
   ```javascript
   const fs = require('fs');
   const data = JSON.parse(fs.readFileSync('scraped_data.json', 'utf8'));
   ```

3. **Or create a Python Flask/FastAPI server** and call it via HTTP

## Security Notes

- Never commit credentials to version control
- Use environment variables for sensitive data
- Consider rate limiting to avoid being blocked
- Respect the website's robots.txt and terms of service

## Example Output

```json
[
  {
    "text": "Chat Now",
    "href": "https://freetalkzone.com/chat/chat-now"
  },
  {
    "text": "Rooms",
    "href": "https://freetalkzone.com/rooms"
  },
  {
    "text": "My Contacts",
    "href": "https://freetalkzone.com/contacts"
  }
]
``` 