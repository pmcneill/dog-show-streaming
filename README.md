# How to Livestream a Dog Show

## The Goal

This is a document about how to recreate the livestream for the 2024 American Whippet Club national specialty, parts of which can be seen at TODO: X and TODO: Y. I'll talk about hardware and software used, how it's all configured an connected, reporting the progress of the show, and anything else that comes to mind.

## Hardware

### Main Camera

The non-negotiable essential to reproducing the livestream is a good PTZ camera -- pan, tilt, and zoom. For the 2024 AWC, I used a [PTZOptics 30x](https://www.lensrentals.com/rent/ptzoptics-30x-ndi-live-streaming-broadcast-camera), but there are other options. Look for one that supports NDI video, allowing for streaming over an ethernet network. If it supports PoE -- power over ethernet -- that's even better, since you need only a single cable to hook it up. Lastly, make sure it can be controlled remotely and has at least a few "presets" (more on these later).

### Computer

Probably any modern computer will work fine here, but it's something worth testing in advance. I rented a 13" Macbook Pro M2 from LensRentals for the AWC streams and it worked perfectly despite being minimally-specced.

### Secondary Camera(s)

If you're on a budget, stick a phone on a tripod. If you can splurge, get an extra PTZ camera (or two!). Something as a secondary camera is essential, though, because the main camera *will* get blocked, repeatedly. If you do use a PTZ camera for the secondary, it becomes much more useful, such as when the judge lines everyone up with their backs to the primary camera.

In my case, using a Mac and having an iPhone, I was able to use "Continuity Camera" to grab the video and audio from my phone wirelessly. I signed into iCloud on the Mac, then could add my phone as if it were any other webcam. I'm sure there're apps to do something similar as well, but the built-in option was definitely straightforward.  Do check that the connection is correctly re-established each time you use your phone for something else -- I generally had to select a different camera view, then go back to the phone view to get everything to sync back up.

If you're using PTZ cameras here, and especially if they're not from the same manufacturer, spend some time up front to figure out how to manually dial in the white balance. My iPhone and the PTZ camera came up with wildly different settings on auto.

### Microphone

My original intent was to use a shotgun-style microphone with the PTZ camera's audio input, but it never worked for me. It's almost certainly user error, perhaps a configuration setting I missed, but if this is the direction you intend to go, leave yourself some tinkering time.

For the livestreams where I did have audio, I used my iPhone like I described in the "secondary camera" section above.  It shows up on a Mac as an audio source, as well as a camera, so it's largely just a matter of changing the selected microphone in the system settings.  It did end up automatically muting at times at the system level, but unmuting from the "system preferences" area worked fine.

In a hypothetical future iteration, my plan is to rent a wireless microphone package. If the ring judge is amenable, I'd give them a lavalier microphone and use them as the primary audio source. Otherwise, I'd stick the transmitter somewhere it won't be likely to pick up audio from ringside, perhaps around the ramp area.

### Networking

Don't trust the ballroom wireless network for transmitting the raw video, especially if you have multiple cameras running. Wired networking will make things _much_ more reliable. Get a switch with enough ports to connect each of the cameras and the computer. If you have PoE cameras, make sure the switch supports that, and pay attention to the ratings -- PoE, PoE+, and PoE++ all define different power levels available. If the camera requires PoE+, you need PoE+ or PoE++. Switches also might have different power levels at different ports, so pay attention to _how many_ PoE+(+) ports you'll have, if you're using multiple cameras.

For cabling, look for CAT6 cables with 23AWG wiring, [such as these](https://www.amazon.com/dp/B09WTMNVNX). At 150 feet, I'm able to wire a camera up to at least three of the show ring corners, depending on where I'm set up, so that distance seemed like it offered good flexibility.

### Tripods

You'll need a tripod for each camera, of course. PTZ cameras should be level to the ground, so you can get away without having a ball head or some other tilting mechanism. If you tilt the PTZ camera itself, eg to get a better close-in shot below the camera, you'll end up skewing all the panning movements in a really awkward way. The tripod doesn't need to be tall -- the camera should be just above the top of the ring fencing. Sturdiness is essential, though, to reduce the chance the camera gets moved and preset PTZ locations are thrown off. Use sandbags (or a bag of tool batteries...) hanging from the center pole of the tripod to weigh it down some more.

If you're planning to use a phone instead of a PTZ camera, you'll need a repositionable head and a phone mount for the tripod. It's safe to go cheap here since phones don't weigh much compared to a typical tripod load.

### Batteries

Power outlets will be limited away from the walls of a ballroom, so expect that at least some gear will be battery-powered. At a minimum, that's probably the microphone and/or phone-serving-as-camera. Plan on a USB battery bank for each one, as well as the associated cabling. In my case, we have Dewalt fans for our dogs and plenty of batteries, so I used one of those to keep my phone powered with a USB adapter, and the extra batteries as tripod weighting.

### Consumables

Get at least 100 feet of 2 inch gaff tape. Between the main show, the obedience ring, and the top 20, I used about 120 feet of tape. It's most important to fully tape down where people will walk over it, eg in front of doors or across walkways. The technique I found worked best was to put a 5-6 inch piece of tape across the cable to hold it in place, then I could run a longer length along the wire to secure it over a run of floor. The tape's also handy to secure wires to a tripod, for example -- just remember to leave a bit of slack at each end in case someone trips.

I'd suggest bringing RJ45 crimpers and CAT6 connectors. While not essential, they let me be a little more flexible with the wiring. When I only needed ~50 feet from switch to camera in one room, I was able to reduce the length dramatically and avoid having a giant coil on the floor. I also was able to cut off about 20' to let me sit farther from the switch -- I'd only brought 6' cables from home.

## Software

### Basic OBS

Install [OBS](https://obsproject.com/download) and set it up to stream to whichever service you want. Expect ballroom internet connections to be poor, so try out some settings and see what looks best. I ultimately settled on 3500kbps for the video encoding at 1080p and 60 frames per second. I did have occasional frame loss, but if it spiked past 1%, I'd generally cut stream and reduce the settings in some way.

### OBS Plugins, NDI Support

You may need a plugin and/or extra software to bring the PTZ video into OBS. The PTZOptics camera I used needed a generic NDI component, then had a manufacturer-specific plugin to add controls to OBS. Poke around with Google and see what you find.

### OBS Scenes

If you're unfamiliar with OBS, the short-short version is that it lets you compose what you want the output stream to look like by adding components to the screen. One particular mix of components make up a "scene". Start by creating a scene for your primary camera, adding it as a video source and making it use the bulk (or all) of the stream real estate. I also added two text areas: one for the name of the current class, and one for catalog information.  I added a small logo image in the corner. Finally, I added a black background image behind each of the text and logo, then added a filter to reduce the background image opacity to ~70%.

For the title and name text boxes, I started by directly typing into them, but ultimately ended up having each read data from files on disk, "title.txt" and "catalog.txt" in my user home directory. OBS automatically monitors those files for changes and reloads them.

The catalog text box was a bit tricky to set up because I wanted it to scroll. I ended up with a combination of settings that worked but proved very fragile, so I'm not going to record the specific ones here. The general approach though is to add a scrolling filter to the text box, then use the "edit transform" context menu command to fix its dimensions and limit how much it will show vertically. There's also a file size limit, about 1.5KB it seems. When the catalog.txt file is too big, it just blanks out the text area entirely. My suggestion here would be to look for a plugin that'll do this better.

Once you have the primary camera scene set up, duplicate it once for each of the secondary cameras. Change the video source in each to the other cameras, leaving everything else the same. Change scenes just by clicking on the name of a different scene, then you should see a fade transition. It's possible to make this work with a single scene and hiding/showing different video sources, but having multiple scenes makes cutting away from a butt shot much quicker and easier.

If you're covering non-show events, such as obedience, set up further scenes to customize the look. For instance, maybe have an option for a single dog name instead of a scrolling catalog.

### Catalog Data

Get an electronic copy of the catalog and cut it down to a limited amount of data -- armband number, registered name, and perhaps registration number. Create a separate text file for each class that'll be streamed. When it's time to change to a new class, edit the title.txt file and copy the relevant class list over catalog.txt, which should then automatically update in the stream. There are a lot of ways to create the class list data, and the method will depend a lot on the kind of input you can get.

For the AWC, I started with a Word document version of the show catalog, copied it into a text file, then used a small Javascript program to break it out into classes and pick out the data I wanted. If I found that a class was too big for the catalog scroll, I'd start by removing registration numbers, then if still too big, I would split the class file into pieces. Splitting the file to match the judge's splits is tricky, since it's done live. I generally guessed at the splits, adding a few extra dogs to the beginning and end of each chunk, trying to ensure all the dogs in the ring would be in the list.

Tracking cuts is another matter entirely. If the class list already fits in the catalog display, I left it alone. For large groups, especially with the specials entry, I tracked the armband numbers as best I could and verified with the steward at breaks. When it was time for a cut group to return to the ring, I used a script to pull the catalog data by armband number into a cut file.

## Setup

Here's a diagram of the AWC national show ring, with the main judge's gaiting pattern shown by the green arrows:

<img src="assets/Ring Layout.svg" width="90%" style="background-color: white;"/>

With whippets, people want to see the way the dog moves and holds itself directly from the front, rear, and side, as much as possible. Since the gaiting pattern was across a diagonal, I set my main camera up at one of the corners, letting me reliably catch the front and rear views. Exhibitors would often cut the corners, rounding out the go-around, so I was also able to catch a quick side shot as they passed in front of the camera, assuming it was pointing in the right place.

After gaiting, getting a good view of the ramp or table is the next consideration. Ideally, the camera's view would be straight at the dog's side, but an angled shot is better than nothing. With the gaiting pattern, I ended up with a rear 3/4 shot of the dog. I would have preferred the dog's front half to be the focus, but with one primary camera, the gaiting won out.

The last consideration is visibility for everything else -- when the judge is making cuts, where the exhibitors line up, and so forth. If you have a PTZ camera as a secondary view, you might prioritize some of these for that camera, leaving the gaiting to the primary.

### Presets

The biggest trick I found with PTZ cameras is to make use of the presets. The PTZOptics camera let me specify 9 positions, combinations of pan, tilt, and zoom, that the camera could move to from a single button push. Finding good preset locations makes the livestream _much_ simpler to run and more consistent. I've marked the places I generally assigned the presets to in the diagram, with the color indicating how far the camera is zoomed in.

The bulk of the presets are for the gaiting, giving you a sequence to follow the dog around the ring. My initial preset was at the far corner from the camera, the next zoomed out to a wide shot on the same pan/tilt angle, then I re-used the far corner preset, all to follow the dog along the diagonal. There was a series of three "movement" presets after to folow the dog on the go-around. Create the presets so there's a bit of overlap, then pay attention to where the dog is in the frame to decide when to move to the next one.

The other presets were for static shots -- stuff like point at the ramp, point at the place where the judge has their cuts, and so forth. With only nine presets, though, it was important not to think about presets in only one context, but rather as a general "look at this place with this field of view".

If it's at all possible, talk to the judge in advance and find out about their heeling pattern (if rally/obedience, watch the runthroughs closely). Even better would be to have a dog and handler go through the pattern, letting you set up the camera in advance.