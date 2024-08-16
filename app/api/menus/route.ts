import { NextResponse } from 'next/server';
import { catalogApi } from '@/lib/square';

(BigInt.prototype as any).toJSON = function() { return this.toString(); }

export async function GET() {
  try {
    //Fetch catalog objects
    const response = await catalogApi.listCatalog(undefined, 'CATEGORY');
    const attributeValues = {}
    const loadedCategories = {}
    const returnedObjects = response.result.objects
    // console.log("categories return",returnedObjects)
    
    //Separate Categories and Items
    returnedObjects?.forEach((object) => {
      if (object.type === 'CATEGORY') {
        attributeValues[object.id as string] = object.categoryData.name;
        loadedCategories[object.categoryData.name] = [];
      }
    });
    console.log("Categories", loadedCategories)
    // console.log("Attributes Values", attributeValues)

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
    // console.log("Returned Menu Items", rawItems)

    const fetchModifiersForItem = async (itemId) => {
      try {
        const response = await catalogApi.retrieveCatalogObject(itemId,true);
        return response.result.relatedObjects;
      } catch (error) {
        console.error('Error fetching modifiers for item:', itemId, error);
        return null;
      }
    };

    // rawItems?.map((item) => {
    //   const categoryId = item.itemData?.reportingCategory.id
    //   const categoryName = attributeValues[categoryId]
    //   const itemName = item.itemData?.name

    //   if (categoryId in attributeValues){
    //     const label = attributeValues[categoryId]
    //     loadedCategories[label].push({
    //       name: itemName,
    //       category: categoryName,
    //       id: item.id,
    //       isDeleted: item.isDeleted,
    //       itemData:{
    //         ...item.itemData
    //       }
    //     })
    //   }
    // })

    for (const item of rawItems) {
      const categoryId = item.itemData?.reportingCategory.id;
      const categoryName = attributeValues[categoryId];
      const itemName = item.itemData?.name;

      if (categoryId in attributeValues) {
        const label = attributeValues[categoryId];
        // const modifiersResponse = await fetchModifiersForItem(item.id);
        // const modifiers = modifiersResponse?.modifierListData || [];
        const modifiers = await fetchModifiersForItem(item.id);
        loadedCategories[label].push({
          name: itemName,
          category: categoryName,
          id: item.id,
          isDeleted: item.isDeleted,
          itemData: {
            ...item.itemData,
            modifiers: modifiers, // Include modifiers here
          },
        });
      }
    }

    // console.log("Loaded Categories",loadedCategories)
    
    return NextResponse.json(loadedCategories);
    // return NextResponse.json(items);
  } catch (error) {
    console.log('Error fetching items from Square API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}