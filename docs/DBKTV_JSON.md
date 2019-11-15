# DBKTV JSON

## Overview

[Authentication](#authentication)  
[Content and Digital Asset Management](#content-and-digital-asset-management)  
[TV Schema](#tv-schema)  
[Creating Slide Decks & The Ticker](#creating-slide-decks-and-the-ticker)  
[Examples](#examples)  

## Authentication

Navigate to the [Firebase Console](https://console.firebase.google.com) and sign
in using the DBKTV email.

If you'd like to sign using your personal account, contact the Lab to get set
up.

When ready, click `dbktv` to open the Firebase project.

## Content and Digital Asset Management

The instructions below will help you get started creating slide decks.

### Getting Started

While curating content for DBKTV, you'll be using the Firebase menu to switch
between tabs for content and asset management.

#### Things to Note

- Tabs relevant to the TV Team
  - `Database`, `Storage`

#### Things That'll Make Lex Cry 🥺

- Messing with anything besides **`Database`** and **`Storage`**

### Digital Assets

To upload media and other files, click the **`Storage`** tab.

#### Retrieving Download URLs

To retrieve the download url for any file, complete the following steps:

1. Upload the file if you haven't already 😝
2. Click on the file you'd like to get the download url for. 
3. Under **`File location`**, hover over the link below **"Download URL"**.

4. Click to copy the download URL

#### Things to Note

- Files **cannot** be moved after uploading — choose the folder you want to upload to first!
- Image and video files should be uploaded to the **`assets`** folder under the respective folders

#### Things That'll Make Lex Cry 🥺

- The **`admin`** and **`assets/icons`** folders are for the Lab team. Ignore them!
- Follow the folder pattern pretty please

### Creating Content

DBKTV uses JSON to create slide decks. While an alternative CMS could be set up,
using JSON not only eases a possible WordPress integration, but allows the TV
Team to learn and/or become more familiar with JSON, which is **used in a
majority of the special projects**.

[Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

Deck slides and ticker content will be created in two separate files, which will
then be uploaded to Firebase Storage and the Realtime Database.

#### Editing Text

- To italicize a phrase, wrap it in underscores: `**_Are You The One_**`
- To add a line break, use **`\n\n`**

[Markdown Cheatsheet](https://stationinthemetro.com/wp-content/uploads/2013/04/Markdown_Cheat_Sheet_v1-1.pdf)

## TV Schema

### Slide Schema

Slides have a few common properties: `component`, `duration`, and `content`

```json
  {
  	"component": "",
  	"duration": 0,
  	"content": {}
  }
```

```json
  {
  	"component": "",
  	"duration": 0
  }
```

- `component` will have the value `Articles`, `Default`, `Multimedia`, or `News`
- `duration` should be the display duration of the slide in milliseconds
    - To display a slide for 15 seconds, the value should be `15000`
    - The default value is `10000`
- Depending on the value of `component`, the `content` field will have different
  properties or it may be `undefined`.

### Slide Schema: `Default`

To add a default slide to the deck, add the following object to your
`slides.json` file.

```json
  {
    "component": "Default",
    "duration": 15000
  }
```

### Slide Schema: `Articles`

This template should be used to feature two articles with an advertisement.

To create a slide that uses the **"Articles"** template, an object similar to
the following should be added to your `slides.json` file.

```json
  {
    "component": "Articles",
    "duration": 15000,
    "content": {
      "ads": [
        "300x600_DBK_TV",
        "300x600_Banner_C"
      ],
      "articles": [
         {
           "author": "Daisy Grant",
           "blurb": "If you’ve ever wondered what the love child of a reality dating show and a logic puzzle would be, look no further than MTV’s _Are You The One_? And this year, the puzzle is getting even harder.",
           "category": "tv",
           "headline": {
             "text": "Sexually fluid cast of MTV’s ‘Are You The One?’ shows surprisingly strong representation",
             "href": "https://dbknews.com/2019/07/03/are-you-the-one-sexually-fluid-cast-mtv-dating-show/"
           }
         },
         {
          "author": "Christine Condon",
           "blurb": "The University of Maryland’s Hornbake Library is planned to lose student study space this fall.\n\n",
           "category": "campus",
           "headline": {
            "text": "UMD students will lose some study space in Hornbake Library this fall",
            "href": "https://dbknews.com/2019/07/03/umd-hornbake-library-ischool-lose-study-space-students-remodel/"
           }
        }
      ]
    }
  }
```

- **`[content.ads](http://content.ads)`** should only contain **`300x600`** size
  ad units
- Tested ad unit codes: **`300x600_DBK_TV`** and **`300x600_Banner_C`**
- If five advertisers are running their ads on the TV, 5 Article template slides
  should be created

### Slide Schema: `Multimedia`

This template should be used to feature an image or video.

To create a slides that uses the “**Multimedia**” template, an object similar to
one of the following should be added to your `slides.json` file.

```json
  {
    "component": "Multimedia",
    "duration": 17000,
    "content": {
      "category": "special projects",
      "credit": "The Diamondback",
      "media": {
        "alt": "Monster Smashed: A single-page scrolling site showcasing spooky drinks from the book Monster Smashed.",
         "caption": "Monster Smashed: A single-page scrolling site showcasing spooky drinks from the book Monster Smashed.",
        "src": "https://firebasestorage.googleapis.com/v0/b/thedbktv.appspot.com/o/assets%2Fvideos%2Fmonster-smashed.mp4?alt=media&token=0973e1dd-54cd-4b08-8925-eaf12f169b4a",
        "video": true
      },
      "related": {
        "href": "https://dbknews.com/2017/10/24/monster-smashed-diamondback-special-project/",
         "text": "‘Monster Smashed’: The Diamondback’s spookiest project yet"
      }
    }
  }
```

### Slide Schema: `News`

This template should be used to feature one specific article.

To create a slide that uses the **"Top News"** template, add an object similar
to the following should to your `slides.json` file.

```json
  {
    "component": "News",
    "duration": 15000,
    "content": {
      "author": "Jason Fontelieu",
      "blurb": "Now you might ask: What is a hot girl summer? You may have seen several people caption their beach pictures with “hot girl summer” and some sort of emoji with its tongue out.\n\nBut before you can understand what a hot girl summer is, you must know the original hot girl herself: Megan Thee Stallion.\n\nMegan Thee Stallion is one of the biggest rappers at the moment — and on an amazingly swift come-up at that. You might have seen her recently on Jimmy Kimmel Live! performing her smash hit “Big Ole Freak” and the track “Realer” from her latest mixtape Fever. Her effortless moves and simple, yet stunning, costume are indicators of her swagger and showmanship.\n\nI won’t delve into a full-on review of Fever, but I’ll just say that there’s not a bad track on it. If you’re especially hoping to channel your inner hot girl, try “Simon Says” or “Shake That” to get the room dancing.",
      "headline": {
        "href": "https://dbknews.com/2019/07/16/hot-girl-summer-megan-thee-stallion-mixtape-rap-music/",
        "text": "You’ve heard of hot girl summer — but have you heard about the girl who started it?"
      },
      "image": {
        "alt": "Megan Thee Stallion has successfully branded Summer 2019 a hot girl summer (Photo via YouTube).\n",
        "src": "https://d3gx1wgrn4cpnk.cloudfront.net/uploads/2019/07/Screen-Shot-2019-07-16-at-8.49.45-PM-e1563324747898.png"
      }
    }
  }
```

### Ticker Schema: `TickerContent`

To add a link to the ticker, add an object similar to the following to the array in `ticker.json`

```json
  {
    "href": "https://dbknews.com/2019/07/24/umd-secure-wifi-wireless-devices-technology-eduroam-electronics/",
    "text": "UMD’s primary WiFi network is getting replaced next week"
  }
```

## Creating Slide Decks and The Ticker

Slide decks are JSON files with an array of slide content objects.

### 1. Using the editor of your choice, create two files: **`slides.json`** and **`ticker.json`**

### 2. An add empty array, `[]`, in each file then save it

### 3. As you create the deck / ticker, add different content to the arrays

### 4. Upload your files to Firebase Storage under `decks/XXXXXX`, where `XXXXXX` is the start date for the TV content; it will be referenced later as `deck_id`.

**Example**: `decks/082619` => `deck_id` = `082619`

### 5. Upload your content to the appropriate folder

### 6. Navigate to the `dbktv-decks` database by clicking on the `Database` tab

1. Click the `+` button to create a new node. In the `name` field, input  `deck_id`
2. Click the `+` button again to create a new node under `deck_id`. 
   - Create two new nodes, `slides` and `ticker`, giving them both the value `0` for now.
3. Click  the `Add` button to save your changes.
   - **Note:** Clicking add without populating the `value` field will delete the node!
4. Click on `slides` or `ticker`. Click on the three dots in the corner and then `Import JSON`
5. Upload the appropriate file
   - **Note:** Clicking add without populating the `value` field will delete the node!
6. After choosing your file, click `Import`
   - If there's a syntax error in your file, Firebase will warn you and it will **not upload the file**.
   - [The JSON Validator](https://jsonlint.com)
7. Repeat steps 4 through 6 to upload the second file to the database.
8. Navigate to the `thedbktv`  database and update `current` with the value of `deck_id`
   - **Note:** Updating this node will trigger the DBKTV app to automatically rerender

## **Examples**

- Mock Slides: [`/tests/__mocks__/Slides.mock.json`][../tests/__mocks__/Slides.mock.json]
- Mock SlideTickers: [`/tests/__mocks__/Ticker.mock.json`][../tests/__mocks__/Ticker.mock.json]
