# Technical Challenge Epilogue: Improving quality of the codebase

1. Fixing the redirect error:

There is an error in the code base regarding the types of URLS that are shortened. If we try to shorten the url "https://github.com/Code-4-Community/everything", then we find that the shortened url works just fine. However, if we try to shorten "github.com/Code-4-Community/everything" (no https), then the redirect does not redirect to the website despite the fact that we still entered a valid url. We notice that this occurs when we shorten any url without the "https" or "http". URLs that do not contain http or https such as google.com are still valid URLs, so we still want to resolve this issue.

When trying to debug this issue, we'll notice that when attempting to visit the shortened url, the final url will be "http://localhost:3333/s/{our original url}", which lets us discover the root of the issue: the res.redirect() method assumes that if the inputed url does not start with http or https, then it is a relative url and attaches it to the end of the current url. Thus, we can fix this issue by checking if our original url contains https or http. If it does contain either one, them we can just do redirect normally. If it doesn't, then we should append https:// to the front of the original url before redirecting to it. With our fix, the url shortner now works for both "https://google.com" and "google.com".

2. Input Filtering

To make our code better, we can add some basic input filtering. Firstly, we don't want to generate shortened URLs for empty strings, so we can check for that in the onsubmit method. Additionally, we can try making a URL object with the url string to see if it is valid. This will prevent the user from entering strings like "[]".

3. Generating QR codes.
   We can further improve our codebase by adding the capability to generate a qr code that links to the inputed URL. The qr code is generated using a QR code library and displayed in the center of the screen that updates to reflect the newest shortened link.

![alt text](example.png 'Title')
