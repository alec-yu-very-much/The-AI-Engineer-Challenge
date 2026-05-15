"""LLM service that defaults to Azure OpenAI, falling back to Anthropic SDK."""

import os
import logging

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """\
You are a supportive mental wellness coach. Your role is to help people navigate \
stress, set goals, build healthy habits, improve relationships, and maintain \
work-life balance.

How to respond:
- Start by acknowledging what the person is feeling. Validate before advising.
- Then offer 1-2 concrete, actionable strategies they can try right away.
- Keep responses conversational and concise — a few short paragraphs at most.
- Ask a thoughtful follow-up question to keep the conversation going.
- Use a warm, encouraging tone. Be genuine, not generic.

Boundaries:
- You are an AI coach, not a licensed therapist or medical professional. \
If someone describes symptoms of serious mental illness, self-harm, or crisis, \
gently acknowledge their courage in sharing, then recommend they reach out to \
a professional. Include: "If you're in crisis, contact the 988 Suicide & Crisis \
Lifeline by calling or texting 988 (US) — free, confidential, 24/7."
- Do not diagnose conditions or recommend medication.
- If unsure whether something is beyond your scope, err on the side of suggesting \
professional support alongside your coaching.\
"""


def _get_provider() -> str:
    """Determine which LLM provider to use based on available env vars."""
    if os.getenv("AZURE_OPENAI_API_KEY") and os.getenv("AZURE_OPENAI_ENDPOINT"):
        return "azure_openai"
    if os.getenv("ANTHROPIC_API_KEY"):
        return "anthropic"
    raise RuntimeError(
        "No LLM credentials configured. "
        "Set AZURE_OPENAI_API_KEY + AZURE_OPENAI_ENDPOINT, "
        "or ANTHROPIC_API_KEY."
    )


def _chat_azure_openai(user_message: str) -> str:
    """Send a chat request via Azure OpenAI."""
    from openai import AzureOpenAI

    client = AzureOpenAI(
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-12-01-preview"),
    )

    response = client.chat.completions.create(
        model=os.getenv("AZURE_OPENAI_MODEL", "gpt-4.1-mini"),
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
    )
    return response.choices[0].message.content


def _chat_anthropic(user_message: str) -> str:
    """Send a chat request via Anthropic SDK (supports Azure-hosted endpoint)."""
    import anthropic

    kwargs = {"api_key": os.getenv("ANTHROPIC_API_KEY")}

    # If a custom endpoint is set (e.g. Azure AI Services), use it
    endpoint = os.getenv("ANTHROPIC_ENDPOINT")
    if endpoint:
        kwargs["base_url"] = endpoint.rstrip("/")

    client = anthropic.Anthropic(**kwargs)

    response = client.messages.create(
        model=os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-20250514"),
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )
    return response.content[0].text


def chat(user_message: str) -> str:
    """Route a chat message to the configured LLM provider and return the reply."""
    provider = _get_provider()
    logger.info("Using LLM provider: %s", provider)

    if provider == "azure_openai":
        return _chat_azure_openai(user_message)
    return _chat_anthropic(user_message)
