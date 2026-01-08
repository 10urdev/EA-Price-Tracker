# 🌍 EA Play Global Price Tracker

[![Turkish](https://img.shields.io/badge/lang-TR-red)](README.TR.md)
> **🇹🇷 Türkçe Dokümantasyon:** [README.TR.md](README.TR.md) dosyasını inceleyebilirsiniz.

> [!TIP]
> **Live Demo:** [10urdev.github.io/EA-Price-Tracker/](10urdev.github.io/EA-Price-Tracker/) (Using latest scan data)

This project is a personal development tool I created to improve my skills in **Node.js, Asynchronous Architecture, and Proxy Management**, driven by my curiosity to find out which countries offer EA Play subscriptions at a lower price. It fetches and compares subscription prices from 89 different countries (covering almost all regions where EA Play is sold).

My goal was to manage complex web scraping operations and create a solution that bypasses real-world scenarios like region-locks.

## 🛠️ Technical Achievements & Features

### Backend & Data Management
*   **Asynchronous Architecture:** Uses `Promise.all` to scan 89 countries simultaneously within seconds without blocking operations.
*   **Smart Data Processing:** Processes raw JSON data to group the cheapest pricing options.
*   **Proxy Integration:** Implements a dynamic proxy structure to accurately analyze IP-based pricing.
*   **Error Management:** Features an automatic fallback mechanism to prevent system failure if live exchange rates cannot be fetched.

### Frontend & User Experience
*   **Modern Interface:** Designed a premium look using Tailwind CSS with Glassmorphism effects and modern typography.
*   **Dynamic Localization:** Developed frontend support for TR/EN languages and automatic currency conversion based on IP.
*   **Performance-Oriented Rendering:** Delivers a fluid user experience by rendering data streams directly to the DOM (flicker-free).
*   **Static File Generation:** Designed an "offline" HTML generation mechanism where data is embedded, allowing the report to be viewed without an active Node server.

## 🚀 Installation

1.  **Clone the Project:**
    Clone this repository to your computer or download it as a ZIP file.

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configuration (.env):**
    Create a file named `.env` in the project root directory and add your proxy service details (e.g., IPRoyal) in the following format:
    ```env
    EARTH_PROXY_URL=http://user:password_country-COUNTRY_CODE@proxy.address:port
    ```
    *Note: Leave `COUNTRY_CODE` as is; the code will automatically replace it.*

## 🎮 Usage

**Standard (Recommended) Mode:**
Displays only the top 5 cheapest price groups and hides expensive countries.
```bash
node ea-price-tracker.js
```

**Full List Mode:**
To view prices for all 89 countries:
```bash
node ea-price-tracker.js --full
```

## 📋 Example Output

```text
📊 PRO - YEARLY PRICES (Base Country: Turkey - $120.00)
════════════════════════════════════════════════════════════
🥇 Price: $39.81 (₺1713.49)
   Countries: Egypt

🥈 Price: $65.45 (₺2817.06)
   Countries: Ukraine
...
```

## ⚠️ Legal Disclaimer
This project is for educational and market analysis purposes only. Responsibility regarding regional pricing policies and account rules belongs solely to the user.
