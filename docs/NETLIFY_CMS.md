# Netlify CMS

This document will help you get logged in to the DiamondbackTV CMS and start
creating content. Following the instructions outlined below will allow the TV
Team to create new slides, as well as update the current slide deck and ticker.

## Overview

[Authentication](#authentication)  
[Generating Preview Links](#generating-preview-links)  
[Slides](#slides)  
[Decks](#decks)  
[Tickers](#tickers)  
[Settings](#settings)

## Authentication

Using the TV Team login credentials, log in to the DBKTV CMS admin site.

## Templates

After logging in, you'll be redirected to the DBKTV CMS dashboard. Currently,
the slide deck templates that can be created are:

- `Top News`: Displays a single article with a background image.
- `Multimedia`: Displays an image or video with a caption and an optional
  related article.
- `Group Articles`: Displays two articles in the left rail, and a `300x600` ad
  in the right rail.

### Top News

The Top News template features a single article with a background image.

Unlike the `Group Articles` template, it has room for three graphs as the blurb.

### Multimedia

The Multimedia template features a single image or video with a caption
(required) and an optional related article. When creating a Multimedia slide
with a video, use the site below to convert the video time (in seconds) to
milliseconds.

[Seconds to Milliseconds | Kyle's Converter](http://www.kylesconverter.com/time/seconds-to-milliseconds)

### Group Articles

The Group Articles template displays two article previews in the left rail, and
one `300x600` advertisement in the left rail. The blurbs for each article
preview should be 2-3 sentences.  

DBKTV Ad Units: `300x600_DBKTV`, `300x600_Banner_C`

## Generating Preview Links

To make the slide deck, you'll have to generate the preview link for each slide. To do so:

1. After saving your content, click `Check for Preview`.
2. When you see `View Preview`, click the link.
3. The preview will open in a new window.
4. **Make note of the preview link.**

**Make sure each link begins with `https://dbktv.netlify.com/api/content/`**

---

## Slides

To create a new deck slide, click on `Collections` and click the `New <Template Name>` button.

After saving your the initial entry, it can be marked as `**Draft**`, `**In
review**`, or `**Ready**`.

### **Only slides marked `Ready` can be published to the site.**

Unpublished slides can be viewed in the `Editorial Workflow` dashboard

Be sure to compile a list of preview links when you're done creating your slides.

## Decks

The slide deck is a collection of slide ids and their content. To create a new
slide deck, click on Decks, under `Collections`, and then on `New Deck`.

### Creating a New Deck

Have your list of preview links ready.

1. Click the `Add deck slide +` button to add a slide object to the deck.
2. Insert the link for the first slide you’d like displayed.

## Tickers

The ticker is a collection of links that scroll continuously at the bottom of
the screen.  

To create a new ticker, click on `Tickers`, under `Collections`, and then on
`New Ticker`.  

1. Click the `Add ticker item +` button to add an item object to the deck.
2. In the `URL` field, input the ticker link.
3. Insert the link title into the `text` field.
4. Make note of the preview link after you've published the ticker.

## Settings

To update the current deck and ticker, retrieve the appropriate preview links.

When ready, navigate to `Pages` and then `Settings`.
