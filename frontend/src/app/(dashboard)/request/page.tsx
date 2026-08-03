'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ClientRequestPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6 text-navy-900 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-navy-900 font-serif">
          Make a Request
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Submit maintenance tickets, renewal requests, or unit inquiries to your provider.
        </p>
      </div>

      <Card className="border-stone-200">
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Request Submitted!</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Your rental provider has received your inquiry and will respond shortly.
            </p>
            <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
              Submit Another Request
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <Select
              label="Request Type"
              options={[
                { value: 'maintenance', label: 'Maintenance / Repair' },
                { value: 'renewal', label: 'Lease Renewal' },
                { value: 'billing', label: 'Billing Inquiry' },
                { value: 'general', label: 'General Inquiry' },
              ]}
            />

            <Input label="Subject / Summary" placeholder="e.g. Lock mechanism issue on Unit 102" required />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-navy-700">Details</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your request in detail..."
                className="w-full rounded-lg border border-stone-300 bg-white p-3 text-sm text-navy-900 focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/20"
              />
            </div>

            <Button type="submit" variant="primary" className="bg-amber-500 text-navy-900 hover:bg-amber-400 font-semibold border-amber-500">
              <Send className="h-4 w-4" />
              Submit Request
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
