import { NextResponse } from 'next/server';
import { catalogApi } from '@/lib/square';

(BigInt.prototype as any).toJSON = function() { return this.toString(); }

export async function GET() {
  const ACCESS_TOKEN = process.env.SANDBOX_ACCESS_TOKEN;

  try {
    //Fetch catalog objects
    const response = await catalogApi.listCatalog(undefined, 'CATEGORY');
    const attributeValues = {}
    const categoryNames = {}
    const returnedObjects = response.result.objects
    console.log("categories return",returnedObjects)
    
    //Separate Categories and Items
    returnedObjects?.forEach((object) => {
      if (object.type === 'CATEGORY') {
        attributeValues[object.id as string] = object.categoryData.name;
        categoryNames[object.categoryData.name] = [];
      }
    });
    console.log(categoryNames)
    console.log(attributeValues)

    const responseTwo = await catalogApi.searchCatalogObjects({
      objectTypes: [
        'ITEM'
      ],
      query: {
        setQuery: {
          attributeName: 'categories',
          attributeValues: Object.keys(attributeValues)
        }
      }
    });

    const rawItems = responseTwo.result.objects

    rawItems?.map((item) => {
      const categoryId = item.itemData?.reportingCategory.id
      const categoryName = attributeValues[categoryId]
      const itemName = item.itemData?.name

      if (categoryId in attributeValues){
        const label = attributeValues[categoryId]
        categoryNames[label].push(itemName)
      }
    })

    console.log(categoryNames)
    
    // Extract category information from each item
    // returnedObjects?.forEach((object) => {
    //   if (object.type === 'ITEM') {
    //     const categoryId = object.itemData?.categoryId;
    //     const categoryName = Object.keys(categoryNames).find(name => attributeValues.includes(categoryId));
    //     if (categoryName) {
    //       categoryNames[categoryName].push({
    //         id: object.id,
    //         name: object.itemData.name,
    //       });
    //     } else {
    //       // Handle uncategorized items if necessary
    //       if (!categoryNames['Uncategorized']) {
    //         categoryNames['Uncategorized'] = [];
    //       }
    //       categoryNames['Uncategorized'].push({
    //         id: object.id,
    //         name: object.itemData.name,
    //       });
    //     }
    //   }
    // });

    return NextResponse.json(categoryNames);
    // return NextResponse.json(items);
  } catch (error) {
    console.log('Error fetching items from Square API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}