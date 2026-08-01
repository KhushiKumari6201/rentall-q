export interface AgentInput {
  agentName: string;
  context: Record<string, any>;
}

export interface AgentOutput<T = any> {
  agent: string;
  status: 'SUCCESS' | 'ERROR';
  data: T;
  executionTimeMs?: number;
}

export interface IAgentService {
  runAgent<T = any>(input: AgentInput): Promise<AgentOutput<T>>;
}
