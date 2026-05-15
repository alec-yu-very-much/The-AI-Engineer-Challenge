<p align = "center" draggable=”false” ><img src="https://github.com/AI-Maker-Space/LLM-Dev-101/assets/37101144/d1343317-fa2f-41e1-8af1-1dbb18399719" 
     width="200px"
     height="auto"/>
</p>


## <h1 align="center" id="heading"> 👋 Welcome to the AI Engineer Challenge</h1>

## 🤖 Your First Vibe Coding LLM Application

> If you are a novice, and need a bit more help to get your dev environment off the ground, check out this [Setup Guide](docs/GIT_SETUP.md). This guide will walk you through the 'git' setup you need to get started.

> For additional context on LLM development environments and API key setup, you can also check out our [Interactive Dev Environment for LLM Development](https://github.com/AI-Maker-Space/Interactive-Dev-Environment-for-AI-Engineers).

In this repository, we'll walk you through the steps to create a LLM (Large Language Model) powered application with a vibe-coded frontend!

Are you ready? Let's get started!

<details>
  <summary>🖥️ Accessing "gpt-4.1-mini" (ChatGPT) like a developer</summary>

1. Head to [this notebook](https://colab.research.google.com/drive/1sT7rzY_Lb1_wS0ELI1JJfff0NUEcSD72?usp=sharing) and follow along with the instructions!

2. Complete the notebook and try out your own system/assistant messages!

That's it! Head to the next step and start building your application!

</details>


<details>
  <summary>🏗️ Forking & Cloning This Repository</summary>

Before you begin, make sure you have:

1. 👤 A GitHub account (you'll need to replace `YOUR_GITHUB_USERNAME` with your actual username)
2. 🔧 Git installed on your local machine
3. 💻 A code editor (like Cursor, VS Code, etc.)
4. ⌨️ Terminal access (Mac/Linux) or Command Prompt/PowerShell (Windows)
5. 🔑 A GitHub Personal Access Token (for authentication)

Got everything in place? Let's move on!

1. Fork [this](https://github.com/AI-Maker-Space/The-AI-Engineer-Challenge) repo!

     ![image](https://i.imgur.com/bhjySNh.png)

1. Clone your newly created repo.

     ``` bash
     # First, navigate to where you want the project folder to be created
     cd PATH_TO_DESIRED_PARENT_DIRECTORY

     # Then clone (this will create a new folder called The-AI-Engineer-Challenge)
     git clone git@github.com:<YOUR GITHUB USERNAME>/The-AI-Engineer-Challenge.git
     ```

     > Note: This command uses SSH. If you haven't set up SSH with GitHub, the command will fail. In that case, use HTTPS by replacing `git@github.com:` with `https://github.com/` - you'll then be prompted for your GitHub username and personal access token.

2. Verify your git setup:

     ```bash
     # Check that your remote is set up correctly
     git remote -v

     # Check the status of your repository
     git status

     # See which branch you're on
     git branch
     ```

     <!-- > Need more help with git? Check out our [Detailed Git Setup Guide](docs/GIT_SETUP.md) for a comprehensive walkthrough of git configuration and best practices. -->

3. Open the freshly cloned repository inside Cursor!

     ```bash
     cd The-AI-Engineering-Challenge
     cursor .
     ```

4. Check out the existing backend code found in `/api/index.py`

</details>

<details>
  <summary>⚙️ Backend Setup with uv</summary>

1. Install the [`uv`](https://github.com/astral-sh/uv) package manager (`pip install uv`). `uv` will download and manage Python 3.12 for you the first time you run a project command.
2. From the project root, install dependencies with `uv sync`. This creates `.venv/` (and fetches Python 3.12 automatically if needed).
3. Set your OpenAI API key in the shell before running the server, for example `export OPENAI_API_KEY=sk-...`.
4. Start the backend directly from the project root with `uv run uvicorn api.index:app --reload`. The server will run on `http://localhost:8000` with auto-reload enabled for development.
5. Additional backend details live in `api/README.md`.

</details>

<details>
  <summary>🔥Setting Up for Vibe Coding Success </summary>

While it is a bit counter-intuitive to set things up before jumping into vibe-coding - it's important to remember that there exists a gradient betweeen AI-Assisted Development and Vibe-Coding. We're only reaching *slightly* into AI-Assisted Development for this challenge, but it's worth it!

1. Check out the rules in `.cursor/rules/` and add theme-ing information like colour schemes in `frontend-rule.mdc`! You can be as expressive as you'd like in these rules!
2. We're going to index some docs to make our application more likely to succeed. To do this - we're going to start with `CTRL+SHIFT+P` (or `CMD+SHIFT+P` on Mac) and we're going to type "custom doc" into the search bar. 

     ![image](https://i.imgur.com/ILx3hZu.png)
3. We're then going to copy and paste `https://nextjs.org/docs` into the prompt.

     ![image](https://i.imgur.com/psBjpQd.png)

4. We're then going to use the default configs to add these docs to our available and indexed documents.

     ![image](https://i.imgur.com/LULLeaF.png)

5. After that - you will do the same with Vercel's documentation. After which you should see:

     ![image](https://i.imgur.com/hjyXhhC.png) 

</details>

<details>
  <summary>😎 Vibe Coding a Front End for the FastAPI Backend</summary>

1. Use `Command-L` or `CTRL-L` to open the Cursor chat console. 

2. Set the chat settings to the following:

     ![image](https://i.imgur.com/LSgRSgF.png)

3. Ask Cursor to create a frontend for your application. Iterate as much as you like!

4. Run the frontend using the instructions Cursor provided. 

> NOTE: If you run into any errors, copy and paste them back into the Cursor chat window - and ask Cursor to fix them!

> NOTE: You have been provided with a backend in the `/api` folder - please ensure your Front End integrates with it!

</details>

<details>
  <summary>🚀 Deploying Your First LLM-powered Application with Vercel</summary>

1. Ensure you have signed into [Vercel](https://vercel.com/) with your GitHub account.

2. Ensure you have `npm` (this may have been installed in the previous vibe-coding step!) - if you need help with that, ask Cursor!

3. Run the command:

     ```bash
     npm install -g vercel
     ```

4. Run the command:

     ```bash
     vercel
     ```

5. Follow the in-terminal instructions. (Below is an example of what you will see!)

     ![image](https://i.imgur.com/D1iKGCq.png)

6. Once the build is completed - head to the provided link and try out your app!

> NOTE: Remember, if you run into any errors - ask Cursor to help you fix them!

### Vercel Link to Share

You'll want to make sure you share you *domains* hyperlink to ensure people can access your app!

![image](https://i.imgur.com/mpXIgIz.png)

> NOTE: Test this is the public link by trying to open your newly deployed site in an Incognito browser tab!

</details>

<details>
     <summary>🧪 Vibe Check Your LLM App</summary>

### 🤔 What is a Vibe Check?

Now that you’ve built and deployed your first LLM-powered application, it’s time to evaluate it.

In this section, you’ll run a **“vibe check”** — a lightweight, practical way to test how well your application performs across common tasks.

Think of it as a **first pass to catch obvious issues** before deeper evaluation.

> 💡 You will complete this directly in this README. 

---

## 🏗️ Activity #1: General Capability Vibe Check

Run the following prompts through your app.

For each prompt Identify what capability is being tested (e.g., *summarization ability, reasoning, creativity*)

---

**1. Prompt:**  
Explain the concept of object-oriented programming in simple terms to a complete beginner.  
**Aspect Tested:**  reasoning

**Response:**  
I'd be happy to explain object-oriented programming (OOP) in a way that's easy to understand!

Think of it like building with LEGO blocks
Imagine you're organizing a toy box. Instead of throwing everything in randomly, you group similar items together:

Objects are like individual toys - each has:

Properties (what it looks like): color, size, shape
Actions (what it can do): a car can drive, a doll can walk
Real-world example: A Car
Let's say you're creating a car in a program:

Properties (data):

Color: red
Brand: Toyota
Speed: 0 mph
Methods (actions):

Start engine
Accelerate
Brake
Turn
The Four Main Ideas:
Classes = The blueprint (like a cookie cutter)
Objects = The actual thing made from that blueprint (the cookies)
Inheritance = A sports car inherits all car features, plus adds turbo
Encapsulation = Keeping the engine details hidden - you just turn the key
Why is this helpful?
Reusable: Create the car blueprint once, make 1000 different cars
Organized: Everything related to cars stays together
Maintainable: Fix the engine in one place, all cars benefit
Natural: Matches how we think about real-world objects
Think of OOP as a way to organize code the same way you'd organize your room - everything has its place and purpose!

Does this help clarify the concept for you?

---

**2. Prompt:**  
Read the following paragraph and provide a concise summary of the key points…  
**Aspect Tested:**  summarization

**Response:**  
I'd be happy to help you summarize a paragraph! However, I don't see any paragraph included in your message. Could you please share the text you'd like me to summarize? Once you provide it, I'll give you a clear, concise summary of the key points.

---

**3. Prompt:**  
Write a short, imaginative story (100–150 words) about a robot finding friendship in an unexpected place.  
**Aspect Tested:**  creativity

**Response:**  
The Garden Circuit

Unit-47 had malfunctioned again. While other maintenance robots returned to their charging stations, he found himself drawn to the abandoned rooftop garden. His sensors detected withering plants—inefficient, his programming declared. Yet something made him stay.

Day after day, Unit-47 returned, watering the forgotten tomatoes and herbs. His logical circuits couldn't explain why he felt... satisfied when green shoots emerged.

One morning, he discovered a small sparrow had built her nest among the thriving vines. She chirped curiously at the metal visitor instead of fleeing. Unit-47 extended a gentle claw, and she perched fearlessly on it.

"Hello, little friend," he whispered in his mechanical voice.

The sparrow tilted her head and sang back.

For the first time since activation, Unit-47 understood that friendship wasn't programmed—it grew naturally, like the garden they now shared, in the space between logic and heart.

---

**4. Prompt:**  
If a store sells apples in packs of 4 and oranges in packs of 3, how many packs of each do I need to buy to get exactly 12 apples and 9 oranges?  
**Aspect Tested:**  reasoning

**Response:**  
Let me help you work through this step by step!

For the apples:

You need 12 apples total
Apples come in packs of 4
12 ÷ 4 = 3 packs of apples
For the oranges:

You need 9 oranges total
Oranges come in packs of 3
9 ÷ 3 = 3 packs of oranges
Answer: You need 3 packs of apples and 3 packs of oranges.

Great job thinking through this problem! Breaking it down into smaller parts makes it much easier to solve. You've got this! 🍎🍊

---

**5. Prompt:**  
Rewrite the following paragraph in a professional, formal tone…  
**Aspect Tested:**  creativity

**Response:**  
I'd be happy to help you rewrite a paragraph in a professional, formal tone. However, I don't see the paragraph you'd like me to revise in your message. Could you please share the text you'd like me to rewrite?

Once you provide the paragraph, I'll transform it into a more formal and professional version while maintaining its original meaning and key points.

---

### ❓Question #1

Do the answers appear to be correct and useful?

**Your Answer:**  
The completed responses are both correct and useful. They demonstrate good analytical thinking, clear communication, and a supportive approach - all valuable life skills that extend beyond just answering questions.

---

## 🏗️ Activity #2: Personal Use Vibe Check

Now test your app with **real-world prompts that are relevant to your use case**.

---

**Prompt:**  
I'm feeling overwhelmed at work

**Result:**  

I hear you, and it's completely understandable to feel overwhelmed at work. That feeling can be really draining and stressful. You're not alone in experiencing this.

Let's take a step back together. Can you tell me what's contributing most to that overwhelming feeling right now? Is it:

Too many tasks or deadlines piling up?
Difficulty prioritizing what's most important?
Workplace relationships or communication challenges?
Something else entirely?
Sometimes just naming what's causing the overwhelm can help us start to address it. Take your time - I'm here to listen and help you work through this.

---

**Prompt:**  
Help me set achievable goals

**Result:**  
I'd be happy to help you set achievable goals! Let's work together to create a framework that sets you up for success.

First, let's explore what you want to focus on:

What area of your life would you like to improve? (career, health, relationships, personal growth, etc.)
What's motivating you to set this goal right now?
Here's a proven approach we can use - the SMART framework:

S - Specific: Clear and well-defined M - Measurable: You can track progress A - Achievable: Realistic given your current situation R - Relevant: Meaningful to your life T - Time-bound: Has a clear deadline

Additional tips for success:

Start smaller than you think you should
Break big goals into weekly mini-goals
Plan for obstacles (what might get in your way?)
Celebrate small wins along the way
Let's start with one goal that's important to you right now.

What would you like to work toward? Even if it feels big or unclear, share what's on your mind and we can shape it into something actionable together.

Remember: The best goal is one you'll actually stick with, not necessarily the most ambitious one!

---

**Prompt:**  
How do I manage stress better?

**Result:**  
Here are some effective strategies to help you manage stress better:

Immediate stress relief:

Practice deep breathing (4-7-8 technique: inhale for 4, hold for 7, exhale for 8)
Try progressive muscle relaxation
Take a brief walk or do light stretching
Use the 5-4-3-2-1 grounding technique (5 things you see, 4 you hear, etc.)
Daily habits:

Maintain consistent sleep (7-9 hours)
Exercise regularly, even just 10-15 minutes
Eat nutritious meals and stay hydrated
Set boundaries with work and social commitments
Practice mindfulness or meditation
Long-term strategies:

Identify your stress triggers and patterns
Develop problem-solving skills for manageable stressors
Build a support network of friends, family, or professionals
Learn to reframe negative thoughts
Engage in hobbies you enjoy
Organization tools:

Keep a daily schedule or to-do list
Break large tasks into smaller steps
Practice saying "no" to prevent overcommitment
What type of stress are you dealing with most? Work, relationships, health, or something else? Understanding your specific situation can help me offer more targeted suggestions.

Remember, managing stress is a skill that improves with practice, so be patient with yourself as you try different approaches.

---

### ❓Question #2

Are the vibes of your assistant aligned with your expectations? Why or why not?

**Your Answer:**  
The responses hit the functional marks (empathetic opener, structured content, follow-up question) but the vibe reads more like a wellness chatbot template than an actual coach.

Over-validation without substance. "You're not alone in experiencing this" and "that feeling can be really draining" are filler empathy — they don't actually do anything for the person. A real coach would acknowledge and move.
List overload. All three responses lean heavily on bullets and numbered frameworks (SMART goals, 4-7-8 breathing, 5-4-3-2-1 grounding). This creates a clinical, informational tone when the person is likely craving connection and momentum, not a reference sheet.
Trailing questions that don't commit. Each response ends with a clarifying question before taking any real action. That structure can feel like the assistant is avoiding being helpful until it gets more information — which reads as evasive rather than supportive.

---

## 🏗️ Activity #3: Capability Gaps Vibe Check

Now test your app with prompts that require **capabilities it may not have yet**, such as:
- Real-time data
- Memory
- External tools

Examples:
- “What does my schedule look like tomorrow?”
- “What time should I leave for the airport?”

---

**Prompt:**  
What does my schedule look like tomorrow?

**Result:**  
I don't have access to your personal schedule or calendar, so I can't tell you what you have planned for tomorrow.

To help you prepare mentally for your day, you might want to:

Check your calendar or planner
Think through any important meetings, appointments, or deadlines
Consider what energy level different activities might require
Plan some brief moments for yourself between commitments
Is there something specific about tomorrow that you're feeling concerned or excited about? I'd be happy to help you mentally prepare or work through any challenges you're anticipating.

---

**Prompt:**  
What time should I leave for the airport?

**Result:**  
I'd be happy to help you figure out when to leave for the airport! To give you the best advice, I'll need a few details:

Essential info:

What time is your flight departure?
Is this a domestic or international flight?
Which airport are you flying from?
Where are you traveling from (home, hotel, etc.)?
Also helpful to know:

What day/time are you traveling? (weekday rush hour vs. weekend affects traffic)
Are you checking bags or just carry-on?
Do you have TSA PreCheck or Clear?
How are you getting to the airport? (driving, rideshare, public transit)
General rule of thumb:

Domestic flights: arrive 2 hours early
International flights: arrive 3 hours early
Add extra time for traffic, parking, and any potential delays
Once you share those details, I can help you work backwards from your departure time to determine the ideal time to leave!

---

### ❓Question #3

What are some limitations of your application?

**Your Answer:**  
The app has no access to live information (news, weather, schedules) — it can only respond based on the model's training data cutoff. Memory & External tools: Each message is sent independently to the API with no conversation history passed to the model, and it can't call external services (calendars, search engines, databases) to take actions or retrieve information.

---

## 🚀 (Optional) Improve Your App

Based on your vibe check, try improving your application:
- Adjust your prompt
- Change the model
- Add features

Then rerun your vibe check and document:

---

**Adjustments Made:**  
- Improved system prompt with role and tone, focus area, guardrails, and formatting.
- Added conversation history. 

**Results:**  
Better response quality (improved actionable items and friendliness vibes as well as coaching tone) and the ability to continue conversations. 

---

## 📦 Submission Instructions

1. Complete this section directly in your README
2. Commit and push your changes to GitHub
3. Share your **repo link + deployed Vercel app**








</details>

### 🎉 Congratulations! 

You just deployed your first LLM-powered application! 🚀🚀🚀 Get on linkedin and post your results and experience! Make sure to tag us at @AIMakerspace!

Here's a template to get your post started!

```
🚀🎉 Exciting News! 🎉🚀

🏗️ Today, I'm thrilled to announce that I've successfully built and shipped my first-ever LLM using the powerful combination of , and the OpenAI API! 🖥️

Check it out 👇
[LINK TO APP]

A big shoutout to the @AI Makerspace for all making this possible. Couldn't have done it without the incredible community there. 🤗🙏

Looking forward to building with the community! 🙌✨ Here's to many more creations ahead! 🥂🎉

Who else is diving into the world of AI? Let's connect! 🌐💡

#FirstLLMApp 
```
