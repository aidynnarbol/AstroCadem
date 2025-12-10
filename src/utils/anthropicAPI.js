// src/utils/anthropicAPI.js
// API-клиент для Anthropic Claude

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

/**
 * Отправить сообщение Claude AI
 * @param {Array} messages - История сообщений [{role: 'user'|'assistant', content: '...'}]
 * @param {String} systemPrompt - Системный промпт (личность персонажа)
 * @param {Number} maxTokens - Максимум токенов в ответе
 * @returns {Promise<String>} - Ответ AI
 */
export async function sendMessage(messages, systemPrompt, maxTokens = 1000) {
  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // API ключ НЕ нужен - обрабатывается на бэкенде Claude.ai
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;

  } catch (error) {
    console.error('Anthropic API Error:', error);
    throw error;
  }
}

/**
 * Отправить сообщение со стримингом (для будущего)
 */
export async function sendMessageStream(messages, systemPrompt, onChunk) {
  // TODO: Реализовать стриминг для эффекта печатной машинки в реальном времени
  // Пока используем обычный метод
  const response = await sendMessage(messages, systemPrompt);
  onChunk(response);
  return response;
}