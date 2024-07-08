import { NextResponse } from 'next/server';
import { catalogApi } from '@/lib/square';

(BigInt.prototype as any).toJSON = function() { return this.toString(); }

export async function GET() {
  const ACCESS_TOKEN = process.env.SANDBOX_ACCESS_TOKEN;

  try {
    const response = await catalogApi.listCatalog(undefined, 'CATEGORY');
    
    // Extract category information from each item
    // const items = response.result.objects.map(item => ({
    //   id: item.id,
    //   name: item.item_data.name,
    //   category: item.item_data.category_id // Adjust this based on Square API response structure
    //   // You may need to adjust how you access the category ID or name based on your Square API response structure
    // }));
    return NextResponse.json(response.result);
    // return NextResponse.json(items);
  } catch (error) {
    console.log('Error fetching items from Square API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}