const { spawn } = require("node-pty");
const puppeteer = require('puppeteer-core');
const devices = require('puppeteer-core/DeviceDescriptors');

const evasions = require('./apply-evasions.js');

//Login selectors
const USERNAME_SELECTOR = '#user';
const PASSWORD_SELECTOR = '#pass';
const LOGIN_BUTTON_SELECTOR = 'input[type="submit"]';

//Door selectors
const OPEN_DOOR_SELECTOR = 'form[name="confirmOpenDoor"]';
const RESPONSE_SELECTOR = '#content > div:nth-child(6) > div > div > div > div > h3 > strong';

//Door unlock service login
const USERNAME = 'username_here';
const PASSWORD = 'password_here';

const pyProcess = spawn("python3", ["./main.py"]);

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-infobars', '--noerrdialogs', '--disable-session-crashed-bubble', '--disable-gpu'],
    headless: true,
    executablePath: 'chromium-browser',
    ignoreHTTPSErrors: true,
    //slowMo: 50,
  });

  const page = await browser.newPage();
  await evasions(page);
  await page.emulate(devices['iPhone 6']);

  await page.goto('https://cardadmin.iit.edu');

  await login(page);

  pyProcess.on("data", data => {
    if (Math.abs(parseInt(data)) >= 10 && Math.abs(parseInt(data)) <= 20) {
      open_door(page);
    }
    console.log(data);
  });

  pyProcess.on("exit", exitCode => {
    console.log("Exiting with code " + exitCode);
  });

  await page.waitFor(1000 * 60 * 10);
  await browser.close();
})();

async function login(page) {

  await page.type(USERNAME_SELECTOR, USERNAME);
  await page.type(PASSWORD_SELECTOR, PASSWORD);

  await Promise.all([page.click(LOGIN_BUTTON_SELECTOR), page.waitForNavigation()])
};

async function open_door(page) {

  await page.goto('https://cardadmin.iit.edu/student/openmydoor.php');

  await Promise.all([page.click(OPEN_DOOR_SELECTOR), page.waitForNavigation()])

  const response = await page.$eval(RESPONSE_SELECTOR, e => e.innerHTML);

  console.log(response);

};
