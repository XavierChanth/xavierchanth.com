import"./DsnmJJEf.js";import"./Cs0UCCHV.js";import{a6 as q,h as v,a as w,P as M,a7 as N,k as _,W as A,Y as S,$,Z as E,G as I,s as F,F as O,L as m,Q as C,a8 as t,a9 as R,R as P,aa as o,ab as p,S as D}from"./MK_1jcyn.js";function i(g,h,l=!1,c=!1,d=!1){var u=g,e="";q(()=>{var r=M;if(e===(e=h()??"")){v&&w();return}if(r.nodes_start!==null&&(N(r.nodes_start,r.nodes_end),r.nodes_start=r.nodes_end=null),e!==""){if(v){_.data;for(var a=w(),k=a;a!==null&&(a.nodeType!==A||a.data!=="");)k=a,a=S(a);if(a===null)throw $(),E;I(_,k),u=F(a);return}var n=e+"";l?n=`<svg>${n}</svg>`:c&&(n=`<math>${n}</math>`);var s=O(n);if((l||c)&&(s=m(s)),I(m(s),s.lastChild),l||c)for(;m(s);)u.before(m(s));else u.before(s)}})}const Q={title:"Python Notebooks with uv and Neovim",description:"Still not perfect, but it's getting better.",author:"Xavier Chanthavong",date:"2025-08-31",published:!0},{title:L,description:W,author:H,date:J,published:X}=Q;var Y=C(`<blockquote><p>Apologies for the lack of syntax highlighting.<br/> I hope to add that in an update when I find some spare time.</p></blockquote> <p>Ever since switching to neovim, I’ve had a sore spot when it comes to using
Python notebooks. For reference, my background is in Data Science, and
while my day job doesn’t really involve much of the work, I really enjoy
jumping in a python notebook from time to time to do some analysis work. Every
so often, I hear somebody mention something which sparks the thought “that
would be quite easy to spike in a python notebook”.</p> <p>Though, the problem that I face is that I’m actually quite helpless outside of
the terminal. Not having a good setup for working with notebooks would make
that spike take far longer than it should. Even with vim keybinds enabled in
a vscode derivative, the experience is not the same. The only GUI editor that I
may consider using in the future is Zed, but the control that I get with tmux
and Neovim has kept me where I am.</p> <h2>Quarto Based Setup</h2> <p>When I first moved over to Neovim I started with LazyVim, and I eventually, over
several weekends migrated myself to a standalone configuration. At one point I
had a python notebook setup which I cobbled together using a combination of
quarto, magma.nvim, some markdown plugins, and some lua scripts to glue
everything together the way I wanted it.</p> <p>For those that aren’t familiar with Quarto, Quarto basically converts the
notebook into a markup file (I chose markdown), and let’s you edit that file.
On save, it converts the notebook back to a notebook file.</p> <p>Here are some of the problems that I had with that approach:</p> <ul><li>Too many dependencies required for a good experience <ul><li>Neovim plugins: <ul><li>venv-selector (for activating/switching your venv from within neovim)</li> <li>magma.nvim (for using ipython kernels in markdown filesk)</li> <li>otter.nvim (so neovim lsp client handles markdown code blocks properly)</li> <li>my own handrolled lua (for making everything work nicely together)</li></ul></li> <li>Externally: <ul><li>quarto</li></ul></li></ul></li> <li>Not used enough considering the maintenance weight</li> <li>Easily the flakiest part of my dotfiles.</li> <li>Quarto isn’t available in all of the package managers that my dotfiles are
designed to automatically install with.</li></ul> <p>This setup can be roughly found in my dotfiles at <a href="https://github.com/XavierChanth/dotfiles/commit/3dd24c455a19153f9e99a2f1f2c9278ec176b7a9" rel="nofollow">4dd24c4</a> . Though, there probably have been changes since, that commit.</p> <h2>A Different Approach</h2> <p>I eventually deleted that bit of quarto configuration, and since, I’ve started
periodically removing plugins and refining my setup. Nowadays there is a much
smaller core of plugins that I use, and every single plugin only loads exactly
when I need it. Outside of this core, I use quite a bit of language specific
plugins each of these also only loads when I work in that specific language.</p> <p>During my exploration of quarto + magma, I did look at other options, at the
time I gave them a brief attempt. Since then, something in the python space has
changed which opens the door to better experiences in those avenues.</p> <p>That change is the growth in uv. I’ve been keeping an eye on uv, and have found
it to be by far one of the best (if not the best) developer experiences across
any language. Thus, it was time to revisit the idea of a Neovim based python
notebook experience using uv.</p> <h2>Jupytext</h2> <p>One of the most popular ways for using jupyter notebooks with neovim has been
jupytext. So I started by revisiting jupytext, I ended up with a decent setup
in jupytext that can be installed with just a few scripts.</p> <p>Both jupyter and jupytext are supported by uv, the only problem that I have
with this setup is that jupyter doesn’t support watching the filesystem. I have
searched around for ways to do this online, but didn’t see any elegant solutions
worth trying. If you don’t mind manually refreshing the browser, then jupyter
will pickup your changes, but I have a feeling that the back and forth could be
extremely annoying if you’re trying to tweak something.</p> <h3>Setup Script</h3> <p>This script sets up a new uv project and installs an ipython kernel to the venv.
It then adds the necessary configuration for jupytext to automatically pair a
python file with every notebook. There are various formats, but the percent
format is most popular. This format allows you to separate your code blocks with
a single comment: <code># %%</code>. You can also write your markdown blocks in pure
comments.</p> <p>In practice, this means you can edit and version your python files, letting
jupytext handle the translation for you.</p> <pre class="language-sh"><!></pre> <h3>Run Script</h3> <pre class="language-sh"><!></pre> <h2>Marimo</h2> <p>One evening earlier this week, I was doing some more browsing for a way of
reloading jupytext automatically. That’s when I stumbled across two tools:
marimo and europie. Europie seems interesting, it is a tui based tool. Even
though it seems use vim-like controls, I’m not interested in learning another
tool, given how often I will be using.</p> <p>This leaves me with Marimo, an alternative notebook server which supports
use of editing in an external tool. I do have a few problems with this tool,
but they are relatively easy to avoid.</p> <h3>Problems with Marimo</h3> <h4>Cell Syntax</h4> <p>The syntax for a cell is far more verbose than using percent pairing in
jupytext. The solution here is to simply use a snippet. Note that I’m using a
plugin in neovim that allows me to use vsc*de style snippets:</p> <pre class="language-json"><!></pre> <h4>Marimo’s Standards</h4> <p>The industry tends to use jupyter, so it may be difficult to get by-in since
Marimo files are distinctly Marimo.</p> <p>e.g.</p> <pre class="language-python"><!></pre> <p>I’ve added populated a few cells to the default template, you’ll notice that
the hello function can be imported in a another file the way that this is
designed. Though, this lacks the ability to specificy multiple functions in a
single cell (if there’s a way, I’m not sure what it is yet). It is arguable
whether you’d even want to specify more than one function in a cell. I could
see it being useful in scenarios where you’ve refined a set of bespoke utility
functions that you want to paste in the header of every notebook for
portability.</p> <h4>AI</h4> <p>I don’t want AI in my tools by default, let me add it in my own way. These AI
tools that try to be helpful tend to be annoying popups that do things other
than what I intend to, they annoy me in the same way an advertisement would.</p> <p>At the very least, it seems that using marimo for only displaying a notebook
is not that bad. It has live reloading, so I’m fine enough with it as long as I
edit from an external editor.</p> <p>Though, the fact still stands that Marimo shows me this:</p> <p><img src="/assets/posts/marimo-ai-disabled.png" alt="Marimo AI tab shows that it is disabled"/></p> <p>Meanwhile, when I run this:</p> <pre class="language-sh"><!></pre> <p>I get a notebook that looks like this:</p> <pre class="language-sh"><!></pre> <p>That doesn’t look very disabled to me, now does it?</p> <h2>What I Like About Marimo</h2> <p>Marimo supports file watching with the <code>--watch</code> flag, and it will make use of
watchdog if you have it installed. It also supports an <code>app view</code> which provides
a nice user-interface. Thus, I will consider it for some projects, especially
ones where I want to spike something quickly and I want it to be interactive.</p> <p>I see this fitting in as sort of a blend between d3 and jupyter. You can provide
a d3-like experience for the consumer of your notebook without having to write
any javascript.</p> <h3>Marimo Scripts</h3> <h4>Setup a project</h4> <pre class="language-sh"><!></pre> <p>*Script not tested, but it <em>should</em> work as is. It’s a recreation of the steps I
took to create my setup.</p> <h4>Run Server</h4> <pre class="language-sh"><!></pre> <h2>Conclusions</h2> <p>I think I’ll jump between Jupytext and Marimo based on what I’m trying to do,
both are decent candidates for a good setup. I still have some research to do
in order to refine the setups for each.</p> <p>I really would like to love Marimo, but the AI thing does bother me.
I only discovered the fact that the first positional argument of the new command
is an ai prompt when I tried to run <code>uv run marimo new test-notebook.py</code> and the
notebook it created was still at a temporary path, and prepopulated with random
AI slop.</p> <p>Because of this fact, my primary goal going forward will be to find a reasonable
way to reload jupyter on file save. I will consider Marimo for the data
visualization dashboard use-case though.</p>`,1);function Z(g){var h=Y(),l=t(R(h),38),c=o(l);i(c,()=>`<code class="language-sh"><span class="token shebang important">#!/usr/bin/env bash</span>

uv init <span class="token builtin class-name">.</span>
uv <span class="token function">add</span> <span class="token parameter variable">--dev</span> ipykernel
<span class="token assign-left variable">script_dir</span><span class="token operator">=</span><span class="token string">"$(dirname -- "<span class="token variable"><span class="token variable">$(</span>readlink <span class="token parameter variable">-f</span> -- <span class="token string">"<span class="token variable">$0</span>"</span><span class="token variable">)</span></span>"</span><span class="token punctuation">)</span><span class="token string">"
echo 'formats = "</span>ipynb,py:percent<span class="token string">"' >"</span><span class="token variable">$script_dir</span>/jupytext.toml"</code>`),p(l);var d=t(l,4),u=o(d);i(u,()=>`<code class="language-sh"><span class="token shebang important">#!/usr/bin/env bash</span>

uv run <span class="token parameter variable">--with</span> jupyter <span class="token parameter variable">--with</span> jupytext jupyter lab</code>`),p(d);var e=t(d,14),r=o(e);i(r,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"Marimo cell"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"prefix"</span><span class="token operator">:</span> <span class="token string">"mcell"</span><span class="token punctuation">,</span>
    <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"@app.cell"</span><span class="token punctuation">,</span>
      <span class="token string">"def _():"</span><span class="token punctuation">,</span>
      <span class="token string">"&#92;t$0"</span><span class="token punctuation">,</span>
      <span class="token string">"&#92;treturn"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"Create a cell in Marimo"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),p(e);var a=t(e,8),k=o(a);i(k,()=>`<code class="language-python"><span class="token keyword">import</span> marimo

__generated_with <span class="token operator">=</span> <span class="token string">"0.15.2"</span>
app <span class="token operator">=</span> marimo<span class="token punctuation">.</span>App<span class="token punctuation">(</span>width<span class="token operator">=</span><span class="token string">"medium"</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>cell</span>
<span class="token keyword">def</span> <span class="token function">_</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">import</span> marimo <span class="token keyword">as</span> mo
    <span class="token keyword">return</span>


<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>cell</span>
<span class="token keyword">def</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">"world"</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    app<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`),p(a);var n=t(a,16),s=o(n);i(s,()=>'<code class="language-sh">uv run marimo new <span class="token string">"write a fibonacci visual"</span></code>'),p(n);var f=t(n,4),j=o(f);i(j,()=>`<code class="language-sh"><span class="token comment"># /// script</span>
<span class="token comment"># [tool.marimo.runtime]</span>
<span class="token comment"># auto_instantiate = false</span>
<span class="token comment"># ///</span>

<span class="token function">import</span> marimo
 
__generated_with <span class="token operator">=</span> <span class="token string">"ai"</span>
app <span class="token operator">=</span> marimo.App<span class="token punctuation">(</span>width<span class="token operator">=</span><span class="token string">"medium"</span><span class="token punctuation">)</span>
 
@app.cell
def _<span class="token punctuation">(</span><span class="token punctuation">)</span>:
    <span class="token function">import</span> marimo as mo
    <span class="token function">import</span> matplotlib.pyplot as plt
    <span class="token function">import</span> numpy as np
    <span class="token builtin class-name">return</span>

@app.cell
def _<span class="token punctuation">(</span><span class="token punctuation">)</span>:
    <span class="token comment"># Create a slider to select the number of Fibonacci numbers to display</span>
    fib_count_slider <span class="token operator">=</span> mo.ui.slider<span class="token punctuation">(</span><span class="token number">5</span>, <span class="token number">30</span>, <span class="token assign-left variable">value</span><span class="token operator">=</span><span class="token number">10</span>, <span class="token assign-left variable">label</span><span class="token operator">=</span><span class="token string">"Number of Fibonacci numbers"</span><span class="token punctuation">)</span>
    fib_count_slider
    <span class="token builtin class-name">return</span>

@app.cell
def _<span class="token punctuation">(</span><span class="token punctuation">)</span>:
    <span class="token comment"># Generate the Fibonacci sequence up to the selected count</span>
    def fibonacci_sequence<span class="token punctuation">(</span>n<span class="token punctuation">)</span>:
        <span class="token function">seq</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span>, <span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">_</span> <span class="token keyword">in</span> range<span class="token punctuation">(</span><span class="token number">2</span>, n<span class="token punctuation">)</span>:
            seq.append<span class="token punctuation">(</span>seq<span class="token punctuation">[</span>-1<span class="token punctuation">]</span> + seq<span class="token punctuation">[</span>-2<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token builtin class-name">return</span> seq<span class="token punctuation">[</span>:n<span class="token punctuation">]</span>
 
    fib_numbers <span class="token operator">=</span> fibonacci_sequence<span class="token punctuation">(</span>fib_count_slider.value<span class="token punctuation">)</span>
 
    <span class="token comment"># Plot the Fibonacci sequence</span>
    plt.figure<span class="token punctuation">(</span>figsize<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">8</span>, <span class="token number">5</span><span class="token punctuation">))</span>
    plt.plot<span class="token punctuation">(</span>range<span class="token punctuation">(</span><span class="token number">1</span>, len<span class="token punctuation">(</span>fib_numbers<span class="token punctuation">)</span> + <span class="token number">1</span><span class="token punctuation">)</span>, fib_numbers, <span class="token assign-left variable">marker</span><span class="token operator">=</span><span class="token string">'o'</span>,
        <span class="token assign-left variable">linestyle</span><span class="token operator">=</span><span class="token string">'-'</span>, <span class="token assign-left variable">color</span><span class="token operator">=</span><span class="token string">'teal'</span><span class="token punctuation">)</span>
    plt.title<span class="token punctuation">(</span>f<span class="token string">"First &#123;fib_count_slider.value&#125; Fibonacci Numbers"</span><span class="token punctuation">)</span>
    plt.xlabel<span class="token punctuation">(</span><span class="token string">"Index (n)"</span><span class="token punctuation">)</span>
    plt.ylabel<span class="token punctuation">(</span><span class="token string">"Fibonacci Number"</span><span class="token punctuation">)</span>
    plt.grid<span class="token punctuation">(</span>True<span class="token punctuation">)</span>
    plt.gca<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token builtin class-name">return</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token builtin class-name">:</span>
    app.run<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`),p(f);var b=t(f,14),x=o(b);i(x,()=>`<code class="language-sh"><span class="token shebang important">#!/usr/bin/env bash</span>

uv init <span class="token builtin class-name">.</span>
uv <span class="token function">add</span> <span class="token parameter variable">--dev</span> ipykernel marimo watchdog
<span class="token assign-left variable">script_dir</span><span class="token operator">=</span><span class="token string">"$(dirname -- "<span class="token variable"><span class="token variable">$(</span>readlink <span class="token parameter variable">-f</span> -- <span class="token string">"<span class="token variable">$0</span>"</span><span class="token variable">)</span></span>"</span><span class="token punctuation">)</span><span class="token string">"

marimo_config=<span class="token variable"><span class="token variable">$(</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[tool.marimo.save]
format_on_save=true

[tool.marimo.package_management]
manager = "uv"

[tool.marimo.runtime]
pythonpath = ["./notebooks"]
EOF</span>
<span class="token variable">)</span></span>

echo "</span><span class="token variable">$marimo_config</span><span class="token string">" >>"</span><span class="token variable">$script_dir</span>/pyproject.toml"</code>`),p(b);var y=t(b,6),T=o(y);i(T,()=>`<code class="language-sh"><span class="token shebang important">#!/usr/bin/env bash</span>
uv run marimo edit notebooks <span class="token parameter variable">--watch</span></code>`),p(y),D(8),P(g,h)}export{Z as default,Q as metadata};
