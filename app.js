// const express = require('express');
// const puppeteer = require('puppeteer');

// const app = express();

// app.get('/tenderdet', async (req, res) => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.setUserAgent(
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
//   );

//   await page.goto('https://gem.gov.in/', {
//     waitUntil: 'networkidle2',
//     timeout: 0
//   });

//   const content = await page.content();

//   await browser.close();

//   res.send(content);
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });




// import puppeteer from 'puppeteer-core';
// // Or import puppeteer from 'puppeteer-core';

// // Launch the browser and open a new blank page.
// const browser = await puppeteer.launch();
// const page = await browser.newPage();

// // Navigate the page to a URL.
// await page.goto('https://gem.gov.in/');

// // Set screen size.
// await page.setViewport({width: 1080, height: 1024});

// // Open the search menu using the keyboard.
// await page.keyboard.press('/');

// // Type into search box using accessible input name.
// await page.locator('::-p-aria(Search)').fill('automate beyond recorder');

// // Wait and click on first result.
// await page.locator('.devsite-result-item-link').click();

// // Locate the full title with a unique string.
// const textSelector = await page
//   .locator('::-p-text(Customize and automate)')
//   .waitHandle();
// const fullTitle = await textSelector?.evaluate(el => el.textContent);

// // Print the full title.
// console.log('The title of this blog post is "%s".', fullTitle);

// await browser.close();

// const express = require('express');
// const puppeteer = require('puppeteer-core');

// const app = express();

// // 🔴 CHANGE THIS TO YOUR CHROME PATH
// const CHROME_PATH =
//   'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// // Example: eProcure / any JS-heavy site
// const TARGET_URL = 'https://eprocure.gov.in/eprocure/app';

// async function scrapeTenders() {
//   const browser = await puppeteer.launch({
//     executablePath: CHROME_PATH,
//     headless: true,
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   });

//   const page = await browser.newPage();

//   await page.setUserAgent(
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
//   );

//   // Speed optimization
//   await page.setRequestInterception(true);
//   page.on('request', (req) => {
//     if (['image', 'font', 'media'].includes(req.resourceType())) {
//       req.abort();
//     } else {
//       req.continue();
//     }
//   });

//   await page.goto(TARGET_URL, {
//     waitUntil: 'domcontentloaded',
//     timeout: 0,
//   });

// //   // Example: grab all visible links/text (demo-safe)
// //   const tenders = await page.evaluate(() => {
// //     const data = [];
// //     document.querySelectorAll('a').forEach((a) => {
// //       const text = a.innerText.trim();
// //       if (text.length > 20) {
// //         data.push(text);
// //       }
// //     });
// //     return data.slice(0, 10);
// //   });

// //   await browser.close();
// //   return tenders;
// // }

// const tenders = await page.evaluate(() => {
//   const rows = [];
  
//   document.querySelectorAll('table tbody tr').forEach(tr => {
//     const cells = tr.querySelectorAll('td');

//     if (cells.length > 3) {
//       rows.push({
//         title: cells[1]?.innerText.trim(),
//         reference: cells[2]?.innerText.trim(),
//         deadline: cells[3]?.innerText.trim()
//       });
//     }
//   });

//   return rows.slice(0, 10);
// });
// }

// app.get('/', async (req, res) => {
//   try {
//     const tenders = await scrapeTenders();

//     let html = `<h2>Scraped Tender Data (Demo)</h2>`;
//     tenders.forEach((t) => {
//       html += `<p>${t}</p>`;
//     });

//     res.send(html);
//   } catch (err) {
//     console.error(err);
//     res.send('Scraping failed');
//   }
// });

// app.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });




// const express = require('express');
// const puppeteer = require('puppeteer-core');

// const app = express();

// const CHROME_PATH =
//   'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// const TARGET_URL = 'https://eprocure.gov.in/eprocure/app';

// async function scrapeTenders() {
//   const browser = await puppeteer.launch({
//     executablePath: CHROME_PATH,
//     headless: true,
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   });

//   const page = await browser.newPage();

//   await page.setUserAgent(
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
//   );

//   // Speed optimization
//   await page.setRequestInterception(true);
//   page.on('request', (req) => {
//     if (['image', 'font', 'media'].includes(req.resourceType())) {
//       req.abort();
//     } else {
//       req.continue();
//     }
//   });

//   await page.goto(TARGET_URL, {
//     waitUntil: 'networkidle2',
//     timeout: 0,
//   });

//   // DEMO-SAFE scraping: visible tender-like text
//   const tenders = await page.evaluate(() => {
//     const results = [];

//     document.querySelectorAll('a').forEach(a => {
//       const text = a.innerText.trim();
//       if (
//         text.length > 30 &&
//         /maintenance|work|repair|providing|supply/i.test(text)
//       ) {
//         results.push({ title: text });
//       }
//     });

//     return results.slice(0, 10);
//   });

//   await browser.close();
//   return tenders;
// }

// app.get('/', async (req, res) => {
//   try {
//     const tenders = await scrapeTenders();

//     let html = `<h2>Scraped Tender Data (Demo)</h2>`;

//     tenders.forEach((t, i) => {
//       html += `<p>${i + 1}. ${t.title}</p>`;
//     });

//     res.send(html);
//   } catch (err) {
//     console.error(err);
//     res.send('Scraping failed');
//   }
// });

// app.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });




const express = require('express');
const puppeteer = require('puppeteer-core');

const app = express();
app.set('view engine', 'ejs');

// 🔴 UPDATE CHROME PATH
const CHROME_PATH =
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// 🔵 MULTIPLE TENDER SOURCES (DEMO SET)
const SOURCES = [
  {
    name: 'eProcure',
    url: 'https://eprocure.gov.in/eprocure/app'
  },
  {
    name: 'Collectorate (Chhattisgarh)',
    url: 'https://jashpur.nic.in/en/notice_category/tender/'
  },
  {
    name: 'Bank Tender',
    url: 'https://bankofbaroda.in/tender'
  }
];

async function scrapeAllSources() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  );

  const allTenders = [];

  for (const source of SOURCES) {
    try {
      await page.goto(source.url, {
        waitUntil: 'domcontentloaded',
        timeout: 0,
      });

      const tenders = await page.evaluate(() => {
        const seen = new Set();
        const results = [];

        document.querySelectorAll('a').forEach(a => {
          let text = a.innerText?.trim() || '';
          text = text.replace(/^\d+\.\s*/, '');

          if (
            text.length > 40 &&
            /work|maintenance|repair|supply|installation|providing/i.test(text)
          ) {
            if (!seen.has(text)) {
              seen.add(text);
              results.push(text);
            }
          }
        });

        return results.slice(0, 5);
      });

      tenders.forEach(t => {
        allTenders.push({
          title: t,
          source: source.name
        });
      });

    } catch (err) {
      console.error(`Failed for ${source.name}`);
    }
  }

  await browser.close();
  return allTenders;
}

// app.get('/', async (req, res) => {
//   try {
//     const tenders = await scrapeAllSources();
//     // res.render('tenders', { tenders });
//     res.json(tenders);

//   } catch (err) {
//     console.error(err);
//     res.send('Scraping failed');
//   }
// });


app.get('/api/tenders', async (req, res) => {
  try {
    const tenders = await scrapeAllSources();
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ error: 'Scraping failed' });
  }
});



app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
