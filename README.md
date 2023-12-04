# Manual social media embeds for Ghost

## Overview

Due to the various issues occurring on Twitter/X over the past several months (embeds blocked from certain sites, outages resulting in embeds not loading, etc.) I decided to put together some code for a range of snippets that can be used for creating manual embeds from any social media platform, for usage with [Ghost](https://ghost.org/?via=stromfeldt). Although these manual embeds were originally created with Twitter/X in mind, I've expanded the setup to easily allow for the insertion of the icon from any social media platform, and so rather than use the terms "Twitter embed" or "tweet" I'll be keeping things agnostic by referring instead to "manual social media embed" (which the class `msme` refers to) or just "embed".

Taking inspiration from the aesthetic design of [poet.so](https://poet.so/) (which, due to changes to Twitter's API, was rendered unable to create new PNG exports of tweets as of early-2023), I've expanded from poet.so's previous "limitation" of only allowing for the export of stripped down "plain" tweets (meaning nothing but text) to creating snippets that allow for a range of different embed types:

- plain embeds
- quote embeds
- readers added context embeds
- link embeds
- embeds with an image
- embeds with a video
- quote embeds with an image
- quote embeds with a video
- reposts

Perhaps the main advantage of these embeds is that all data for embeds can be stored on, and served from, one's site. Secondly, while all embeds are responsive and can also switch between light and dark modes, there's much less data to load than a large PNG file (à la poet.so) and conversely are much better quality than a compressed JPG file. Thirdly, all embeds have been optimised for emails/newsletters, and for the most part look no different than embeds inserted into posts via the default method of pasting in a link. The only manner in which they do look different is that embedded videos appear in emails as any video created with a video card normally would, while quoted portions of quote embeds are also included (which isn't the case with official Twitter/X embeds).

These embeds are however 100% manual as they do not scrape any data from any social media platform whatsoever. That being so, [@vikaspotluri123](https://github.com/vikaspotluri123) has created a script that utilizes the HTML <time> datetime attribute which thus displays the time of the embed's creation relative to one's location (as official embeds do).

How to use the manual embeds is explained in the following sections, while a live example in which many different kinds of these manual social media embeds for Ghost are put to use can be found via the post of mine in which they were launched with: [Doomberg Goes &quot;All-in&quot; on Substack's Network of VC-Enabled Grifters, While Others Decipher How to Ghost Substack](https://ff2f.com/how-to-ghost-substack).

## Snippets

There's currently eleven HTML files found in the /snippets directory, which, besides the actual content, contain everything needed except for the social media logo SVGs.

1. Copy the HTML from any file in the /snippets directory into an HTML card in Ghost's editor
2. Copy the SVG code from the file in the /social-media-icons directory that you're after (there's currently SVG icons for Twitter, X, Mastodon, Reddit, and Threads, with more likely to be added over time) and in the HTML card use that code to replace the `**MSME_ICON(S)**` line (customising this is explained further below)
3. If you'd like to re-use the HTML card, create a snippet out of it (I use ↑ and ↓ in lieu of ABOVE and BELOW, which can't be added to filenames but which can be added to snippet names)

Besides the above there's all the various data that need to be manually inserted, the description of that data often surrounded with two asterisks on each side (such as `**MSME_URL**`) in the location where it belongs. A listing of the various data required for the various kinds of embeds follows.

### Plain embeds

1. `**MSME_URL**` → there are two instances of `**MSME_URL**`, one to make the entire MSME in rendered posts clickable and the other to add a link to the date displayed at the end of embeds in emails. Paste the link of the embed into both of these fields.
2. `**AVATAR_URL**` → to keep everything local, save the user's avatar from the social media platform to your computer, upload via an image card to a post as you normally would, then either copy the image's URL directly from its display in the editor with your browser's developer tools, or save and then preview the post in order to be able to copy the image's URL that way. With the URL copied, insert the link here.
3. `**USERNAME**`/`**USERNAME FOR EMAILS**` → Due to the layout of embeds in posts vs emails, the user's name must be inserted twice.
4. `**HANDLE**`/`**HANDLE FOR EMAILS**` → same as above.
5. `**TEXT**` → if there's more than one paragraph copy the `<p>**TEXT**</p>` line for as many paragraphs as there are, or alternatively insert a `<br>` if the embed calls for a line-break
   - **NOTE:** if the MSME includes links, hashtags, or @s, surround those portions of text with `<span class="twitter-brand-colour">` and `</span>` to apply Twitter's blue colour to them, or alternatively use `<span class="x-brand-colour">`, `<span class="mastodoon-brand-colour">`, `<span class="threads-brand-colour">`, or `<span class="reddit-brand-colour">`.
6. `datetime="20YY-MM-DD HH:MM"` → the `<time>` attribute uses UTC time, so you'll have to insert the date and time depending on how far ahead or behind of that you are. `HH` has to be inputted in 24-hour format (inclusive of the 0 if the hour is between 00 and 09) but appears in rendered posts as 12-hour format proceeded with AM or PM. You can manually calculate the correct time for insertion, or using your browser's developer tools you can select the time displayed in the social media post, then copy the `datetime` string (which will be in UTC). It'll look something like this: `2023-08-14T11:04:14.000Z`. Copy over only the `2023-08-14T11:04` portion, as in my experience the remaining `:14.000Z` portion threw things off by an hour (possibly due to daylight savings or something).
7. `DD MMM 20YY<!--HARD-CODED FOR EMAILS-->` → the `datetime` JS doesn't work for emails, so if wanted one can either hardcode in a date or delete the default data entirely and leave the field blank.
8. Captions → captions, utilizing HTML, can be inserted between `<figcaption>` and `</figcaption>`.

### Quote posts

Most of the instructions above are equally applicable here, although a few differences should be noted.

1. Contrary to `**USERNAME**` and `**HANDLE**`, the instances of `**QUOTE POST USERNAME**` and `**QUOTE POST HANDLE**` are for the user being quote posted.
2. The `datetime` field under the `msme-email-username-and-handle` class is for the parent post, while the `datetime` field under the `quote-post`/`quote-post-avatar-username-handle-datetime` classes are for applying the date to the quote post (the time does not appear in the rendered post, as occurs in official quote posts on Twitter/X, but the entirety of the data is entered in order to correctly display the date across the international date line).
3. There are two instances of `DD MMM 20YY<!--HARD-CODED FOR EMAILS-->`, the first stating that it's for the `PARENT POST` while the second is for the `QUOTE POST`.

### Readers added context embeds

As the readers added context SVG is included in the embed, the only thing different between this and a plain MSME is the second set of `**TEXT**` to be inserted.

### Link embeds

1. `**LINK_EMBED_URL**` → `pointer-events` have been sent to `none` around the the link card, so applying a URL to the link card results in a click anywhere on the link card sending one to the link's URL instead of the MSME's URL.
2. `**LINK_EMBED_IMAGE_URL**` and `**ALT**` → same process as for uploading and applying the `**AVATAR_URL**`, although in this case `**ALT**` can be set.
3. `**LINK_EMBED_TITLE**`, `**LINK_EMBED_EXCERPT**` and `**LINK_EMBED_WEBSITE_NAME**` → self-explanatory.

### Embeds with an image

1. `**IMAGE_URL**` → same process as for uploading and applying the `**AVATAR_URL**`, although in this case `**ALT**` can be set.

### Quote posts with an image

Same process as for a regular quote post, except in this case you have to add in the data for the quote post's `**IMAGE_URL**` and if desired for the `**ALT**` (as done in embeds with an image).

### Embeds with a video

In order to maintain usage of Ghost's native video functionality this embed requires uploading a video as normally done via a video card (after having downloaded the video from the social media platform with an online video saving service), then placing one HTML card / snippet above the video and another HTML card / snippet below. Utilizing a video via a video card (instead of copying in its URL as done with images) maintains usage of the video card's functionality available via the editor while simultaneously maintaining all video controls on the front end, and also results in the video appearing in emails as they normally do. There's nothing different from a plain embed that needs to be inserted into these two HTML cards / snippets.

### Quote posts with a video

This embed is no different than a quote post with an image, except that like embeds with a video this embed setup requires placing one HTML card / snippet above the video and another HTML card / snippet below.

### Signifying a repost

Any of the above embeds can be signified as having been reposted by a secondary account, although as one can't link to an account's repost of a post there is no extra link to be inserted here. Begin by copying the HTML from the `msme (repost block).html` file and paste it into any embed between the end of the social media logo `<svg>` and the beginning of the `<header>`. Next, you'll see that you can insert the username into three different spots:

```
<span class="retweet-username">**RETWEET USERNAME**</span>
<span class="repost-username">**REPOST USERNAME**</span>
<span class="repost-username-non-X-Twitter">**REPOST USERNAME**</span>
```

If your embed is for any platform other that Twitter/X, then delete the first two lines and fill in the data for the third. Similarly, if your embed will be utilising the Twitter icon then fill in the field in the first line and delete the following two lines, or if your embed will be utilising the X icon then fill in the field in the second line and delete the other two lines. However, if you think you may switch between the Twitter and X icons at some future date, then fill in the fields in the first two lines and delete the third line, then utilise the CSS explained below in the "Inserting SVG icon(s)" section to hide one or the other.

Otherwise, the word "retweeted" automatically appears after the username in the first case, while the word "reposted" automatically appears after the username in the other two cases.

## Extra functionality

### Inserting SVG icon(s)

All HTML cards / snippets (except for those that appear below video embeds) contain a line with `**MSME_ICON(S)**`, which is to be replaced with the SVG you'd like to use for the particular embed. That being so, while the Twitter and Reddit SVGs are straight forward enough to use, and the X, Threads, and (regular) Mastodon SVGs switch between light and dark modes, one can also choose to use the purple Mastodon SVG instead of the monochrome version used for light/dark mode usage. Furthermore, if you're not sure whether you'd like to use the Twitter logo or the X logo, or think you might end up switching between them at some point in the future, you can cater for this with some CSS.

To enable the latter option, instead of inserting either the Twitter SVG or the X SVG, add them both in simultaneously (which can be copied at once from the Twitter-and-X-msme-icons.svg file). You'll then have to set one of them to `display: none`, accomplished by inserting one of the two sets of CSS below into your site's code injection or into its theme.

```
.x-msme-icon,
.repost-username {
    display: none !important;
}
```

Or:

```
.twitter-msme-icon,
.retweet-username {
    display: none !important;
}
```

### Activating the datetime attribute

In order to make the `datetime` functionality work one must utilize the `social-media-embed-datetime.js` script in one way or another: via code injection, via one's theme, or via one's theme while utilizing an internal tag.

### Connecting MSME threads and MSMEs with replies

Similar to MSME threads, there are situations where one might want to combine an MSME along with a reply to that MSME within one "MSME block". To do so, first create the two (or more) MSMEs as explained via the various methods above. Second, in the HTML card for the reply MSME cut out all data from the beginning of (and inclusive of) the `<blockquote>` to the end of the `</blockquote>`. Open up the HTML card for the parent MSME, and then in the line directly after the `</blockquote>` paste in what you'd just cut so that one `</blockquote>` is proceeded by the other. Viewing a preview of this combined "MSME block" will reveal the two MSMEs butted up against one another. To seperate them, and add a connecting line between then, activate the `msme-connection-line.js` script in a similar manner to how you activated the `social-media-embed-datetime.js` script.

## Customising the CSS

1. One thing you might want to customise is the colour of the background surrounding the embed. It's currently set to two of the colours found in a version of Ghost's orb logo, and which can be changed via the two HEX values found in the following CSS:

```
.msme-block {
    width: 100%;
    padding: 30px 30px;
    background-image: linear-gradient(135deg, #F93FD7, #5344FA);
}
```

Likewise, if you customize the above you might also want to change the `#282828` value in the following CSS to a matching dark colour in order to blend the background of the MSME content to the background of the surrounding block in dark mode.

```
:root.dark .msme-content {
    background-image: linear-gradient(135deg, #282828, #020A0A);
}
```

2. Widths and `@media` break points have been customised for my site, so you'll probably want to customise them for yours. If your content area is rather narrow, you may even want to remove the coloured background surrounding MSMEs altogether.
3. Official social media embeds utilise the `<blockquote>` tag, possibly so that the stripped down embeds appear as blockquotes in emails. Regardless of the reason, these MSMEs have also been set up as blockquotes, which creates the issue of your theme's styling for blockquotes rubbing off into these MSMES. To rectify this you might want to "cancel out" your theme's blockquote styling via filling in the empty `blockquote.msme-blockquote` portion in the CSS file.
4. Just as the `pointer-events` have been sent to `none` for videos and link cards so that the video controls can be utilised and so that the links can be clicked, `pointer-events` have also been sent to `none` for images so that clicking on images will work with my theme's lightbox functionality. The class `msme-avatar` has been added to all avatar `<img>` tags so that the lightbox can be deactivated for these images in your theme. This also means that if your theme doesn't utilize a lightbox that clicking on embed images won't redirect the user to the original social media post (as clicking almost anywhere else on the MSME will do), which can be disabled by removing the `<a class="remove-msme-link">` and `</a>` lines that surround the `<img>` tag (found in the Embeds with an image and Quote posts with an image HTML files).
5. The MSMEs work with both light mode and dark mode, the default CSS for dark mode functionality having been included at the bottom of the CSS file. My selector for designating darkmode CSS is `:root.dark` and probably differs from yours, so you'll have to change those if darkmode functionality is desired.

## Customising images and videos of individual embeds

In situations where the image or video included in an embed is portrait-oriented you might not want to display the image or video at their full size. To address this, add a class unique to the MSME (as you may want to do this more than once in a post, and at different sizes) to the MSME's `<blockquote>` tag. In the post's code injection then reference that tag followed up by `.msme-image`, `.msme-link-embed` or `.kg-video-container`, along with the `max-width` desired.

```
.summer-at-the-beach .msme-image {
    max-width: 500px;
}
```

```
.winter-with-frostbite .kg-video-container {
    max-width: 500px;
}
```

## Adjust the look of MSMEs in the editor with uBlock Origin

The fact of the matter is that the HTML cards of these MSMEs look horrible in Ghost's editor. This can however be rectified, one way being through usage of [uBlock Origin](https://ublockorigin.com/). If you use uBlock Origin, proceed to the My Filters tab and paste in the lines found in the `uBlock-Origin-My-Filters.css` file, replacing `yoursite.ghost.io` with the top-level-domain that the editor of your Ghost instance uses. The customisations are designed to work with both light and dark modes.

## Tips

### Setting and changing a single user's avatar across all posts

Although the avatars for a particular user's MSMEs of course don't change when they change on the particular social media site they came from, there is a manual workaround for changing all of a user's avatars across all posts at once. To do so, start off by naming the avatar file in question (say, `Ghost-light-purple-dark-purple-orb.png`) then adding it to a directory in the folder `images/miscellaneous/avatars` (or whatever you'd prefer). Compress that directory, then upload the zip file via Ghost's importer. Next, in your `redirects.yaml` file create a 302 for the image, inclusive of the file you just uploaded as well as of the default location that you'll use for every usage of that MSME avatar.

```
302:
  /content/images/miscellaneous/avatars/Ghost.png: /content/images/miscellaneous/avatars/Ghost-light-purple-dark-purple-orb.png

```

Upload the file.

Then, whenever you create an MSME for that user, use `https://yoursite.com/content/images/miscellaneous/avatars/Ghost.png` for the location of the avatar's file, and if you ever want to use a different avatar for that account then redo the process for uploading a new file via Ghost's importer and then change the 302 to reflect the new image you'd like to use.

## Limitations

There are occasions where embeds include up to four images (and even four videos, but we won't even acknowledge the latter here). Theoretically four images could be inserted into a gallery card and then HTML cards / snippets placed above and below the card as done with Embeds with videos. The way that galleries display isn't conducive to these MSMEs though, so although it'd theoretically be possible to override how images get displayed in a gallery in order to accomodate them to an MSME with multiple images, I haven't – and won't – be attempting to figure out how to do that (supposing it's even possible). For embeds with more than one image I simply take a screenshot of the two or more images on the social media site and then utilise them all as a single image in the embed.

## Issues

There are a few [issues](https://github.com/stromfeldt/Manual-social-media-embeds-for-Ghost/issues), for which PRs would be more than welcome (supposing they're even fixable).
