# Gumtree offer scrapper

It fetches selected Gumtree URLs every minute and sends you emails with a full offer content, so you have a real-time notifications and clear, ad-free experience!

## How to use

1. `npm install`
2. In `config` directory create `config.yml` file and pass your configuration basing on `defaults.yml`. It's preconfigurated to look for flats in Warsaw and send offers via Mailjet. Absolute minimum is to define `smtpAuth`, `from` and `to`.
3. `npm start`
4. Enjoy!
