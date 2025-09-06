---
title: 'Python Notebooks with uv and Neovim'
description: "Still not perfect, but it's getting better."
author: 'Xavier Chanthavong'
date: '2025-08-31'
published: true
---

> Apologies for the lack of syntax highlighting.  
> I hope to add that in an update when I find some spare time.

Ever since switching to neovim, I've had a sore spot when it comes to using
Python notebooks. For reference, my background is in Data Science, and
while my day job doesn't really involve much of the work, I really enjoy
jumping in a python notebook from time to time to do some analysis work. Every
so often, I hear somebody mention something which sparks the thought "that
would be quite easy to spike in a python notebook".

Though, the problem that I face is that I'm actually quite helpless outside of
the terminal. Not having a good setup for working with notebooks would make
that spike take far longer than it should. Even with vim keybinds enabled in
a vscode derivative, the experience is not the same. The only GUI editor that I
may consider using in the future is Zed, but the control that I get with tmux
and Neovim has kept me where I am.

## Quarto Based Setup

When I first moved over to Neovim I started with LazyVim, and I eventually, over
several weekends migrated myself to a standalone configuration. At one point I
had a python notebook setup which I cobbled together using a combination of
quarto, magma.nvim, some markdown plugins, and some lua scripts to glue
everything together the way I wanted it.

For those that aren't familiar with Quarto, Quarto basically converts the
notebook into a markup file (I chose markdown), and let's you edit that file.
On save, it converts the notebook back to a notebook file.

Here are some of the problems that I had with that approach:
- Too many dependencies required for a good experience
  - Neovim plugins:
    - venv-selector (for activating/switching your venv from within neovim)
    - magma.nvim (for using ipython kernels in markdown filesk)
    - otter.nvim (so neovim lsp client handles markdown code blocks properly)
    - my own handrolled lua (for making everything work nicely together)
  - Externally:
    - quarto
- Not used enough considering the maintenance weight
- Easily the flakiest part of my dotfiles.
- Quarto isn't available in all of the package managers that my dotfiles are
  designed to automatically install with.

This setup can be roughly found in my dotfiles at
[4dd24c4](https://github.com/XavierChanth/dotfiles/commit/3dd24c455a19153f9e99a2f1f2c9278ec176b7a9)
. Though, there probably have been changes since, that commit.

## A Different Approach

I eventually deleted that bit of quarto configuration, and since, I've started
periodically removing plugins and refining my setup. Nowadays there is a much
smaller core of plugins that I use, and every single plugin only loads exactly
when I need it. Outside of this core, I use quite a bit of language specific
plugins each of these also only loads when I work in that specific language.

During my exploration of quarto + magma, I did look at other options, at the
time I gave them a brief attempt. Since then, something in the python space has
changed which opens the door to better experiences in those avenues.

That change is the growth in uv. I've been keeping an eye on uv, and have found
it to be by far one of the best (if not the best) developer experiences across
any language. Thus, it was time to revisit the idea of a Neovim based python
notebook experience using uv.

## Jupytext

One of the most popular ways for using jupyter notebooks with neovim has been
jupytext. So I started by revisiting jupytext, I ended up with a decent setup
in jupytext that can be installed with just a few scripts.

Both jupyter and jupytext are supported by uv, the only problem that I have
with this setup is that jupyter doesn't support watching the filesystem. I have
searched around for ways to do this online, but didn't see any elegant solutions
worth trying. If you don't mind manually refreshing the browser, then jupyter
will pickup your changes, but I have a feeling that the back and forth could be
extremely annoying if you're trying to tweak something.

Update(2025-09-05): jupyter does support auto reloading the notebook through
it's collaboration mode. Scripts have been updated to reflect that.

### Setup Script

This script sets up a new uv project and installs an ipython kernel to the venv.
It then adds the necessary configuration for jupytext to automatically pair a
python file with every notebook. There are various formats, but the percent
format is most popular. This format allows you to separate your code blocks with
a single comment: `# %%`. You can also write your markdown blocks in pure
comments.

In practice, this means you can edit and version your python files, letting
jupytext handle the translation for you.

```sh
#!/usr/bin/env bash

uv init .
uv add --dev ipykernel
script_dir="$(dirname -- "$(readlink -f -- "$0")")"
echo 'formats = "ipynb,py:percent"' >"$script_dir/jupytext.toml"
```

### Run Script

```sh
#!/usr/bin/env bash

uv run --with jupyter --with jupytext --with jupyter_collaboration \
  jupyter lab --collaborative
```

## Marimo

One evening earlier this week, I was doing some more browsing for a way of
reloading jupytext automatically. That's when I stumbled across two tools:
marimo and europie. Europie seems interesting, it is a tui based tool. Even
though it seems use vim-like controls, I'm not interested in learning another
tool, given how often I will be using.

This leaves me with Marimo, an alternative notebook server which supports
use of editing in an external tool. I do have a few problems with this tool,
but they are relatively easy to avoid.

### Problems with Marimo

#### Cell Syntax

The syntax for a cell is far more verbose than using percent pairing in
jupytext. The solution here is to simply use a snippet. Note that I'm using a
plugin in neovim that allows me to use vsc\*de style snippets:

```json
{
  "Marimo cell": {
    "prefix": "mcell",
    "body": [
      "@app.cell",
      "def _():",
      "\t$0",
      "\treturn"
    ],
    "description": "Create a cell in Marimo"
  }
}
```

#### Marimo's Standards

The industry tends to use jupyter, so it may be difficult to get by-in since
Marimo files are distinctly Marimo.

e.g.
```python
import marimo

__generated_with = "0.15.2"
app = marimo.App(width="medium")


@app.cell
def _():
    import marimo as mo
    return


@app.cell
def hello():
    return "world"


if __name__ == "__main__":
    app.run()
```

I've added populated a few cells to the default template, you'll notice that
the hello function can be imported in a another file the way that this is
designed. Though, this lacks the ability to specificy multiple functions in a
single cell (if there's a way, I'm not sure what it is yet). It is arguable
whether you'd even want to specify more than one function in a cell. I could
see it being useful in scenarios where you've refined a set of bespoke utility
functions that you want to paste in the header of every notebook for
portability.

#### AI

I don't want AI in my tools by default, let me add it in my own way. These AI
tools that try to be helpful tend to be annoying popups that do things other
than what I intend to, they annoy me in the same way an advertisement would.

At the very least, it seems that using marimo for only displaying a notebook
is not that bad. It has live reloading, so I'm fine enough with it as long as I
edit from an external editor.

Though, the fact still stands that Marimo shows me this:

![Marimo AI tab shows that it is disabled](/assets/posts/marimo-ai-disabled.png)

Meanwhile, when I run this:

```sh
uv run marimo new "write a fibonacci visual"
```

I get a notebook that looks like this:

```sh
# /// script
# [tool.marimo.runtime]
# auto_instantiate = false
# ///

import marimo
 
__generated_with = "ai"
app = marimo.App(width="medium")
 
@app.cell
def _():
    import marimo as mo
    import matplotlib.pyplot as plt
    import numpy as np
    return

@app.cell
def _():
    # Create a slider to select the number of Fibonacci numbers to display
    fib_count_slider = mo.ui.slider(5, 30, value=10, label="Number of Fibonacci numbers")
    fib_count_slider
    return

@app.cell
def _():
    # Generate the Fibonacci sequence up to the selected count
    def fibonacci_sequence(n):
        seq = [0, 1]
        for _ in range(2, n):
            seq.append(seq[-1] + seq[-2])
        return seq[:n]
 
    fib_numbers = fibonacci_sequence(fib_count_slider.value)
 
    # Plot the Fibonacci sequence
    plt.figure(figsize=(8, 5))
    plt.plot(range(1, len(fib_numbers) + 1), fib_numbers, marker='o',
        linestyle='-', color='teal')
    plt.title(f"First {fib_count_slider.value} Fibonacci Numbers")
    plt.xlabel("Index (n)")
    plt.ylabel("Fibonacci Number")
    plt.grid(True)
    plt.gca()
    return

if __name__ == "__main__":
    app.run()
```

That doesn't look very disabled to me, now does it?

## What I Like About Marimo

Marimo supports file watching with the `--watch` flag, and it will make use of
watchdog if you have it installed. It also supports an `app view` which provides
a nice user-interface. Thus, I will consider it for some projects, especially
ones where I want to spike something quickly and I want it to be interactive.

I see this fitting in as sort of a blend between d3 and jupyter. You can provide
a d3-like experience for the consumer of your notebook without having to write
any javascript.

### Marimo Scripts

#### Setup a project

```sh
#!/usr/bin/env bash

uv init .
uv add --dev ipykernel marimo watchdog
script_dir="$(dirname -- "$(readlink -f -- "$0")")"

marimo_config=$(
cat <<EOF
[tool.marimo.save]
format_on_save=true

[tool.marimo.package_management]
manager = "uv"

[tool.marimo.runtime]
pythonpath = ["./notebooks"]
EOF
)

echo "$marimo_config" >>"$script_dir/pyproject.toml"
```

\*Script not tested, but it *should* work as is. It's a recreation of the steps I
took to create my setup.

#### Run Server

```sh
#!/usr/bin/env bash
uv run marimo edit notebooks --watch
```

## Conclusions

I think I'll jump between Jupytext and Marimo based on what I'm trying to do,
both are decent candidates for a good setup. I still have some research to do
in order to refine the setups for each.

I really would like to love Marimo, but the AI thing does bother me.
I only discovered the fact that the first positional argument of the new command
is an ai prompt when I tried to run `uv run marimo new test-notebook.py` and the
notebook it created was still at a temporary path, and prepopulated with random
AI slop.

Because of this fact, my primary goal going forward will be to find a reasonable
way to reload jupyter on file save. I will consider Marimo for the data
visualization dashboard use-case though.

Update(2025-09-05): I have found a way to reload with Jupyter. It will be my
preferred option unless I really need something out of Marimo.
