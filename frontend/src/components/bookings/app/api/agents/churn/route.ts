import { NextResponse } from 'next/server';
import { AgentsHttpService } from '@/core/infrastructure/services/agents-http.service';

const agentService = new AgentsHttpService();

export async function POST(request: Request) {
  try {
    const context = await request.json();
    const result = await agentService.runAgent({
      agentName: 'churn',
      context,
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
