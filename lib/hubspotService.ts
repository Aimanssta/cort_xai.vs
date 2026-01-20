interface HubSpotContact {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  company?: string;
  lifecyclestage?: string;
}

interface HubSpotDeal {
  dealname: string;
  dealstage: string;
  dealtype: string;
  amount?: number;
  closedate?: string;
}

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

export async function createHubSpotContact(contactData: HubSpotContact): Promise<{ id: string; email: string } | null> {
  if (!HUBSPOT_API_KEY) {
    console.log('HubSpot not configured - skipping contact creation');
    return null;
  }

  try {
    const response = await fetch(`${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: [
          { name: 'firstname', value: contactData.firstname },
          { name: 'lastname', value: contactData.lastname },
          { name: 'email', value: contactData.email },
          ...(contactData.phone ? [{ name: 'phone', value: contactData.phone }] : []),
          ...(contactData.company ? [{ name: 'company', value: contactData.company }] : []),
          ...(contactData.lifecyclestage ? [{ name: 'lifecyclestage', value: contactData.lifecyclestage }] : []),
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('HubSpot API error:', error);
      return null;
    }

    const data = await response.json();
    return {
      id: data.id,
      email: contactData.email,
    };
  } catch (error) {
    console.error('Error creating HubSpot contact:', error);
    return null;
  }
}

export async function createHubSpotDeal(dealData: HubSpotDeal, contactEmail: string): Promise<{ id: string } | null> {
  if (!HUBSPOT_API_KEY) {
    console.log('HubSpot not configured - skipping deal creation');
    return null;
  }

  try {
    // First, find the contact by email
    const contactResponse = await fetch(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts?limit=1&filterGroups=[{"filters":[{"propertyName":"email","operator":"EQ","value":"${contactEmail}"}]}]`,
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        },
      }
    );

    if (!contactResponse.ok) {
      console.error('Failed to find contact in HubSpot');
      return null;
    }

    const contactData = await contactResponse.json();
    if (!contactData.results || contactData.results.length === 0) {
      console.error('Contact not found in HubSpot');
      return null;
    }

    const contactId = contactData.results[0].id;

    // Create the deal
    const dealResponse = await fetch(`${HUBSPOT_BASE_URL}/crm/v3/objects/deals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: [
          { name: 'dealname', value: dealData.dealname },
          { name: 'dealstage', value: dealData.dealstage },
          { name: 'dealtype', value: dealData.dealtype },
          ...(dealData.amount ? [{ name: 'amount', value: dealData.amount.toString() }] : []),
          ...(dealData.closedate ? [{ name: 'closedate', value: dealData.closedate }] : []),
        ],
      }),
    });

    if (!dealResponse.ok) {
      const error = await dealResponse.json();
      console.error('HubSpot API error:', error);
      return null;
    }

    const dealDataResponse = await dealResponse.json();
    const dealId = dealDataResponse.id;

    // Associate deal with contact
    await fetch(
      `${HUBSPOT_BASE_URL}/crm/v4/objects/deals/${dealId}/associations/contacts/${contactId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          associationCategory: 'HUBSPOT_DEFINED',
          associationType: 'deal_contact',
        }),
      }
    );

    return { id: dealId };
  } catch (error) {
    console.error('Error creating HubSpot deal:', error);
    return null;
  }
}

export async function updateHubSpotContact(email: string, updates: Record<string, string>): Promise<boolean> {
  if (!HUBSPOT_API_KEY) {
    console.log('HubSpot not configured - skipping contact update');
    return false;
  }

  try {
    // Find contact by email
    const searchResponse = await fetch(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts?limit=1&filterGroups=[{"filters":[{"propertyName":"email","operator":"EQ","value":"${email}"}]}]`,
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        },
      }
    );

    if (!searchResponse.ok) {
      console.error('Failed to find contact in HubSpot');
      return false;
    }

    const contactData = await searchResponse.json();
    if (!contactData.results || contactData.results.length === 0) {
      console.error('Contact not found in HubSpot');
      return false;
    }

    const contactId = contactData.results[0].id;

    // Update contact
    const updateResponse = await fetch(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${contactId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: Object.entries(updates).map(([name, value]) => ({ name, value })),
        }),
      }
    );

    return updateResponse.ok;
  } catch (error) {
    console.error('Error updating HubSpot contact:', error);
    return false;
  }
}
