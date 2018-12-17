# Gumtree offer scrapper

It fetches selected Gumtree URLs every minute and sends you emails with a full offer content, so you have a real-time notifications and clear, ad-free experience!

## How to use

1. `npm install`
2. In `config` directory create `config.yml` file and pass your configuration basing on `defaults.yml`. It's preconfigurated to look for flats in Warsaw and send offers via Mailjet. Absolute minimum is to define `smtpAuth`, `from` and `to`.
3. `npm start`
4. Enjoy!

## Configuration

Basic configuration is defined in `config/defaults.yml`. Fields are pretty self-explanatory.

Additional options are described below.

### Filters

When you want to use a filter that is not natively available on Gumtree
(i.e. flat size), then you can filter it out manually.

Syntax example:

```yaml
filter:
  Number Property Name:
    number:
      lte: 10
      gte: 20
      # or just pass the value to do exact match
  Date Property Name:
    rejectEmpty: true # if you don't want to struggle with incomplete offers
    date:
      gte: 2018-11-27
      lte: 2019-11-27
      # or just pass the value to do exact match
  Regex Property Name:
    regex: reg.*ex h(e|r)e, in javascript syntax
```
