import{a,f as n}from"./DT_DtoER.js";import"./B5b9YTcJ.js";import{A as i}from"./-01Tas95.js";const o={title:"Settling into Arch Linux",description:"My history with computers and developer tooling.",author:"Xavier Chanthavong",date:"2025-10-19",published:!0,tags:["arch linux"]},{title:l,description:m,author:p,date:u,published:c,tags:y}=o;var r=n(`<h2>My Early Days</h2> <p>My journey with computers started in an atypical way. As a kid, I was
surrounded by tech due to my dad’s business, where he owned and operated a tech
consulting firm. When I was just 7, I had access to his Ubuntu machine. It was
my first exposure to a desktop computer, running Ubuntu 07.04. Fast forward
a few years, my uncle gave me an old enterprise machine. At 12, I couldn’t
afford Windows, so I installed Ubuntu 12.04 or maybe 11. I wrote papers,
explored free open-source software, used LibreOffice, played Minecraft,
and learned basic GNOME on Linux.</p> <p>Around the age of 14, I had saved enough money to get my first gaming PC with
help from my dad. I opted for Windows as I was playing Windows-only games
with friends. Running them on Linux using Wine and Lutris was tricky. Proton
wasn’t available yet, and troubleshooting game installations was not my
thing. My late-night gaming would sometimes annoy my dad enough that he’d
cut off the internet, leading me to spoof my MAC address to keep playing.</p> <h2>University and Linux</h2> <p>At 18, preparing for university, I picked a first-generation MateBook X Pro.
It allowed dual booting Windows and Linux. I initially started with Windows but
switched to Linux due to my earlier Linux experiences, settling on Manjaro
after considering Arch and Arco Linux. Manjaro offered the stability and
driver support I needed at that time, given my dedicated NVIDIA GPU and the
hassles involved with getting it to function correctly.</p> <p>During university, I discovered a passion for Linux. I worked my entire degree
on it, up until COVID hit. I was on my way home from campus when they announced
that campus was closing. In 2020, as studies moved online, I first met Atsign,
interned with them the following year and part-time contracted with them
after that. Working from home, I relied on my desktop PC due to its power for
programming with Flutter and running Docker containers. It was while working
on an Atsign project that I wrote my first cross-platform, POSIX compliant
script. To this day, I still write most of my scripts to be POSIX compliant,
despite having bash on every single machine I would want to run them on.</p> <h2>Making my Environment Bespoke</h2> <p>In 2022, I picked up the MacBook M1 Pro and delved deeper into tools like
NeoVim, Tmux, and FZF. LazyVim was my initial choice for configuration,
which over the years I’ve replaced and refined, leading to faster startup
times and a more minimal and stable setup. During this time, I also started
using homerow mods, first through QMK (hardware) then kanata (with internal
laptop keyboards). I purchased an ortholinear split keyboard, which was a
pain to learn, but totally worth it long-term. I’m still using QWERTY to
ensure that I can use normal keyboards and my laptop keyboard when necessary.</p> <p>I then got into Aerospace, a window manager for MacOS, with Sketchybar,
an alternative menu bar that I customized. Two great open-source projects,
by maintainers that I admire.  This is when the first wave of bugs started
appearing in MacOS, frequent updates would break the keyboard driver powering
Kanata, thus also affecting my normal home-row key binds for Aerospace.
At some point, I got fed up enough with the OS to leave it behind.</p> <p>In recent years, I’ve transitioned from the M1 MacBook Pro to a Framework
13 laptop, appreciating the fact that it’s lighter, especially during
travel. The Framework’s longevity through potential hardware upgrades
appealed to me. While the first purchase of this machine is more expensive,
I suspect that by the time it becomes the Ship of Theseus, I will have saved
some money compared to buying several laptops worth of upgrades. To make sure
I still have access to a mac when I need it for testing and development I’ve
thrown a base model M4 mini into my homelab.</p> <h2>So, what am I running on the framework?</h2> <p>I chose Arch Linux. Not for the hype reasons that the community has. I’m not
running a riced out Hyprland setup. I running a simple, minimal Sway setup on
Wayland. I found a minimal black and white Waybar configuration and made it
my own. I primarily use only two GUI applications - my terminal and browser,
with a handful of supplementary ones:</p> <ul><li>Terminal Emulator: Ghostty</li> <li>Browser: Zen (tried a ton, this is the one I’m happiest wiht for now)</li> <li>Notes: Obsidian</li> <li>Screen Capture: Obs</li> <li>RDP/VNC Client: Remmina</li> <li>And some basic office and media applications that you’d expect on most systems</li></ul> <p>I chose Arch because it allows me to install exactly what I want on my system.
I get to make the choices, I get the features and tools I want, not some
random crap that poses a risk of breaking my system. Because of this,
I can install my entire Arch setup by configuring my hardware, setting up
secure boot, creating a user, then running a single script.</p>`,1);function g(e){var t=r();i(26),a(e,t)}export{g as default,o as metadata};
