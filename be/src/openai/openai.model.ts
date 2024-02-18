interface Choice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice;
  usage: Usage;
  system_fingerprint: string;
}
