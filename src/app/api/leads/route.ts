import { NextRequest, NextResponse } from 'next/server';
import { LeadData } from '@/lib/analytics';

// Mock database - in production, use real database
let leads: LeadData[] = [];

export async function POST(request: NextRequest) {
  try {
    const leadData: LeadData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'zipCode', 'address', 'serviceType', 'brandId'];
    const missingFields = requiredFields.filter(field => !leadData[field as keyof LeadData]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Add lead to mock database
    const newLead = {
      ...leadData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    leads.push(newLead);

    // In production, you would:
    // 1. Save to database
    // 2. Send to CRM (Salesforce, HubSpot, etc.)
    // 3. Trigger email notifications
    // 4. Schedule follow-up calls
    // 5. Send to marketing automation

    console.log('New lead received:', {
      brand: leadData.brandId,
      name: leadData.name,
      phone: leadData.phone,
      serviceType: leadData.serviceType,
      source: leadData.source || 'direct',
      timestamp: leadData.timestamp,
    });

    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      message: 'Lead submitted successfully',
    });

  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process lead submission' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // For development/demo purposes - get recent leads
  const url = new URL(request.url);
  const brandId = url.searchParams.get('brandId');
  const limit = parseInt(url.searchParams.get('limit') || '10');

  let filteredLeads = leads;
  if (brandId) {
    filteredLeads = leads.filter(lead => lead.brandId === brandId);
  }

  const recentLeads = filteredLeads
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
    .map(lead => ({
      id: lead.id,
      name: lead.name,
      serviceType: lead.serviceType,
      brandId: lead.brandId,
      source: lead.source,
      timestamp: lead.timestamp,
    }));

  return NextResponse.json({
    leads: recentLeads,
    total: filteredLeads.length,
  });
}