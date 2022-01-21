# mixin.fan

The listings portal for Mixin Ecosystem.

## Submit New Applications

**Prerequisites**

- an icon with size of at 256x256 pixels in PNG format. Please compress your icon at [tinypng](https://tinypng.com/) to reduce the size.
- a JSON-based bot description file to describe your bot. Read the following section for the specification of the JSON file.

**Submit**

- fork this repo.
- create a folder named your bot's id `/static/bots/` directory
- put you the icon and JSON file in the folder and name them as `icon.png` and `index.json`
- create a PR to submit your changes

## Bot Description File

The bot description file includes required fields and optional fields.

```json
{
  // required fields.
  // id, client_id, url, name, text, language
  "id": "Your bot ID. e.g. 70001010001",
  "client_id": "your bot client_id. e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "url": "your bot's home url. e.g. https://mixin.one",
  // bot name
  "name": {
    "en": "Your bot's name",
    "ja": "Your bot's name in Japanese"
  },
  // description, up to 3 lines
  "text": {
    "en": ["The first line of description", "The 2nd line of description"]
  },
  // the category of your bot.
  "category": "exchange",
  // tags of the bot, up to 3 tags for each language
  "tags": {
    "en": ["Mint", "Pando"]
  },
  // default language
  "language": "en",
  // supported language
  "languages": ["en", "ja", "zh", "de", "es"],

  // optional fields.
  "developer": {
    "name": "the developer's name",
    "url": "the url of the developer"
  },
  // website and support_url
  "website": "Your bot's official website url",
  "support_url": "your bot's support url",
  // mtg information. omit it empty if your bot is not a MTG application
  "mtg": {
    "members": [
      "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1",
      "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx2",
      "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx3",
      "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx4",
      "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx5"
    ],
    "threshold": 3
  },
  // mvm information. omit  it empty if your bot is not a MVM application
  "mvm": {
    "contract_url": "https://..."
  },
  // if your bot has some limitation from using them, please specify here.
  "limitation": ""
}
```

## Submit New Category

- fork this repo.
- add a new category at `/bots.ts`
- create a PR to submit your changes

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
